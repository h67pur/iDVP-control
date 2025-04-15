<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Добро пожаловать">
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    </Head>
    <div class="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] lg:justify-center lg:p-8">
        <header class="not-has-[nav]:hidden mb-6 w-full max-w-[335px] text-sm lg:max-w-4xl">
            <nav class="flex items-center justify-end gap-4">
                <Link v-if="$page.props.auth.user"
                      :href="route('dashboard')"
                      class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                    Дашборд
                </Link>
                <template v-else>
                    <Link :href="route('login')"
                          class="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]">
                        Войти
                    </Link>
                    <Link
                        :href="route('register')"
                        class="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Регистрация
                    </Link>
                </template>
            </nav>
        </header>
        <div class="duration-750 starting:opacity-0 flex w-full items-center justify-center opacity-100 transition-opacity lg:grow">
            <main class="flex w-full flex-col-reverse overflow-hidden rounded-lg lg:max-w-6xl lg:flex-row">
                <div class="flex-1 rounded-bl-lg rounded-br-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d] lg:rounded-br-none lg:rounded-tl-lg lg:p-20">
                    <h1 class="mb-4 text-2xl font-bold">Добро пожаловать в IDVP-Console</h1>
                    <p class="mb-6 text-[#706f6c] dark:text-[#A1A09A]">
                        Interactive Data Verification Platform Console - передовое решение для автоматизированной
                        проверки и обработки данных с использованием искусственного интеллекта.
                    </p>

                    <ul class="mb-6 space-y-4">
                        <li class="flex items-start">
                            <svg class="mt-0.5 mr-3 h-4 w-4 flex-shrink-0 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Автоматическая верификация данных в реальном времени</span>
                        </li>
                        <li class="flex items-start">
                            <svg class="mt-0.5 mr-3 h-4 w-4 flex-shrink-0 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Интеграция с внешними API и базами данных</span>
                        </li>
                        <li class="flex items-start">
                            <svg class="mt-0.5 mr-3 h-4 w-4 flex-shrink-0 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Гибкие настройки правил проверки</span>
                        </li>
                    </ul>

                    <div class="mt-8">
                        <a href="#" class="inline-flex items-center rounded-md bg-[#0066FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#0052CC]">
                            Начать работу
                            <svg class="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="relative -mb-px aspect-335/376 w-full shrink-0 overflow-hidden rounded-t-lg bg-gradient-to-br from-[#0066FF] to-[#00C6FF] dark:from-[#0a1a3a] dark:to-[#1a365d] lg:-ml-px lg:mb-0 lg:aspect-auto lg:w-[438px] lg:rounded-r-lg lg:rounded-t-none">
                    <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                        <h1 class="text-7xl font-bold text-white">IDVP</h1>
                        <h2 class="text-7xl font-bold text-white">Console</h2>
                        <p class="mt-4 text-lg text-white/80">Интерактивная платформа<br>верификации данных</p>
                    </div>
                    <div class="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d] lg:overflow-hidden lg:rounded-r-lg lg:rounded-t-none"></div>
                </div>
            </main>
        </div>
        <div class="h-14.5 hidden lg:block"></div>
    </div>
</template>
