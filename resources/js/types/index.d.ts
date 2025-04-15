import type { PageProps } from '@inertiajs/core';
import type { LucideIcon } from 'lucide-vue-next';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface SharedData extends PageProps {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export type BreadcrumbItemType = BreadcrumbItem;

export type SystemStatus = 'active' | 'maintenance' | 'error'
export type UpdateMode = 'auto' | 'manual' | 'notification'

export interface Update {
    version: string
    size: string
    stability: 'stable' | 'beta' | 'alpha'
    changes: string[]
    recommended: boolean
}

export interface HistoryRecord {
    version: string
    date: string
    status: 'success' | 'failed'
    details?: string
}
