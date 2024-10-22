<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;

class MoodController extends Controller
{
    public function chooseMood()
    {
        $moods = Mood::all();
        $moodTranslations = Lang::get('moods');

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

        session(['mood_id' => $request->input('mood_id')]);

        return redirect()->route('create.choose-action');
    }

    // Affiche la page d'édition de l'humeur pour un post donné
    public function editMood($postId)
    {
        // Récupération du post
        $post = Post::findOrFail($postId);

        // Récupération des moods
        $moods = Mood::all();

        // Récupération des traductions des moods
        $moodTranslations = Lang::get('moods');

        return Inertia::render('Edit/EditMood', [
            'post' => $post,
            'moods' => $moods,
            'moodTranslations' => $moodTranslations,
        ]);
    }

    // Met à jour l'humeur d'un post
    public function updateMood(Request $request, $id)
    {
        // Valide l'ID du mood
        $request->validate([
            'mood_id' => 'required|exists:moods,id',
        ]);

        // Récupère le post via l'ID
        $post = Post::findOrFail($id);

        // Met à jour le mood du post
        $post->mood_id = $request->input('mood_id');
        $post->save();

        // Redirige vers une autre page ou retour à la même page avec un message de succès
        return redirect()->route('posts.show', $id)->with('success', 'Mood mis à jour avec succès');
    }
}
