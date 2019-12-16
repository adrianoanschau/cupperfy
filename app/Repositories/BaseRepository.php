<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder as EloquentQueryBuilder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder as QueryBuilder;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

abstract class BaseRepository
{
    /**
     * Model class for repo.
     *
     * @var Model
     */
    protected $modelClass;

    /**
     * JsonResource class
     *
     * @var JsonResource
     */
    protected $resourceClass;

    /**
     * @return EloquentQueryBuilder|QueryBuilder
     */
    protected function newQuery()
    {
        return app($this->modelClass)->newQuery();
    }

    /**
     * @param EloquentQueryBuilder|QueryBuilder $query
     * @param int                               $take
     * @param bool                              $paginate
     *
     * @return LengthAwarePaginator
     */
    public function getAll($query = null, $take = 10, $paginate = true)
    {
        if (is_null($query)) {
            $query = $this->newQuery();
        }

        if ($orderBy = $this->parseOrderBy(request()->orderBy)) {
            $orderBy->each(function ($column) use ($query) {
                $query->orderByRaw("{$column[0]} COLLATE NOCASE {$column[1]}");
            });
        }

        if (true == $paginate) {
            return $query->paginate($take);
        }

        if ($take > 0 || false !== $take) {
            $query->take($take);
        }

        return $query->get();
    }

    /**
     * @param string|string[] $orderBy
     * @return Collection
     */
    private function parseOrderBy($orderBy)
    {
        if (is_string($orderBy)) {
            $orderBy = [$orderBy];
        }

        return collect($orderBy)->map(function($value) {
            $value = explode(',', $value);
            if (!isset($value[1]) || is_null($value[1])
                || (strtoupper($value[1]) !== 'ASC' && strtoupper($value[1]) !== 'DESC')) {
                $value[1] = 'ASC';
            }
            return $value;
        });
    }

    public function getResourceClass()
    {
        return $this->resourceClass;
    }

    /**
     * Retrieves a record by his id
     * If fail is true $ fires ModelNotFoundException.
     *
     * @param int  $id
     * @param bool $fail
     *
     * @return Model
     */
    public function findByID($id, $fail = true)
    {
        if ($fail) {
            return $this->newQuery()->findOrFail($id);
        }

        return $this->newQuery()->find($id);
    }

    public function create(array $data)
    {
        try {
            if ($created = $this->newQuery()->create($data)) {
                return $this->newQuery()->find($created->id);
            }
        } catch (\Exception $e) {
        }
        return false;
    }

    public function update(string $id, array $data)
    {
        try {
            if ($tournament = $this->newQuery()->find($id)) {
                collect($data)->each(function ($value, $field) use (&$tournament) {
                    if ($tournament[$field]) {
                        $tournament[$field] = $value;
                    }
                });
                if ($forUpdate = $tournament->getDirty()) {
                    $tournament->update($forUpdate);
                    return $tournament;
                }
            }
        } catch (\Exception $e) {
            // TODO: Log
        }
        return false;
    }

    public function delete(string $id)
    {
        try {
            if ($tournament = $this->newQuery()->find($id)) {
                $tournament->delete();
                return $tournament;
            }
        } catch (\Exception $e) {
            // TODO: Log
        }
        return false;
    }
}
