<?php

Auth::routes();

Route::get('/', function () {
    return redirect('/home');
});

Route::group(['middleware' => 'auth'], function () {

    Route::get('/home', 'HomeController@index')->name('home');

	Route::get('notifications', function () {
		return view('pages.notifications');
	})->name('notifications');

    Route::resource('tournaments', 'TournamentsController')
        ->except(['show']);

    Route::resource('user', 'UserController', ['except' => ['show']]);
    Route::get('profile', ['as' => 'profile.edit', 'uses' => 'ProfileController@edit']);
    Route::put('profile', ['as' => 'profile.update', 'uses' => 'ProfileController@update']);
    Route::put('profile/password', ['as' => 'profile.password', 'uses' => 'ProfileController@password']);

    Route::get('security', function () {
        return view('pages.security');
    })->name('security');
});

