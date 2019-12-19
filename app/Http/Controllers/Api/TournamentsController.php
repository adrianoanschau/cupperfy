<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TournamentService;
use App\Http\Requests\TournamentCreate;
use App\Http\Requests\TournamentUpdate;

class TournamentsController extends Controller
{
    /**
     * @var TournamentService
     */
    private $service;

    /**
     * TournamentsController constructor.
     * @param TournamentService $service
     */
    public function __construct(TournamentService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return $this->service->list();
    }

    public function show($id)
    {
        return $this->service->get($id);
    }

    public function store(TournamentCreate $request)
    {
        return $this->service->create($request->all());
    }

    public function update(TournamentUpdate $request, $id)
    {
        return $this->service->update($request->all(), $id);
    }

    public function destroy($id)
    {
        return $this->service->delete($id);
    }

}
