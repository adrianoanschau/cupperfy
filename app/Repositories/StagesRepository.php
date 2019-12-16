<?php

namespace App\Repositories;

use App\Models\Stage;
use App\Http\Resources\Stage as StageResource;

class StagesRepository extends BaseRepository
{
    protected $modelClass = Stage::class;
    protected $resourceClass = StageResource::class;
}
