<?php

namespace App\Http\Controllers;

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
        $collection = $this->service->list();
        return view('tournaments.index', compact('collection'));
    }

    public function create()
    {
        return view('tournaments.create');
    }

    public function store(TournamentCreate $request)
    {
        $this->service->create($request->all());
        return redirect()->route('tournaments.index')->withStatus(__('Tournament successfully created.'));
    }

    public function edit($id)
    {
        $tournament = $this->service->get($id);
        return view('tournaments.edit', compact('tournament'));
    }

    public function config($id)
    {
        $tournament = $this->service->get($id);
        return view('tournaments.config', compact('tournament'));
    }

    public function update(TournamentUpdate $request, $id)
    {
        $this->service->update($request->all(), $id);
        return redirect()->route('tournaments.index')->withStatus(__('Tournament successfully updated.'));
    }

    public function destroy($id)
    {
        $this->service->delete($id);
        return redirect()->route('tournaments.index')->withStatus(__('Tournament successfully deleted.'));
    }

}
