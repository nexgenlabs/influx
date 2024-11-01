<?php

namespace Influx\Console\Commands\User;

use Influx\Models\User;
use Illuminate\Console\Command;

class UserDelete extends Command
{
    protected $signature = 'user:delete';
    protected $description = 'Delete an existing user';

    public function handle()
    {
        $identifier = $this->ask('Enter user ID, email or username to delete:');

        $user = User::where('id', $identifier)
            ->orWhere('email', $identifier)
            ->orWhere('usernme', $identifier)
            ->first();

        if (!$user) {
            $this->error('Unable to find a match for the given identifier.');
            return;
        }

        if ($this->confirm('Are you sure you want to delete this user?')) {
            $user->delete();
            $this->info('User has been removed from the system.');
        } else {
            $this->info('Operation cancelled.');
        }
    }
}