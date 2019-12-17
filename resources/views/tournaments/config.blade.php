@extends('layouts.app', ['activePage' => 'tournaments-management', 'titlePage' => __('Tournament Management')])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    @component('templates.card', [
                            'title' => $tournament->name,
                            'category' => __('Set up the tournament')
                        ])

                        <ul class="nav nav-pills nav-justified">
                            <li class="nav-item">
                                <a class="nav-link active" href="#">Dados gerais</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Inscrição</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Participantes</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Calendário</a>
                            </li>
                        </ul>

                        <hr>

                        <div class="text-right">
                            <a href="{{ route('tournaments.index') }}" class="btn btn-sm btn-primary">{{ __('Back to list') }}</a>
                        </div>

                        <div class="card">
                            <div class="card-body d-flex">
                                @php
                                    switch($tournament->status) {
                                        case \App\Enums\TournamentStatus::CONFIG:
                                            $icon = 'cog';
                                            $title = 'Configurando';
                                            $color = '';
                                            break;
                                        case \App\Enums\TournamentStatus::SUBSCRIPTIONS:
                                            $icon = 'file-signature';
                                            $title = 'Inscrições Abertas';
                                            $color = 'text-warning';
                                            break;
                                        case \App\Enums\TournamentStatus::STARTED:
                                            $icon = 'play-circle';
                                            $title = 'Iniciada';
                                            $color = 'text-success';
                                            break;
                                        case \App\Enums\TournamentStatus::FINISHED:
                                            $icon = 'stop';
                                            $title = 'Finalizada';
                                            $color = 'text-danger';
                                            break;
                                    }
                                @endphp
                                <div class="my-auto mr-3">
                                    <i class="fas fa-{{ $icon }} fa-3x {{ $color }}"></i>
                                </div>
                                <div>
                                    <h4 class="card-title">{{ $title }}</h4>
                                    <span>Situação da competição</span>
                                </div>
                            </div>
                        </div>

                    @endcomponent
                </div>
            </div>
        </div>
    </div>
@endsection
