<?php

namespace App\Http\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StageBulk;
use App\Http\Requests\StageCreate;
use App\Http\Requests\StageUpdate;
use App\Services\StageService;
use Illuminate\Http\Request;

class StagesController extends Controller
{
    /**
     * @var StageService
     */
    private $service;

    /**
     * TournamentsController constructor.
     * @param StageService $service
     */
    public function __construct(StageService $service)
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

    public function store(StageCreate $request)
    {
        return $this->service->create($request->all());
    }

    public function update(StageUpdate $request, $id)
    {
        return $this->service->update($request->all(), $id);
    }

    public function destroy($id)
    {
        return $this->service->delete($id);
    }

    public function bulk(StageBulk $request)
    {
        $created = collect();
        $updated = collect();
        $deleted = collect();
        foreach ($request->input('delete', []) as $delete) {
            $delete['tournament_id'] = $request->input('tournament_id');
            if ($d = $this->service->delete($delete['id'])) {
                $deleted->add($d);
            }
        }
        foreach ($request->input('update', []) as $update) {
            $update['tournament_id'] = $request->input('tournament_id');
            if ($u = $this->service->update($update, $update['id'])) {
                $updated->add($u);
            }
        }
        foreach ($request->input('create', []) as $create) {
            $create['tournament_id'] = $request->input('tournament_id');
            if ($c = $this->service->create($create)) {
                $created->add($c);
            }
        }
        return response()->json([
            'created' => $created,
            'updated' => $updated,
            'deleted' => $deleted,
        ]);
    }
}
