<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Participant;
use Faker\Generator as Faker;

$factory->define(Participant::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
