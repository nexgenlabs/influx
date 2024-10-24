<?php

namespace Influx\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Influx\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    /**
     * Display the table holding all user accounts.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Users/Index', [
            'users' => User::all(),
        ]);
    }

    /**
     * Display the form for creating a new user.
     */
    public function new(Request $request): Response
    {
        return Inertia::render('Users/New');
    }

    /**
     * Store a new user request.
     */
    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'name' => ['required', 'max:50', 'unique:users,name'],
            'email' => ['required', 'max:50', 'email', 'unique:users,email'],
            'password' => ['required', 'min:8'],
            'superuser' => ['required'],
        ]);
        
        $validated['superuser'] = $validated['superuser'] === 'on' ? true : false;

        User::create($validated);

        return Inertia::render('Users/Index');
    }
}
