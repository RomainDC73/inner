<?php
namespace App\Http\Controllers;

use App\Models\Mood;
use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
    // Validation du fichier audio
    $validated = $request->validate([
        'audio' => 'required|mimes:webm|max:10240',
    ]);

    try {
        if ($request->hasFile('audio')) {
            // Log avant de sauvegarder le fichier
            Log::info('Fichier audio reçu : ' . $request->file('audio')->getClientOriginalName());

            // Sauvegarder le fichier
            $audioPath = $request->file('audio')->store('audio', 'public');

            // Log du chemin de sauvegarde
            Log::info('Chemin du fichier sauvegardé : ' . $audioPath);

            // Sauvegarder le chemin dans la session ou la base de données
            session(['audio_path' => $audioPath]);

            // Rediriger avec un message de succès
            return redirect('create/add-media')->with('success', 'Enregistrement vocal ajouté avec succès.');
        } else {
            Log::error('Aucun fichier audio reçu');
            return redirect()->back()->withErrors(['audio' => 'Aucun fichier audio n\'a été téléchargé.']);
        }
    } catch (\Exception $e) {
        // En cas d'erreur, log de l'exception
        Log::error('Erreur lors de la sauvegarde de l\'audio : ' . $e->getMessage());

        // Retourner un message d'erreur à l'utilisateur
        return redirect()->back()->withErrors(['audio' => 'Une erreur est survenue lors de l\'enregistrement de l\'audio.']);
    }
}




}
