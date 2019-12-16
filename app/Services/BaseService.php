<?php

namespace App\Services;

use App\Repositories\BaseRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;

class BaseService
{
    /**
     * @var BaseRepository
     */
    protected $repository;

    /**
     * @var JsonResource
     */
    private $resourceClass;

    /**
     * BaseService constructor.
     * @param BaseRepository $repository
     * @param string $resourceClass
     */
    public function __construct(
        BaseRepository $repository
    )
    {
        $this->repository = $repository;
        $this->resourceClass = $this->repository->getResourceClass();
    }

    protected function resource(Model $resource)
    {
        return new $this->resourceClass($resource);
    }

    protected function collection(LengthAwarePaginator $data)
    {
        return $this->resourceClass::collection($data);
    }

    public function list($query = null)
    {
        return $this->collection($this->repository->getAll($query));
    }

    public function get($id)
    {
        return $this->resource($this->repository->findByID($id));
    }

    public function create(array $data)
    {
        if ($resource = $this->repository->create($data)) {
            return $this->resource($resource);
        }
        return false;
    }

    public function update(array $data, $id)
    {
        if ($resource = $this->repository->update($id, $data)) {
            return $this->resource($resource);
        }
        return false;
    }

    public function delete($id)
    {
        if ($resource = $this->repository->delete($id)) {
            return $this->resource($resource);
        }
        return false;
    }

}
