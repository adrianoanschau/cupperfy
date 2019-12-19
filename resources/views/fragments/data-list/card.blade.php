@component('templates.card', [
    'title' => $title,
    'category' => $helptext
])

    @slot('body')
        <div class="row">
            <div class="col-12 text-right">
                {{ $options }}
            </div>
        </div>
        <div class="table-responsive management-table-list">
            @if(isset($collection) && isset($itemRowComponent))
                <table class="table">
                    @if(!$collection->isEmpty() && isset($headComponent))
                        <thead class="text-primary">
                            @component($headComponent)
                            @endcomponent
                        </thead>
                    @endif
                    <tbody>
                    @forelse($collection as $item)
                        @component($itemRowComponent, [ 'item' => $item ])
                        @endcomponent
                    @empty
                        <tr>
                            <td class="text-center">{{ isset($ifEmpty) ? $ifEmpty : null }}</td>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
                {!! $collection->render() !!}
            @endif
        </div>
    @endslot
@endcomponent
