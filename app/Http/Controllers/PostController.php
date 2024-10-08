<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function showPostsPage()
    {
        // Récupérer les posts de l'utilisateur connecté avec la relation mood
        $posts = Post::where('user_id', Auth::id())->with('mood')->orderBy('created_at', 'desc')->get();
        
        // Rendre la vue Inertia avec les posts
        return Inertia::render('Posts', [
            'posts' => $posts
        ]);
    }

    public function index()
    {
        $posts = Post::where('user_id', Auth::id())->with('mood')->orderBy('created_at', 'desc')->get();
        return response()->json($posts);
    }

    public function show($id)
    {
        // Récupère le post avec son humeur et les détails associés
        $post = Post::with('mood')->findOrFail($id);

        // Charger les traductions pour moods
        $moodTranslations = Lang::get('moods');

        // Retourne la vue avec Inertia, en passant les données du post
        return Inertia::render('PostShow', [
            'post' => $post,
            'moodTranslations' => $moodTranslations,
        ]);
    }

    public function create(Request $request)
    {
        // Validation des données
        $request->validate([
            'mood_id' => 'required|exists:moods,id',
            'description' => 'required|string|max:500',
            'media' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'audio' => 'nullable|file|mimes:mp3,wav|max:2048',
        ]);

        // Chiffrer et stocker le fichier image
        $mediaPath = $request->hasFile('media') ?
        encrypt(Storage::put('media', $request->file('media'))) : null;

        // Chiffrer et stocker le fichier audio
        $audioPath = $request->hasFile('audio') ?
        encrypt(Storage::put('audio', $request->file('audio'))) : null;

        // Création du post
        $post = new Post();
        $post->user_id = Auth::id();
        $post->mood_id = $request->input('mood_id');
        $post->description = $request->input('description');

        // Gestion des fichiers media
        if ($request->hasFile('media')) {
            $post->media_path = $request->file('media')->store('media', 'public');
        }

        if ($request->hasFile('audio')) {
            $post->audio_path = $request->file('audio')->store('audio', 'public');
        }

        $post->save();

        return response()->json($post, 201); // Renvoie le post créé avec un code 201
    }
}


