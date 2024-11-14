<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function addMedia()
    {
        // Récupérer les données stockées en session
        $mood_id = session('mood_id');
        $description = session('description');
        $media_path = session('media_path');

        return Inertia::render('Create/AddMedia', [
            'mood_id' => $mood_id,
            'description' => $description,
            'media_path' => $media_path,
        ]);
    }

    public function saveMedia(Request $request)
    {
        $request->validate([
            'media' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('media')) {
            // Stocker le chemin du fichier média dans la session pour un usage ultérieur
            $mediaPath = $request->file('media')->store('media', 'public');
            // Stocker le fichier en session pour un enregistrement ultérieur
            session(['media_path' => $mediaPath]);
        }

        Log::info('Media path stored in session: ' . session('media_path'));
        return redirect()->route('create.recap'); // Assurez-vous que cette route existe
    }

    // Affiche la page d'édition de l'image pour un post donné
    public function editMedia($postId)
    {
        // Récupère le post
        $post = Post::findOrFail($postId);

        return Inertia::render('Edit/EditMedia', [
            'post' => $post,
        ]);
    }

    // Met à jour l'image du post
    public function updateMedia(Request $request, $id)
{
    Log::info('Requête reçue', [
        'all' => $request->all(),
        'files' => $request->allFiles(),
        'hasFile' => $request->hasFile('media'),
    ]); // Pour vérifier ce qui est reçu

    // Validation du fichier média
    $request->validate([
        'media' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $post = Post::findOrFail($id);

    // Vérifie si le fichier est bien reçu
    if ($request->hasFile('media')) {
        Log::info('Fichier reçu', ['media' => $request->file('media')]);

        // Supprime l'ancienne image si nécessaire
        if ($post->media_path) {
            Storage::delete($post->media_path);
        }

        // Enregistre la nouvelle image
        $path = $request->file('media')->store('media', 'public');
        $post->media_path = $path;
        $post->save();
    } else {
        Log::info('Aucun fichier détecté');
    }

    return response()->json(['redirect' => route('posts.show', $id)]);

}

}

