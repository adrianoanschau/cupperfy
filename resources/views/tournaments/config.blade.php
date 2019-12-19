@extends('layouts.app', ['activePage' => 'tournaments-management', 'titlePage' => __('Tournament Management')])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">

                    <tournament-config :id="'{!! $tournament !!}'"></tournament-config>

                </div>
            </div>
        </div>
    </div>
@endsection
