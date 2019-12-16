<?php

namespace App\Http\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ParticipantService;
use Illuminate\Http\Request;

class ParticipantsController extends Controller
{
    /** @var ParticipantService */
    private $service;

    /**
     * ParticipantsController constructor.
     * @param ParticipantService $service
     */
    public function __construct(ParticipantService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return $this->service->list();
    }

    public function store(Request $request)
    {
        return $this->service->create($request->all());
    }

}
