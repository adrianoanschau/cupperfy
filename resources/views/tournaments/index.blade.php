@extends('layouts.app', ['activePage' => 'tournaments-management', 'titlePage' => __('Tournament Management')])

@push('css')
    <link rel="stylesheet" href="{{ asset('css/tournaments.css') }}">
@endpush

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 tournaments-data-list">

                @component('fragments.data-list.card', [
                        'title' => __('Tournaments'),
                        'helptext' => __('Here you can manage tournaments'),
                        'collection' => $collection->resource,
                        'ifEmpty' => __('No have tournaments'),
                        'headComponent' => 'tournaments.list-head',
                        'itemRowComponent' => 'tournaments.list-item-row',
                    ])
                    @slot('options')
                        <a href="{{ route('tournaments.create') }}" class="btn btn-sm btn-primary">{{ __('Add tournament') }}</a>
                    @endslot
                @endcomponent

            </div>
        </div>
    </div>
@endsection
