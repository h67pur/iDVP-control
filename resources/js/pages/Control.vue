<template>
    <Head title="Управление компонентами" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="space-y-6 p-6">
            <!-- Блок информации о версиях с возможностью управления -->
            <div class="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Компоненты системы</h3>
                <div class="space-y-3">
                    <div v-for="component in components" :key="component.name" class="rounded-lg border border-gray-200 dark:border-gray-700">
                        <!-- Заголовок компонента -->
                        <button
                            @click="toggleComponent(component.name)"
                            class="flex w-full items-center justify-between rounded-t-lg bg-gray-50 px-4 py-3 dark:bg-gray-700"
                        >
                            <div class="flex items-center space-x-3">
                                <span class="font-medium text-gray-700 dark:text-gray-300">{{ component.displayName }}</span>
                                <span :class="`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusClass(component.status)}`">
                                    {{ component.status }}
                                </span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    {{ component.currentVersion }}
                                    <span v-if="hasUpdate(component.name)" class="ml-1 text-xs">→ {{ component.latestVersion }}</span>
                                </span>
                                <svg
                                    :class="`h-5 w-5 transform transition-transform ${expandedComponents[component.name] ? 'rotate-180' : ''}`"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        <!-- Детали компонента -->
                        <div v-if="expandedComponents[component.name]" class="space-y-4 p-4">
                            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Информация</h4>
                                    <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <p><span class="font-medium">Версия:</span> {{ component.currentVersion }}</p>
                                        <p v-if="hasUpdate(component.name)" class="text-blue-600 dark:text-blue-400">
                                            <span class="font-medium">Доступно обновление:</span> {{ component.latestVersion }}
                                        </p>
                                        <p><span class="font-medium">Последнее обновление:</span> {{ component.lastUpdated }}</p>
                                        <p><span class="font-medium">Статус:</span> {{ component.status }}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Ресурсы</h4>
                                    <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <div class="flex items-center justify-between">
                                            <span>CPU</span>
                                            <div class="h-2 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    :class="`h-2 rounded-full ${getResourceClass(component.resources.cpu)}`"
                                                    :style="`width: ${component.resources.cpu}%`"
                                                ></div>
                                            </div>
                                            <span class="w-10 text-right">{{ component.resources.cpu }}%</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span>Память</span>
                                            <div class="h-2 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    :class="`h-2 rounded-full ${getResourceClass(component.resources.memory)}`"
                                                    :style="`width: ${component.resources.memory}%`"
                                                ></div>
                                            </div>
                                            <span class="w-10 text-right">{{ component.resources.memory }}%</span>
                                        </div>
                                        <div class="flex items-center justify-between">
                                            <span>Диск</span>
                                            <div class="h-2 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    :class="`h-2 rounded-full ${getResourceClass(component.resources.disk)}`"
                                                    :style="`width: ${component.resources.disk}%`"
                                                ></div>
                                            </div>
                                            <span class="w-10 text-right">{{ component.resources.disk }}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-wrap items-center justify-between gap-3 border-t pt-4 dark:border-gray-700">
                                <div class="flex items-center space-x-2">
                                    <button
                                        @click="toggleComponentService(component.name)"
                                        :disabled="component.isProcessing"
                                        :class="`rounded-md px-3 py-1.5 text-sm font-medium ${component.isRunning ? 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800' : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'}`"
                                    >
                                        {{ component.isRunning ? 'Остановить' : 'Запустить' }}
                                    </button>
                                    <button
                                        @click="restartComponent(component.name)"
                                        :disabled="component.isProcessing"
                                        class="rounded-md bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-800 hover:bg-yellow-200 disabled:opacity-50 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800"
                                    >
                                        Перезапустить
                                    </button>
                                </div>

                                <div class="flex items-center space-x-2">
                                    <button
                                        v-if="hasUpdate(component.name)"
                                        @click="updateComponent(component.name)"
                                        :disabled="component.isProcessing"
                                        class="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
                                    >
                                        Обновить
                                    </button>
                                    <button
                                        @click="showComponentLogs(component.name)"
                                        class="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                    >
                                        Логи
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Блок истории обновлений -->
            <div class="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                <div class="mb-4 flex items-center justify-between">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">История обновлений</h3>
                    <button
                        @click="checkAllUpdates"
                        class="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    >
                        Проверить обновления
                    </button>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                        <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Компонент</th>
                            <th scope="col" class="px-6 py-3">Версия</th>
                            <th scope="col" class="px-6 py-3">Дата</th>
                            <th scope="col" class="px-6 py-3">Статус</th>
                            <th scope="col" class="px-6 py-3">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in updateHistory" :key="index" class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                            <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">{{ item.component }}</td>
                            <td class="px-6 py-4">{{ item.version }}</td>
                            <td class="px-6 py-4">{{ item.date }}</td>
                            <td class="px-6 py-4">
                                <span :class="`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(item.status)}`">
                                    {{ item.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <button
                                    v-if="item.status === 'Ошибка'"
                                    @click="retryUpdate(item)"
                                    class="text-sm text-blue-600 hover:underline dark:text-blue-500"
                                >
                                    Повторить
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AppLayout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Head } from '@inertiajs/vue3';
import AppLayout from '@/layouts/AppLayout.vue';
import type { BreadcrumbItem } from '@/types';

interface ComponentResources {
    cpu: number
    memory: number
    disk: number
}

interface Component {
    name: string
    displayName: string
    currentVersion: string
    latestVersion: string
    status: 'Работает' | 'Остановлен' | 'Ошибка' | 'Обновляется'
    isRunning: boolean
    isProcessing: boolean
    lastUpdated: string
    resources: ComponentResources
}

interface UpdateHistoryItem {
    component: string
    version: string
    date: string
    status: 'Успешно' | 'Ошибка' | 'В процессе'
}

const components = ref<Component[]>([
    {
        name: 'iDVP-Data',
        displayName: 'iDVP Data Service',
        currentVersion: '2.12.5',
        latestVersion: '2.13.0',
        status: 'Работает',
        isRunning: true,
        isProcessing: false,
        lastUpdated: '15.04.2025 14:30',
        resources: {
            cpu: 45,
            memory: 32,
            disk: 18
        }
    },
    {
        name: 'iDVP-Analytics',
        displayName: 'iDVP Analytics Engine',
        currentVersion: '1.16.1',
        latestVersion: '1.17.0',
        status: 'Работает',
        isRunning: true,
        isProcessing: false,
        lastUpdated: '10.04.2025 09:15',
        resources: {
            cpu: 28,
            memory: 45,
            disk: 22
        }
    },
    {
        name: 'iDVP-Admin',
        displayName: 'iDVP Admin Panel',
        currentVersion: '2.5.0',
        latestVersion: '2.6.0',
        status: 'Остановлен',
        isRunning: false,
        isProcessing: false,
        lastUpdated: '05.04.2025 16:45',
        resources: {
            cpu: 0,
            memory: 5,
            disk: 12
        }
    }
])

const expandedComponents = ref<Record<string, boolean>>({
    'iDVP-Data': false,
    'iDVP-Analytics': false,
    'iDVP-Admin': false
})

const updateHistory = ref<UpdateHistoryItem[]>([
    { component: 'iDVP-Admin', version: '2.5.0', date: '15.04.2025 14:30', status: 'Успешно' },
    { component: 'iDVP-Analytics', version: '1.16.1', date: '10.04.2025 09:15', status: 'Успешно' },
    { component: 'iDVP-Data', version: '2.12.5', date: '05.04.2025 16:45', status: 'Ошибка' },
    { component: 'iDVP-Data', version: '2.12.5', date: '03.04.2025 11:20', status: 'Успешно' }
])

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Главная страница',
        href: '/control',
    },
];

const hasUpdate = (componentName: string) => {
    const component = components.value.find(c => c.name === componentName)
    return component && component.currentVersion !== component.latestVersion
}

const getStatusClass = (status: string) => {
    switch (status) {
        case 'Успешно':
        case 'Работает':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        case 'Ошибка':
        case 'Остановлен':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        case 'В процессе':
        case 'Обновляется':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    }
}

const getResourceClass = (value: number) => {
    if (value > 80) return 'bg-red-500'
    if (value > 60) return 'bg-yellow-500'
    return 'bg-green-500'
}

const toggleComponent = (name: string) => {
    expandedComponents.value[name] = !expandedComponents.value[name]
}

const toggleComponentService = async (name: string) => {
    const component = components.value.find(c => c.name === name)
    if (!component) return

    component.isProcessing = true
    try {
        // Здесь будет вызов API для управления сервисом
        await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация запроса

        component.isRunning = !component.isRunning
        component.status = component.isRunning ? 'Работает' : 'Остановлен'

        // Обновляем ресурсы при остановке
        if (!component.isRunning) {
            component.resources = {
                cpu: 0,
                memory: 5,
                disk: component.resources.disk
            }
        }
    } finally {
        component.isProcessing = false
    }
}

const restartComponent = async (name: string) => {
    const component = components.value.find(c => c.name === name)
    if (!component) return

    component.isProcessing = true
    component.status = 'Обновляется'
    try {
        // Здесь будет вызов API для перезапуска сервиса
        await new Promise(resolve => setTimeout(resolve, 1500)) // Имитация запроса

        component.status = 'Работает'
        component.isRunning = true
    } finally {
        component.isProcessing = false
    }
}

const updateComponent = async (name: string) => {
    const component = components.value.find(c => c.name === name)
    if (!component || !hasUpdate(name)) return

    component.isProcessing = true
    component.status = 'Обновляется'
    try {
        // Здесь будет вызов API для обновления
        await new Promise(resolve => setTimeout(resolve, 2000)) // Имитация запроса

        // Добавляем запись в историю
        updateHistory.value.unshift({
            component: name,
            version: component.latestVersion,
            date: new Date().toLocaleString('ru-RU'),
            status: 'Успешно'
        })

        // Обновляем версию
        component.currentVersion = component.latestVersion
        component.status = 'Работает'
        component.lastUpdated = new Date().toLocaleString('ru-RU')
    } catch {
        updateHistory.value.unshift({
            component: name,
            version: component.latestVersion,
            date: new Date().toLocaleString('ru-RU'),
            status: 'Ошибка'
        })
        component.status = 'Ошибка'
    } finally {
        component.isProcessing = false
    }
}

const checkAllUpdates = async () => {
    // Здесь будет вызов API для проверки обновлений всех компонентов
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Имитация получения новых версий
    components.value.forEach(comp => {
        if (comp.name === 'iDVP-Data') comp.latestVersion = '2.13.0'
        if (comp.name === 'iDVP-Analytics') comp.latestVersion = '1.17.0'
        if (comp.name === 'iDVP-Admin') comp.latestVersion = '2.6.0'
    })
}

const retryUpdate = (item: UpdateHistoryItem) => {
    const component = components.value.find(c => c.name === item.component)
    if (component) {
        updateComponent(component.name)
    }
}

const showComponentLogs = (name: string) => {
    // Здесь будет логика для отображения логов компонента
    console.log(`Показать логи для ${name}`)
}
</script>
