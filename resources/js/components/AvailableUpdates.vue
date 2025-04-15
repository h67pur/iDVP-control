<template>
    <div class="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <div class="mb-6 flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Доступные обновления</h3>
            <div class="flex items-center space-x-4">
        <span v-if="lastCheck" class="text-sm text-gray-500 dark:text-gray-400">
          Последняя проверка: {{ lastCheck }}
        </span>
                <button
                    @click="$emit('refresh')"
                    class="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div v-for="update in updates" :key="update.version" class="mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="bg-blue-50 px-6 py-4 dark:bg-gray-700/50">
                <div class="flex items-center justify-between">
                    <div>
                        <h4 class="text-lg font-medium text-gray-900 dark:text-white">{{ update.version }}</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ update.stability === 'stable' ? 'Стабильная версия' : 'Бета-версия' }} • {{ update.size }}
                        </p>
                    </div>
                    <span
                        v-if="update.recommended"
                        class="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-500"
                    >
            Рекомендуется
          </span>
                </div>
            </div>
            <div class="bg-white px-6 py-4 dark:bg-gray-800">
                <div class="mb-4">
                    <h5 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Что нового:</h5>
                    <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li v-for="(change, index) in update.changes" :key="index" class="flex items-start">
                            <svg class="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span>{{ change }}</span>
                        </li>
                    </ul>
                </div>
                <div class="flex justify-end space-x-3">
                    <button
                        class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                        Подробнее
                    </button>
                    <button
                        @click="$emit('install', update.version)"
                        class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Установить обновление
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Update } from '../types'

defineProps<{
    updates: Update[]
    lastCheck?: string | null
}>()

defineEmits(['install', 'refresh'])
</script>
