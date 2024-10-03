<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log as LogFacade;

class DashboardController extends Controller
{
    /**
     * Show the dashboard.
     *
     * @return \Inertia\Response
     */

    public function index()
    {
        // app()->setLocale('fr');
        LogFacade::info('Locale actuelle : ' . app()->getLocale());
        return Inertia::render('Dashboard', [
            'greetings' => __('greetings'),
        ]);
    }

}
