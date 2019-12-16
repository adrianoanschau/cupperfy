<?php

namespace App\Services;

use App\Repositories\TournamentsRepository;

class TournamentService extends BaseService
{
    /**
     * TournamentService constructor.
     * @param TournamentsRepository $repository
     */
    public function __construct(TournamentsRepository $repository)
    {
        parent::__construct($repository);
    }

}
