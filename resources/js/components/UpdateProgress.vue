<template>
    <div class="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-700/30">
        <h4 class="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Установка обновления {{ version }}
        </h4>
        <div class="mb-4">
            <div class="mb-2 flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                <span>Прогресс</span>
                <span>{{ Math.round(progress * 100) }}%</span>
            </div>
            <div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                    class="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
                    :style="{ width: `${progress * 100}%` }"
                ></div>
            </div>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
            <p class="mb-1">Этап: {{ currentStep }}</p>
            <p>Осталось примерно: {{ timeRemaining }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    version: string
    progress: number
    currentStep: string
    timeRemaining: string
}>()
</script>
