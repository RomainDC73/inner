<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{

    public function index()
    {
        // Récupérer les phrases du fichier de traduction
        $greetings = __('greetings.phrases');

        // Récupérer l'utilisateur authentifié
        $user = Auth::user(); // Utiliser Auth::user() pour obtenir l'utilisateur

        // Vérification supplémentaire pour s'assurer que les phrases sont récupérées
        if (is_array($greetings)) {
            return inertia('Dashboard', [
                'greetings' => $greetings,
                'auth' => $user, // Passer l'utilisateur ici
            ]);
        }

        // Si quelque chose échoue, retourne quand même l'utilisateur
        return inertia('Dashboard', [
            'greetings' => [],
            'auth' => $user, // Passer l'utilisateur ici
        ]);
    }
}


