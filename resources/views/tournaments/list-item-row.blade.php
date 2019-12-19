<tr>
    <td class="td-actions">
        @component('fragments.data-list.actions', [
            'editAction' => route('tournaments.edit', $item)
        ])
        @endcomponent
    </td>
    <td class="status text-center">
        @switch($item->status)
            @case(\App\Enums\TournamentStatus::CONFIG)
            <i class="fas fa-cog"></i>
            @break
            @case(\App\Enums\TournamentStatus::SUBSCRIPTIONS)
            <i class="fas fa-file-signature text-warning"></i>
            @break
            @case(\App\Enums\TournamentStatus::STARTED)
            <i class="fas fa-play-circle text-success"></i>
            @break
            @case(\App\Enums\TournamentStatus::FINISHED)
            <i class="fas fa-stop text-danger"></i>
            @break
        @endswitch
    </td>
    <td>{{$item->name}}</td>
    <td class="text-right">
        <a href="{{ route('tournaments.config', $item) }}" class="btn btn-outline-secondary btn-sm">
            CONFIG
        </a>
    </td>
</tr>
