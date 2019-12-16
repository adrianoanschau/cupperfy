@extends('layouts.app', ['activePage' => 'security', 'titlePage' => __('Security Management')])

@section('content')
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">

                    <passport-clients></passport-clients>

                    <passport-authorized-clients></passport-authorized-clients>

                    <passport-personal-access-tokens></passport-personal-access-tokens>

                </div>
            </div>
        </div>
    </div>
@endsection
