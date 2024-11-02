<?php

namespace Influx\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Influx\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Contracts\Hashing\Hasher;

class UsersController extends Controller
{
    /**
     * UsersController constructor.
     */
    public function __construct(private Hasher $hasher)
    {
    }

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
        $validated['password'] = $this->hasher->make($validated['password']);

        $user = User::create($validated);

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'alert' => [
                'type' => 'success',
                'message' => 'User account has been saved.',
            ],
        ]);
    }

    /**
     * View a user already on the system.
     */
    public function view(Request $request, int $id): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => User::findOrFail($id),
        ]);
    }

    /**
     * Update the details of an existing user.
     */
    public function update(Request $request, int $id): Response
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'max:50'],
            'email' => ['required', 'max:50', 'email'],
            'password' => ['nullable', 'min:8'],
            'superuser' => ['required'],
        ]);
        
        if (!empty($validated['password'])) {
            $validated['password'] = $this->hasher->make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $validated['superuser'] = $validated['superuser'] === 'on' ? true : false;

        $user->forceFill($validated)->saveOrFail();

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'alert' => [
                'type' => 'success',
                'message' => 'User account details have been saved.',
            ],
        ]);
    }

    /**
     * Delete a user account.
     */
    public function delete(int $id): Response
    {
        $user = User::findOrFail($id);

        try {
            $user->delete();
        } catch (\Exception $ex) {
            throw new \Exception($ex->getMessage());
        };

        return Inertia::render('Users/Index', [
            'users' => User::all(),
            'alert' => [
                'type' => 'info',
                'message' => 'User account has been removed.',
            ],
        ]);
    }
}
