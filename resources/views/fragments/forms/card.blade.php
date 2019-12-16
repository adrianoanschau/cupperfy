<form method="post" action="{{ $action }}" autocomplete="off" class="form-horizontal">
    @csrf
    @method($method)

    @component('templates.card')
        @slot('header')
            <h4 class="card-title">{{ $title }}</h4>
            <p class="card-category"></p>
        @endslot

        @slot('body')
            <div class="row">
                <div class="col-md-12 text-right">
                    {{ $options }}
                </div>
            </div>
            {{ $slot }}
        @endslot

        @slot('footer')
            <button type="submit" class="btn btn-primary">{{ __('Save') }}</button>
        @endslot
    @endcomponent

</form>
