<?php

namespace Influx\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Influx\Models\User;
use Influx\Models\Server;
use Illuminate\Http\Request;

class ServersController extends Controller
{
    /**
     * ServersController constructor.
     */
    public function __construct()
    {
    }

    /**
     * Display the table holding all servers.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Servers/Index', [
            'servers' => Server::all(),
        ]);
    }

    /**
     * Display the table holding all servers.
     */
    public function new(Request $request): Response
    {
        return Inertia::render('Servers/New', [
            'users' => User::all(),
        ]);
    }

    /**
     * Store a new server request.
     */
    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'name' => ['required', 'max:50', 'unique:servers,name'],
            'address' => ['required', 'url'],
            'owner_id' => ['nullable'],
            'public' => ['required'],
        ]);

        $validated['public'] = $validated['public'] === 'on' ? true : false;

        if ($request['owner_id'] != 0 && !User::where('id', $request['owner_id'])->exists()) {
            throw new \Exception('This user does not exist.');
        };

        $server = Server::create($validated);

        return Inertia::render('Servers/Edit', [
            'server' => $server,
            'alert' => [
                'type' => 'success',
                'message' => 'Your new server has been created.',
            ],
        ]);
    }

    /**
     * View a server already on the system.
     */
    public function view(Request $request, int $id): Response
    {
        $users = User::all();
        $server = Server::findOrFail($id);

        return Inertia::render('Servers/Edit', [
            'users' => $users,
            'server' => $server,
            'owner' => $users->where('id', $server->owner_id)->first(),
        ]);
    }

    /**
     * Store a new server request.
     */
    public function update(Request $request, int $id): Response
    {
        $validated = $request->validate([
            'name' => ['required', 'max:50'],
            'address' => ['required', 'url'],
            'owner_id' => ['nullable', 'exists:users,id'],
            'public' => ['required'],
        ]);

        $validated['public'] = $validated['public'] === 'on' ? true : false;

        $server = Server::findOrFail($id)->forceFill($validated)->saveOrFail();

        return Inertia::render('Servers/Edit', [
            'server' => $server,
            'alert' => [
                'type' => 'success',
                'message' => 'Server details have been changed.',
            ],
        ]);
    }
}
