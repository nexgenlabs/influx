<?php

namespace Influx\Models;

use Illuminate\Database\Eloquent\Model;

class Server extends Model
{
    /**
     * Fields that are not mass assignable.
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * Fields that can be mass assigned.
     */
    protected $fillable = ['owner_id', 'public', 'name', 'address'];

    /**
     * Rules to validate when modifying data.
     */
    public static array $validationRules = [
        'owner_id' => 'required|int',
        'public' => 'nullable|bool',
        'name' => 'required|string|min:3|max:30',
        'address' => 'required|string', // /[A-Za-z]+://[A-Za-z0-9]+\\.[A-Za-z][A-Za-z][A-Za-z]:[0-9]+/i
    ];
}
