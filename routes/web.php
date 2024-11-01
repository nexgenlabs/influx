<?php

use Influx\Http\Controllers\UsersController;
use Influx\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::prefix('/users')->group(function () {
        Route::get('/', [UsersController::class, 'index'])->name('users.index');

        Route::get('/new', [UsersController::class, 'new'])->name('users.new');
        Route::post('/new', [UsersController::class, 'store'])->name('users.store');

        Route::get('/{user:id}', [UsersController::class, 'view'])->name('users.view');
        Route::put('/{user:id}', [UsersController::class, 'update'])->name('users.update');
        Route::delete('/{user:id}', [UsersController::class, 'delete'])->name('users.delete');
    });

    Route::prefix('/profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';
