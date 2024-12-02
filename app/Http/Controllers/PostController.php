<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use App\Models\Post;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;


class PostController extends Controller
{
    public function showPostsPage(Request $request)
    {
        $query = Post::query()->where('user_id', Auth::id())->with('mood');

        //Appliquer le filtre par mood s'il est sélectionné
        if ($request->filled('mood')) {
            $query->where('mood_id', $request->mood);
        }

        // Appliquer le filtre par date s'il est sélectionné
        if ($request->filled('date')) {
            $date = Carbon::parse($request->date);
            $query->whereDate('created_at', $date);
        }

        $posts = $query->orderBy('created_at', 'desc')->paginate(5);

        // Renvoyer les données à la vue avec la liste des moods
        $moods = Mood::all();

        // Rendre la vue Inertia avec les posts
        return Inertia::render('Posts', [
            'posts' => $posts,
            'moods' => $moods,
            'filters' => $request->all('mood', 'date'), // Passer les filtres à la vue
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
        return Inertia::render('Post', [
            'post' => $post,
            'moodTranslations' => $moodTranslations,
        ]);
    }

    public function recap()
    {
        $mood_id = session('mood_id'); // Récupérer l'humeur, si nécessaire
        $mood = Mood::find($mood_id); // Si le mood_id est présent dans la session, on récupère l'objet Mood correspondant
        $description = session('description'); // Récupérer la description, si nécessaire
        $audioPath = session('audio_path', null);
        $mediaPath = session('media_path'); // Récupérer le chemin de l'image

        $moodTranslations = Lang::get('moods'); // Charger les traductions pour moods

        return Inertia::render('Create/Recap', [
            'mood' => $mood,
            'moodTranslations' => $moodTranslations,
            'description' => $description,
            'audioPath' => $audioPath,
            'mediaPath' => $mediaPath,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'mood_id' => 'required|exists:moods,id',
            'description' => 'nullable|string|max:1000',
            'audio' => 'nullable|mimes:webm|max:20000', // Limite à 10 Mo
            'media' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Créer une nouvelle entrée avec les données de la session validées
        $post = new Post();
        $post->user_id = Auth::id();
        $post->mood_id = $request->input('mood_id');
        $post->description = $request->input('description');
        $post->audio_path = $request->input('audio_path');
        $post->media_path = $request->input('media_path');
        $post->save();

        // Vider la session
        $request->session()->forget(['mood_id', 'description', 'media_path', 'audio_path']);

        // Redirection après la sauvegarde
        return redirect()->route('dashboard')->with('success', 'Post créé avec succès !');
    }


    public function destroy($id)
    {
         // Récupérer le post correspondant à l'utilisateur authentifié
        $post = Post::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        // Supprimer le post
        $post->delete();

        return redirect()->route('dashboard')->with('success', 'Post supprimé avec succès !');
    }


}
