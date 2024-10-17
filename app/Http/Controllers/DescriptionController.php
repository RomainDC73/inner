<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
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
            'description' => 'required|string|max:1000', // Limite de texte
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

    public function showTalkForm()
    {
        $mood_id = session('mood_id'); // Récupérer le mood sélectionné
        return Inertia::render('Create/Talk', ['mood_id' => $mood_id]);
    }

}

