<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Mood;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index(Request $request)
    {
    // Récupérer tous les posts de l'utilisateur connecté
        $posts = Post::with(['mood'])->where('user_id', Auth::id())->get();

        return response()->json($posts); // Retourner les posts sous forme de JSON
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


