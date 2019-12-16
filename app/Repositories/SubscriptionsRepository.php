<?php

namespace App\Repositories;

use App\Models\Subscription;
use App\Http\Resources\Subscription as SubscriptionResource;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Database\Eloquent\Builder;

class SubscriptionsRepository extends BaseRepository
{
    protected $modelClass = Subscription::class;
    protected $resourceClass = SubscriptionResource::class;

    /**
     * @param string $filter = 'stages'
     * @param array $data = []
     * @return Builder|QueryBuilder|null
     */
    public function filter(string $filter, array $data = [])
    {
        switch($filter) {
            case 'stages':
                return $this->stages($data);
        }
        return null;
    }

    /**
     * @param $ids
     * @return Builder|QueryBuilder
     */
    private function stages(array $ids)
    {
        return $this->newQuery()->whereIn('stage_id', $ids);
    }

}
