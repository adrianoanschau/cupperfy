@extends('layouts.app', ['activePage' => 'tournaments-management', 'titlePage' => __('Tournament Management')])

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 tournaments-data-list">
                <tournaments-list></tournaments-list>
            </div>
        </div>
    </div>
@endsection
