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
}
