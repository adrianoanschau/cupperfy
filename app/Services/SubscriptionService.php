<?php

namespace App\Services;

use App\Repositories\SubscriptionsRepository;
use App\Repositories\TournamentsRepository;
use Illuminate\Support\Collection;

class SubscriptionService extends BaseService
{
    /**
     * @var TournamentsRepository
     */
    private $tournamentsRepository;

    /**
     * SubscriptionService constructor.
     * @param SubscriptionsRepository $repository
     * @param TournamentsRepository $tournamentsRepository
     */
    public function __construct(
        SubscriptionsRepository $repository,
        TournamentsRepository $tournamentsRepository
    )
    {
        parent::__construct($repository);
        $this->tournamentsRepository = $tournamentsRepository;
    }

    public function listByTournament(string $tournament_id)
    {
        /** @var Collection $stages_ids */
        $stages_ids = $this->tournamentsRepository->findByID($tournament_id)
            ->stages->map(function ($item) {
                return $item->id;
            });

        $query = $this->repository->filter('stages', $stages_ids->toArray());
        return $this->list($query);
    }


}
