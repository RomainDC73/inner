<?php
namespace App\Http\Controllers;

use App\Models\Mood;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DescriptionController extends Controller
{
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
        $mood_id = session('mood_id');
        $description = session('description', '');

        return Inertia::render('Create/Write', [
            'mood_id' => $mood_id,
            'initial_description' => $description,
        ]);
    }

    public function addDescription(Request $request)
    {
        $request->validate([
            'mood_id' => 'required|exists:moods,id',
            'description' => 'required|string|max:1000',
        ]);

        // Stocker la description dans la session
        session(['mood_id' => $request->input('mood_id')]);
        session(['description' => $request->input('description')]);
        Log::info('Description stored in session: ' . session('description'));

        // Rediriger vers l'étape suivante (ajout de média par ex.)
        return redirect('create/add-media');
    }

    public function saveDescription(Request $request)
    {
        $request->validate([
            'description' => 'required|string|max:1000',
        ]);

        session(['description' => $request->input('description')]);

        return redirect('/create/add-media');
    }

    public function editDescription($postId)
    {
        // Récupération du post
        $post = Post::findOrFail($postId);

        return Inertia::render('Edit/EditDescription', [
            'post' => $post,
        ]);
    }

    public function updateDescription(Request $request, $postId)
    {
        // Valide la description
        $request->validate([
            'description' => 'required|string|max:5000',
        ]);

        // Récupère le post via l'ID
        $post = Post::findOrFail($postId);

        // Met à jour la description du post
        $post->description = $request->input('description');
        $post->save();

        // Redirige vers une autre page ou retour à la même page avec un message de succès
        return redirect()->route('posts.show', $postId)->with('success', 'Description mise à jour avec succès');
    }

    public function showTalkForm()
    {
        $mood_id = session('mood_id'); // Récupérer le mood sélectionné
        return Inertia::render('Create/Talk', ['mood_id' => $mood_id]);
    }

    public function saveTalk(Request $request)
    {
        $request->validate([
            'audio' => 'required|file|max:20000', // Limite à 20 Mo
        ]);

        if ($request->hasFile('audio')) {
            // Stockage du fichier audio
            $audioPath = $request->file('audio')->store('audio', 'public');
            session(['audio_path' => $audioPath]); // Stocker le chemin dans la session
        }

        if ($request->hasFile('audio')) {
            $file = $request->file('audio');
            Log::info('Type MIME : ' . $file->getMimeType());
            Log::info('Nom du fichier : ' . $file->getClientOriginalName());
        }

        return redirect('/create/add-media');
    }

    public function editAudio($postId)
    {
        // Récupération du post
        $post = Post::findOrFail($postId);

        return Inertia::render('Edit/EditAudio', [
            'post' => $post,
        ]);
    }

    public function updateAudio(Request $request, $postId)
{
    // Logs pour voir ce qui est envoyé avant toute manipulation
    Log::info('Données de la requête : ', $request->all());
    Log::info('Fichier audio : ', [$request->file('audio')]);

    // Valide que le fichier est bien un audio et qu'il ne dépasse pas 20 Mo
    $request->validate([
        'audio' => 'required|file|max:20000', // Vérifie le type et limite la taille
    ]);

    // Récupère le post via l'ID
    $post = Post::findOrFail($postId);

    // Supprime l'ancien fichier audio s'il existe
    if ($request->hasFile('audio')) {
        Log::info('Fichier reçu', ['audio' => $request->file('audio')]);

        // Supprime l'ancien fichier audio
        if ($post->audio_path) {
            Storage::delete($post->audio_path);
        }

        // Stocke le nouveau fichier audio
        $newAudioPath = $request->file('audio')->store('audio', 'public');
        $post->audio_path = $newAudioPath;
        $post->save();
    } else {
        Log::info('Aucun fichier audio reçu');
    }

    // Redirige vers la page du post avec un message de succès
    return response()->json(['redirect' => route('posts.show', $postId)]);
}

}

