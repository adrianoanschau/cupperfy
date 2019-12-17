<form method="post" action="{{ $route }}" autocomplete="off" class="form-horizontal">
    @csrf
    @method($method)

    @component('templates.card', [
            'title' => $title,
            'category' => $helptext
        ])

        @slot('body')
            @isset($options)
                <div class="row">
                    <div class="col-md-12 text-right">
                        {{ $options }}
                    </div>
                </div>
            @endisset
            {{ $slot }}
        @endslot

        @slot('footer')
            @isset($action)
                <button type="submit" class="btn {{ isset($action['class']) ? $action['class'] : null }}">{{ $action['label'] }}</button>
            @else
                <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>
            @endisset
        @endslot

    @endcomponent

</form>
