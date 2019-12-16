<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Stage extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'order' => (int)$this->order,
            'subscriptions' => Subscription::collection($this->subscriptions),
            'groups' => (int)$this->groups,
            'participants' => (int)$this->participants,
            'turns' => (int)$this->turns,
        ];
    }
}
