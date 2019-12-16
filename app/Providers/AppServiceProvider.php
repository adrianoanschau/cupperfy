<?php

namespace App\Providers;

use App\Models\Tournament;
use App\Observers\TournamentObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Tournament::observe(TournamentObserver::class);
    }
}
