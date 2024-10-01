<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Show the dashboard.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'greetings' => __('greetings'),
        ]);
    }

}
