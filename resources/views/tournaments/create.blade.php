@extends('layouts.app', ['activePage' => 'tournaments-management', 'titlePage' => __('Tournament Management')])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    @component('fragments.forms.card', [
                            'route' => route('tournaments.store'),
                            'method' => 'post',
                            'title' => __('Add Tournament')
                        ])

                        @slot('options')
                            <a href="{{ route('tournaments.index') }}" class="btn btn-sm btn-primary">{{ __('Back to list') }}</a>
                        @endslot

                        @component('fragments.forms.field', [
                                'name' => 'name',
                                'label' => __('Name'),
                                'required' => true
                            ])
                        @endcomponent
                    @endcomponent
                </div>
            </div>
        </div>
    </div>
@endsection
