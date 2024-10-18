<?php

namespace App\Http\Controllers;

use App\Models\Mood;
use Illuminate\Http\Request;
use Inertia\Inertia;
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

        return redirect('/create/choose-action');
    }
}
