@if(isset($deleteAction))
    <form action="{{ $deleteAction }}" method="post">
        @csrf
        @method('delete')

        @isset($editAction)
            <a rel="tooltip" class="btn btn-success btn-link" href="{{ $editAction }}" data-original-title="" title="">
                <i class="material-icons">edit</i>
                <div class="ripple-container"></div>
            </a>
        @endisset

        <button type="button" class="btn btn-danger btn-link" data-original-title="" title=""
                onclick="confirm('{{ __("Are you sure you want to delete this?") }}') ? this.parentElement.submit() : ''">
            <i class="material-icons">close</i>
            <div class="ripple-container"></div>
        </button>
    </form>
@elseif(isset($editAction))
    <a rel="tooltip" class="btn btn-success btn-link" href="{{ $editAction }}" data-original-title="" title="">
        <i class="material-icons">edit</i>
        <div class="ripple-container"></div>
    </a>
@endif
