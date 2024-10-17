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

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('posts', [PostController::class, 'showPostsPage']);
    Route::get('/post/{id}', [PostController::class, 'show'])->name('posts.show');
});

// Route pour choisir le mood
Route::get('/create/choose-mood', [MoodController::class, 'chooseMood']);
Route::post('/create/save-mood', [MoodController::class, 'saveMood']);

// Route pour choisir entre écrire ou parler
Route::get('/create/choose-action', [DescriptionController::class, 'chooseAction']);

// Routes pour écrire et parler
Route::get('/create/write', [DescriptionController::class, 'showWriteForm']);
Route::post('/create/write', [DescriptionController::class, 'addDescription']);
Route::get('/create/talk', [DescriptionController::class, 'showTalkForm']);

// Route pour ajouter une image
Route::get('/create/add-media', [MediaController::class, 'addMedia']);
Route::post('/posts/submit-media', [MediaController::class, 'saveMedia']);

Route::get('/create/confirm', [PostController::class, 'showConfirm']);


// Route pour sauvegarder le post final
Route::post('/create/save', [PostController::class, 'store']);

require __DIR__.'/auth.php';
