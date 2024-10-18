<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\MoodController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DescriptionController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Gestion du profil
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    // Routes des posts
    Route::prefix('posts')->group(function () {
        Route::get('/', [PostController::class, 'index'])->name('posts.index');
        Route::get('/{id}', [PostController::class, 'show'])->name('posts.show');
        Route::post('/create/save', [PostController::class, 'store'])->name('posts.store');
    });

    // Routes pour la création de posts avec un préfixe et un nom
    Route::prefix('create')->name('create.')->group(function () {
        Route::get('/choose-mood', [MoodController::class, 'chooseMood'])->name('choose-mood');
        Route::post('/save-mood', [MoodController::class, 'saveMood'])->name('save-mood');

        Route::get('/choose-action', [DescriptionController::class, 'chooseAction'])->name('choose-action');

        // Routes pour écrire ou parler
        Route::get('/write', [DescriptionController::class, 'showWriteForm'])->name('write');
        Route::post('/write', [DescriptionController::class, 'addDescription'])->name('save-description');
        Route::get('/talk', [DescriptionController::class, 'showTalkForm'])->name('talk');

        // Route pour l'ajout de média
        Route::get('/add-media', [MediaController::class, 'addMedia'])->name('add-media');
        Route::post('/submit-media', [MediaController::class, 'saveMedia'])->name('submit-media');

        // Route pour la confirmation finale
        Route::get('/showrecap', [PostController::class, 'showRecap'])->name('recap');
    });
});

require __DIR__.'/auth.php';
