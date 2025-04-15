<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
}

defineProps<Props>();
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="abstract-logo">
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6366F1"/>
                <stop offset="50%" stop-color="#8B5CF6"/>
                <stop offset="100%" stop-color="#EC4899"/>
            </linearGradient>
        </defs>

        <path d="M50,50
           C100,20 150,20 180,80
           C200,120 160,180 100,170
           C40,160 20,100 50,50Z"
              fill="url(#logoGradient)"
              stroke="#FFFFFF"
              stroke-width="3"/>

        <circle cx="110" cy="110" r="30" fill="#FFFFFF" opacity="0.9">
            <animate attributeName="r" values="30;35;30" dur="5s" repeatCount="indefinite"/>
        </circle>

        <path d="M60,60 L140,140" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
        <path d="M140,60 L60,140" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    </svg>
</template>
