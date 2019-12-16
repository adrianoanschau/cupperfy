<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Tournament;
use Faker\Generator as Faker;

$factory->define(Tournament::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
