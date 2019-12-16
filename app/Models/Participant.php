<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    use UsesUuid;

    protected $fillable = [
        'name'
    ];
}
