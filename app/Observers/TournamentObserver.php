<?php

namespace App\Observers;

use App\Enums\TournamentStatus;
use App\Models\Tournament;

class TournamentObserver
{
    /**
     * Handle the models tournament "deleted" event.
     *
     * @param  Tournament $model
     * @return void
     */
    public function deleted(Tournament $model)
    {
        if ($model->status === TournamentStatus::CONFIG) {
            $model->forceDelete();
        }
    }
}
