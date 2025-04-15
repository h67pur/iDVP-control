<template>
    <div class="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Автоматизация обновлений iDVP</h2>
                <p class="text-gray-600 dark:text-gray-400">
                    Текущая версия: <span class="font-mono text-blue-600 dark:text-blue-400">{{ currentVersion }}</span>
                </p>
            </div>
            <div class="flex items-center gap-3">
        <span :class="statusBadgeClasses">
          <span class="mr-2 h-2 w-2 rounded-full" :class="statusDotClasses"></span>
          {{ statusText }}
        </span>
                <button
                    @click="$emit('check-updates')"
                    class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Проверить обновления
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
    currentVersion: string
    systemStatus: 'active' | 'maintenance' | 'error'
}>()

const emit = defineEmits(['check-updates'])

const statusText = computed(() => {
    return {
        active: 'Система активна',
        maintenance: 'Обслуживание',
        error: 'Ошибка'
    }[props.systemStatus]
})

const statusBadgeClasses = computed(() => {
    const base = 'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium'
    return {
        active: `${base} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500`,
        maintenance: `${base} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500`,
        error: `${base} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500`
    }[props.systemStatus]
})

const statusDotClasses = computed(() => {
    return {
        active: 'bg-green-500',
        maintenance: 'bg-yellow-500',
        error: 'bg-red-500'
    }[props.systemStatus]
})
</script>
