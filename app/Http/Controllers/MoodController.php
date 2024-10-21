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

    public function updateMood(Request $request, $id)
{
    $request->validate([
        'mood_id' => 'required|exists:moods,id',
    ]);

    $post = Post::findOrFail($id);
    $post->mood_id = $request->input('mood_id');
    $post->save();

    return redirect()->back()->with('success', 'Humeur mise à jour avec succès!');
}
}


