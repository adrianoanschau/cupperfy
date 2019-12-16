<?php

namespace App\Repositories;

use App\Models\Participant;
use App\Http\Resources\Participant as ParticipantResource;

class ParticipantsRepository extends BaseRepository
{
    protected $modelClass = Participant::class;
    protected $resourceClass = ParticipantResource::class;
}
