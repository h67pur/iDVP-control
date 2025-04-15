<template>
    <div class="h-full space-y-6">
        <div class="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Конфигурация обновлений</h3>
            <div class="space-y-4">
                <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Режим обновлений</label>
                    <select
                        :value="updateMode"
                        @change="$emit('update:updateMode', ($event.target as HTMLSelectElement).value)"
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="auto">Автоматический (рекомендуется)</option>
                        <option value="manual">Ручное подтверждение</option>
                        <option value="notification">Только уведомления</option>
                    </select>
                </div>

                <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Расписание проверки</label>
                    <input
                        :value="schedule"
                        @input="$emit('update:schedule', ($event.target as HTMLInputElement).value)"
                        type="text"
                        class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                </div>

                <div class="flex items-center">
                    <input
                        id="backup-checkbox"
                        :checked="backupEnabled"
                        @change="$emit('update:backupEnabled', ($event.target as HTMLInputElement).checked)"
                        type="checkbox"
                        class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                    >
                    <label for="backup-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Создавать резервную копию перед обновлением
                    </label>
                </div>
            </div>
        </div>

        <div class="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <h3 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">Быстрые действия</h3>
            <div class="space-y-3">
                <button class="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                    <span>Запустить проверку сейчас</span>
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                </button>
                <button class="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                    <span>Просмотреть историю обновлений</span>
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                </button>
                <button class="flex w-full items-center justify-between rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-red-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-red-400 dark:hover:bg-gray-600">
                    <span>Откатить последнее обновление</span>
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    updateMode: 'auto' | 'manual' | 'notification'
    schedule: string
    backupEnabled: boolean
}>()

defineEmits(['update:updateMode', 'update:schedule', 'update:backupEnabled'])
</script>
