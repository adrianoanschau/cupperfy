<?php

namespace App\Services;

use App\Repositories\StagesRepository;

class StageService extends BaseService
{
    /**
     * TournamentService constructor.
     * @param StagesRepository $repository
     */
    public function __construct(StagesRepository $repository)
    {
        parent::__construct($repository);
    }
}
