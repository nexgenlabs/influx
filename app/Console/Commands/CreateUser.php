<?php

namespace Influx\Console\Commands;

use Influx\Models\User;
use Illuminate\Support\Str;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateUser extends Command
{
    protected $signature = 'user:create';
    protected $description = 'Create a new user and return login details';

    public function handle()
    {
        $isSuperuser = $this->confirm('Should this user be a superuser?');
        $username = $this->ask('What is the username?');
        $email = $this->ask('What is the email?');
        $password = $this->secret('What is the password?');

        $user = User::create([
            'name' => $username,
            'email' => $email,
            'password' => Hash::make($password),
            'is_superuser' => $isSuperuser,
        ]);

        $this->table(['ID', 'Username', 'Email', 'Superuser'], [
            [$user->id, $user->name, $user->email, $user->is_superuser ? 'Yes' : 'No'],
        ]);
    }
}
