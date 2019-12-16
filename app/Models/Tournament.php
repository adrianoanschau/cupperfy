<?php

namespace App\Models;

use App\Enums\TournamentStatus;
use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tournament extends Model
{
    use UsesUuid, SoftDeletes;

    protected $fillable = [
        'name', 'status'
    ];

    /**
     * @return HasMany
     */
    public function stages()
    {
        return $this->hasMany(Stage::class);
    }
}
