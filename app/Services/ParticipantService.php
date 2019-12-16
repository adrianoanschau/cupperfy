<?php

namespace App\Services;

use App\Repositories\ParticipantsRepository;

class ParticipantService extends BaseService
{
    /**
     * ParticipantService constructor.
     * @param ParticipantsRepository $repository
     */
    public function __construct(ParticipantsRepository $repository)
    {
        parent::__construct($repository);
    }
}
