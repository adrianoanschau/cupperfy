<?php

namespace App\Http\Api\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubscriptionCreate;
use App\Http\Requests\SubscriptionList;
use App\Http\Requests\SubscriptionUpdate;
use App\Services\SubscriptionService;

class SubscriptionsController extends Controller
{
    /** @var SubscriptionService */
    private $service;

    /**
     * SubscriptionsController constructor.
     * @param SubscriptionService $service
     */
    public function __construct(SubscriptionService $service)
    {
        $this->service = $service;
    }

    public function index(SubscriptionList $request)
    {
        return $this->service->listByTournament($request->input('tournament_id'));
    }

    public function store(SubscriptionCreate $request)
    {
        return $this->service->create($request->all());
    }

    public function update(SubscriptionUpdate $request, $id)
    {
        return $this->service->update($request->all(), $id);
    }

    public function destroy($id)
    {
        return $this->service->delete($id);
    }

}
