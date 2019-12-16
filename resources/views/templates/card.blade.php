<div class="card">
    @isset($header)
        <div class="card-header card-header-primary">
            {{ $header }}
        </div>
    @endisset
    @isset($body)
        <div class="card-body">
            {{ $body }}
        </div>
    @endisset
    @isset($footer)
        <div class="card-footer ml-auto mr-auto">
            {{ $footer }}
        </div>
    @endisset
</div>
