<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';
import PlaceholderPattern from '../components/PlaceholderPattern.vue';

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
        <div class="flex h-full flex-1 flex-col gap-6 p-4">
            <!-- Шапка с навигацией -->
            <div class="flex items-center justify-between rounded-xl p-4 shadow-sm dark:bg-card-dark">
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Модули iDVP</h2>
                <div class="flex gap-3">
                    <button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                        Новый модуль
                    </button>
                    <button class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800">
                        Импорт
                    </button>
                </div>
            </div>

            <!-- Основная сетка модулей -->
            <div class="grid auto-rows-min gap-6 md:grid-cols-3">
                <!-- Модуль 1 - Валидация данных -->
                <div class="overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-card-dark">
                    <div class="h-40 bg-gradient-to-r from-blue-500 to-blue-600">
                        <div class="flex h-full items-center justify-center">
                            <svg class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">Валидация данных</h3>
                        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">Автоматическая проверка структуры и содержания данных</p>
                        <div class="flex justify-between text-sm">
                            <span class="text-blue-600 dark:text-blue-400">Активен</span>
                            <span class="text-gray-500">v2.4.1</span>
                        </div>
                    </div>
                </div>

                <!-- Модуль 2 - Трансформация -->
                <div class="overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-card-dark">
                    <div class="h-40 bg-gradient-to-r from-purple-500 to-purple-600">
                        <div class="flex h-full items-center justify-center">
                            <svg class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
                            </svg>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">Трансформация</h3>
                        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">Конвертация данных между различными форматами</p>
                        <div class="flex justify-between text-sm">
                            <span class="text-blue-600 dark:text-blue-400">Активен</span>
                            <span class="text-gray-500">v1.9.3</span>
                        </div>
                    </div>
                </div>

                <!-- Модуль 3 - Интеграция -->
                <div class="overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-card-dark">
                    <div class="h-40 bg-gradient-to-r from-green-500 to-green-600">
                        <div class="flex h-full items-center justify-center">
                            <svg class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
                            </svg>
                        </div>
                    </div>
                    <div class="p-4">
                        <h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">Интеграция</h3>
                        <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">Подключение внешних API и сервисов</p>
                        <div class="flex justify-between text-sm">
                            <span class="text-yellow-600 dark:text-yellow-400">В разработке</span>
                            <span class="text-gray-500">v0.5.2</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Детализация модуля -->
            <div class="flex-1 rounded-xl border border-gray-200 p-6 shadow-sm dark:border-gray-700 dark:bg-card-dark">
                <div class="mb-6 flex items-center justify-between">
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white">Детали модуля</h3>
                    <div class="flex gap-3">
                        <button class="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
                            Настройки
                        </button>
                        <button class="rounded-lg bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700">
                            Запустить
                        </button>
                    </div>
                </div>

                <div class="grid gap-6 md:grid-cols-3">
                    <!-- Статистика -->
                    <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <h4 class="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Статистика</h4>
                        <div class="space-y-4">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Запусков</p>
                                <p class="text-2xl font-semibold dark:text-white">1,248</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Ошибок</p>
                                <p class="text-2xl font-semibold text-red-600 dark:text-red-400">23</p>
                            </div>
                        </div>
                    </div>

                    <!-- Конфигурация -->
                    <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <h4 class="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Конфигурация</h4>
                        <div class="space-y-3">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Версия</p>
                                <p class="font-medium dark:text-white">2.4.1</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Последнее обновление</p>
                                <p class="font-medium dark:text-white">15.05.2025</p>
                            </div>
                        </div>
                    </div>

                    <!-- Действия -->
                    <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <h4 class="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">Действия</h4>
                        <div class="space-y-2">
                            <button class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                </svg>
                                Обновить модуль
                            </button>
                            <button class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>
                                </svg>
                                Экспорт конфига
                            </button>
                            <button class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-800">
                                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>
                                Удалить модуль
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
</template>
