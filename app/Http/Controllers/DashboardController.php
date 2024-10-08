<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

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
