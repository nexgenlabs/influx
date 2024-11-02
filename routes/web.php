<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Influx\Http\Controllers\UsersController;
use Influx\Http\Controllers\ServersController;
use Influx\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
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

    Route::prefix('/servers')->group(function () {
        Route::get('/', [ServersController::class, 'index'])->name('servers.index');

        Route::post('/new', [ServersController::class, 'store'])->name('servers.store');

        Route::get('/{server:id}', [ServersController::class, 'view'])->name('servers.view');
        Route::put('/{server:id}', [ServersController::class, 'update'])->name('servers.update');
    });

    Route::prefix('/profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__.'/auth.php';
