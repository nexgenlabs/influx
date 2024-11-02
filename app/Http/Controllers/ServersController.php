<?php

namespace Influx\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
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
}
