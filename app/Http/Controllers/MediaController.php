<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        return redirect()->route('create.confirm'); // Assurez-vous que cette route existe
    }
}

