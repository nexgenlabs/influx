<?php

namespace Influx\Console\Commands\User;

use Influx\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class UserUpdate extends Command
{
    protected $signature = 'user:update';
    protected $description = 'Update an existing user';

    public function handle()
    {
        $identifier = $this->ask('Enter user ID, email or username to update:');

        $user = User::where('id', $identifier)
            ->orWhere('email', $identifier)
            ->orWhere('usernme', $identifier)
            ->first();

        if (!$user) {
            $this->error('Unable to find a match for the given identifier.');
            return;
        }

        $username = $this->ask('What is the new username?', $user->name);
        $email = $this->ask('What is the new email?', $user->email);
        $password = $this->secret('What is the new password? (leave blank to keep current)');

        $user->name = $username;
        $user->email = $email;

        if ($password) {
            $user->password = Hash::make($password);
        }

        $user->save();

        $this->table(['ID', 'Username', 'Email'], [
            [$user->id, $user->name, $user->email],
        ]);
    }
}