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

    public function chooseMood()
    {
        // Récupérer tous les moods pour les afficher dans la vue
        $moods = Mood::all();
        $moodTranslations = Lang::get('moods');

        // Rendre la vue Inertia avec les moods disponibles
        return Inertia::render('Create/ChooseMood', [
            'moods' => $moods,
            'moodTranslations' => $moodTranslations,
        ]);
    }

    public function saveMood(Request $request)
    {
        $request->validate([
            'mood_id' => 'required|exists:moods,id',
        ]);
        // Stocker l'humeur sélectionnée dans la session
        session(['mood_id' => $request->input('mood_id')]);

        // Redirection vers la page pour choisir l'action
        return redirect('/create/choose-action');
    }

    public function chooseAction(Request $request)
    {
        // Récupérer l'humeur sélectionnée depuis la requête
        $moodId = $request->input('mood_id');

        // Rendre la vue pour choisir entre écrire ou enregistrer un vocal
        return Inertia::render('Create/ChooseAction', [
            'moodId' => $moodId,
        ]);
    }

    public function showWriteForm()
    {
        $mood_id = session('mood_id'); // Récupérer le mood sélectionné
        return Inertia::render('Create/Write', ['mood_id' => $mood_id]);
    }

    public function addDescription(Request $request)
    {
        $request->validate([
            'mood_id' => 'required|exists:moods,id',
            'description' => 'required|string|max:1000', // Limite de texte
        ]);
        // Stocker la description dans la session
        session(['description' => $request->input('description')]);
        // Crée un nouveau post ou met à jour celui existant
        $post = new Post();
        $post->user_id = Auth::id();
        $post->mood_id = $request->input('mood_id');
        $post->description = $request->input('description');
        $post->save();

        return redirect()->route('next.step'); // Rediriger vers l'étape suivante (ajout de média par ex.)
    }

    public function showTalkForm()
    {
        $mood_id = session('mood_id'); // Récupérer le mood sélectionné
        return Inertia::render('Create/Talk', ['mood_id' => $mood_id]);
    }

    public function addMedia()
    {
        // Récupérer les données stockées en session
        $mood_id = session('mood_id');
        $action = session('action');

        return Inertia::render('Create/AddMedia', compact('mood_id', 'action'));
    }

    public function saveMedia(Request $request)
    {
        $request->validate([
            'media' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('media')) {
            // Stocker le fichier en session pour un enregistrement ultérieur
            session(['media_path' => $request->file('media')->store('media', 'public')]);
        }

        return redirect('/create/confirm');
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
