<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Récupérer les phrases en fonction de la langue actuelle
        $greetings = __('greetings.phrases');

        return inertia('Dashboard', [
            'greetings' => $greetings,
        ]);
    }
}
