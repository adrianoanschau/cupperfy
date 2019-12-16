@component('templates.card')
    @slot('header')
        <h4 class="card-title ">{{ $title }}</h4>
        @isset($helptext)
            <p class="card-category">{{ $helptext }}</p>
        @endisset
    @endslot

    @slot('body')
        <div class="row">
            <div class="col-12 text-right">
                {{ $options }}
            </div>
        </div>
        <div class="table-responsive management-table-list">
            @if(isset($collection))
                <table class="table">
                    @if(!$collection->isEmpty())
                        <thead class="text-primary">
                        <tr>
                            @foreach(explode('|', $columns) as $column)
                                <th>{{ $column }}</th>
                            @endforeach
                        </tr>
                        </thead>
                    @endif
                    <tbody>
                    @forelse($collection as $item)
                        <tr>
                            @component($itemComponent, [ 'item' => $item ])
                            @endcomponent
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3" class="text-center">{{ isset($ifEmpty) ? $ifEmpty : null }}</td>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
                {!! $collection->render() !!}
            @endif
        </div>
    @endslot
@endcomponent
