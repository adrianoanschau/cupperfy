<div class="card">
    @if(isset($title))
        <div class="card-header card-header-primary">
            <h4 class="card-title">{{ $title }}</h4>
            @isset($category)
                <p class="card-category">{{ $category }}</p>
            @endisset
        </div>
    @endif
    @if(isset($body) || isset($slot))
        <div class="card-body">
            {{ isset($body) ? $body : null }}
            {{ $slot }}
        </div>
    @endisset
    @isset($footer)
        <div class="card-footer ml-auto mr-auto">
            {{ $footer }}
        </div>
    @endisset
</div>
