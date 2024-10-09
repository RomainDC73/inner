<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Show the dashboard.
     *
     * @return \Inertia\Response
     */

    public function index()
    {
        $posts = Post::where('user_id', Auth::id())
            ->latest()
            ->take(5)
            ->with('mood')
            ->get();

        return Inertia::render('Dashboard', [
            'greetings' => __('greetings'),
            'posts' => $posts,
        ]);
    }

}
