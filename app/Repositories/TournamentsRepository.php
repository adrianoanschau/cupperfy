<?php

namespace App\Repositories;

use App\Models\Tournament;
use App\Http\Resources\Tournament as TournamentResource;

class TournamentsRepository extends BaseRepository
{
    protected $modelClass = Tournament::class;
    protected $resourceClass = TournamentResource::class;
}
