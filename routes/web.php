<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('control-panel', function () {
    return Inertia::render('ControlPanel');
})->middleware(['auth', 'verified'])->name('control-panel');

Route::get('control', function () {
    return Inertia::render('Control');
})->middleware(['auth', 'verified'])->name('control');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
