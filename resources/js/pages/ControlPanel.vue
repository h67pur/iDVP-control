<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import { ref, reactive, onMounted } from 'vue'
import SystemHeader from '../components/SystemHeader.vue'
import UpdateConfigPanel from '../components/UpdateConfigPanel.vue'
import AvailableUpdates from '../components/AvailableUpdates.vue'
import UpdateProgress from '../components/UpdateProgress.vue'
import UpdateHistory from '../components/UpdateHistory.vue'

// Типы
type SystemStatus = 'active' | 'maintenance' | 'error'
type UpdateMode = 'auto' | 'manual' | 'notification'

interface Update {
    version: string
    size: string
    stability: 'stable' | 'beta' | 'alpha'
    changes: string[]
    recommended: boolean
}

interface HistoryRecord {
    version: string
    date: string
    status: 'success' | 'failed'
    details?: string
}

// Состояние системы
const currentVersion = ref('2.4.1')
const systemStatus = ref<SystemStatus>('active')
const lastUpdateCheck = ref<string | null>(null)
const updatingVersion = ref('')

// Конфигурация
const config = reactive({
    updateMode: 'auto' as UpdateMode,
    schedule: 'Ежедневно в 02:00',
    backupEnabled: true
})

// Обновления
const availableUpdates = ref<Update[]>([])
const updateInProgress = ref(false)
const updateProgress = ref(0)
const currentStep = ref('')
const timeRemaining = ref('')

// История
const updateHistory = ref<HistoryRecord[]>([
    {
        version: '2.4.1',
        date: '15 апр 2025',
        status: 'success'
    },
    {
        version: '2.3.8',
        date: '14 апр 2025',
        status: 'success'
    }
])

// Методы
const checkUpdates = async () => {
    try {
        systemStatus.value = 'maintenance'

        // Симуляция запроса к API
        await new Promise(resolve => setTimeout(resolve, 1000))

        availableUpdates.value = [
            {
                version: '2.5.0',
                size: '45.2 MB',
                stability: 'stable',
                recommended: true,
                changes: [
                    'Новый механизм валидации JSON-схем',
                    'Оптимизация производительности на 15%',
                    'Исправлены критические уязвимости безопасности'
                ]
            }
        ]

        lastUpdateCheck.value = new Date().toLocaleString()
        systemStatus.value = 'active'
    } catch (error) {
        console.error('Ошибка при проверке обновлений:', error)
        systemStatus.value = 'error'
    }
}

const startUpdate = async (version: string) => {
    if (updateInProgress.value) return

    updateInProgress.value = true
    updatingVersion.value = version
    updateProgress.value = 0
    currentStep.value = 'Подготовка к обновлению'

    const steps = [
        { name: 'Создание резервной копии', duration: 1500, weight: 20 },
        { name: 'Загрузка пакетов', duration: 3000, weight: 30 },
        { name: 'Проверка целостности', duration: 2000, weight: 15 },
        { name: 'Установка компонентов', duration: 4000, weight: 30 },
        { name: 'Финализация', duration: 1000, weight: 5 }
    ]

    try {
        for (const step of steps) {
            currentStep.value = step.name
            const startTime = Date.now()

            while (Date.now() - startTime < step.duration) {
                const progressInStep = (Date.now() - startTime) / step.duration
                updateProgress.value = steps
                    .slice(0, steps.indexOf(step))
                    .reduce((sum, s) => sum + s.weight, progressInStep * step.weight) / 100

                const remainingMs = step.duration - (Date.now() - startTime)
                timeRemaining.value = formatTime(remainingMs)
                await new Promise(resolve => setTimeout(resolve, 100))
            }
        }

        currentVersion.value = version
        updateHistory.value.unshift({
            version,
            date: new Date().toLocaleString(),
            status: 'success'
        })
    } catch (error) {
        updateHistory.value.unshift({
            version,
            date: new Date().toLocaleString(),
            status: 'failed',
            details: error instanceof Error ? error.message : 'Неизвестная ошибка'
        })
    } finally {
        updateInProgress.value = false
    }
}

const formatTime = (ms: number): string => {
    const seconds = Math.ceil(ms / 1000)
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} мин ${secs} сек`
}

// Инициализация
onMounted(() => {
    checkUpdates()
})

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Главная страница',
        href: '/dashboard',
    },
];
</script>

<template>
    <Head title="Главная страница" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-col gap-6 p-6">
            <SystemHeader
                :current-version="currentVersion"
                :system-status="systemStatus"
                @check-updates="checkUpdates"
            />

            <div class="grid flex-1 gap-6 md:grid-cols-3 h-full">
                <UpdateConfigPanel
                    v-model:update-mode="config.updateMode"
                    v-model:schedule="config.schedule"
                    v-model:backup-enabled="config.backupEnabled"
                />

                <div class="md:col-span-2">
                    <AvailableUpdates
                        :updates="availableUpdates"
                        :last-check="lastUpdateCheck"
                        @install="startUpdate"
                        @refresh="checkUpdates"
                    />

                    <UpdateProgress
                        v-if="updateInProgress"
                        :version="updatingVersion"
                        :progress="updateProgress"
                        :current-step="currentStep"
                        :time-remaining="timeRemaining"
                    />

                    <UpdateHistory :history="updateHistory" />
                </div>
            </div>
        </div>
    </AppLayout>
</template>
