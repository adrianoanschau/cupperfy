<div class="row">
    @isset($label)
        <label class="col-sm-2 col-form-label">{{ $label }}</label>
    @endisset
    <div class="col-sm-7">
        <div class="form-group{{ $errors->has($name) ? ' has-danger' : '' }}">
            <input class="form-control{{ $errors->has($name) ? ' is-invalid' : '' }}"
                   name="{{ $name }}" id="input-{{ $name }}"
                   type="{{ isset($type) ? $type : 'text' }}"
                   placeholder="{{ isset($label) ? $label : null }}"
                   value="{{ old($name, isset($default) ? $default : null) }}"
                   {{ isset($required) ? 'required="true"' : null }}
                   {{ isset($required) ? 'aria-required="true"' : null }}>
            @if ($errors->has($name))
                <span id="{{ $name }}-error" class="error text-danger" for="input-{{ $name }}">{{ $errors->first($name) }}</span>
            @endif
        </div>
    </div>
</div>
