<?php

namespace App\Models;

use App\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    use UsesUuid;

    protected $fillable = [
        'stage_id', 'participant_id'
    ];

    /**
     * @return BelongsTo
     */
    public function stage()
    {
        return $this->belongsTo(Stage::class);
    }

    /**
     * @return BelongsTo
     */
    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }
}
