<div class="sidebar" data-color="orange" data-background-color="white" data-image="{{ asset('material') }}/img/sidebar-1.jpg">
  <!--
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
  -->
  <div class="logo">
    <a href="#"
       class="simple-text logo-normal text-primary font-weight-bold">
        <i class="fas fa-trophy"></i>
      {{ __('cupperfy') }}
    </a>
  </div>
  <div class="sidebar-wrapper">
    <ul class="nav">
      <li class="nav-item{{ $activePage == 'dashboard' ? ' active' : '' }}">
        <a class="nav-link" href="{{ route('home') }}">
          <i class="material-icons">dashboard</i>
            <p>{{ __('Dashboard') }}</p>
        </a>
      </li>
      <li class="nav-item {{ ($activePage == 'profile' || $activePage == 'user-management') ? ' active' : '' }}">
        <a class="nav-link" data-toggle="collapse" href="#securityNav">
          <i class="fas fa-lock text-danger"></i>
          <p>{{ __('Security') }}
            <b class="caret"></b>
          </p>
        </a>
        <div class="collapse{{ ($activePage == 'profile' || $activePage == 'user-management' || $activePage == 'security') ? ' show' : '' }}" id="securityNav">
          <ul class="nav">
            <li class="nav-item{{ $activePage == 'profile' ? ' active' : '' }}">
              <a class="nav-link" href="{{ route('profile.edit') }}">
                <span class="sidebar-mini"> UP </span>
                <span class="sidebar-normal">{{ __('User profile') }} </span>
              </a>
            </li>
              <li class="nav-item{{ $activePage == 'user-management' ? ' active' : '' }}">
                  <a class="nav-link" href="{{ route('user.index') }}">
                      <span class="sidebar-mini"> UM </span>
                      <span class="sidebar-normal"> {{ __('User Management') }} </span>
                  </a>
              </li>
              <li class="nav-item{{ $activePage == 'security' ? ' active' : '' }}">
                  <a class="nav-link" href="{{ route('security') }}">
                      <span class="sidebar-mini"> SE </span>
                      <span class="sidebar-normal"> {{ __('OAuth') }} </span>
                  </a>
              </li>
          </ul>
        </div>
      </li>
      <li class="nav-item{{ $activePage == 'tournaments-management' ? ' active' : '' }}">
        <a class="nav-link" href="{{ route('tournaments.index') }}">
          <i class="fas fa-trophy text-primary"></i>
            <p>{{ __('Tournaments') }}</p>
        </a>
      </li>
      <li class="nav-item{{ $activePage == 'notifications' ? ' active' : '' }}">
        <a class="nav-link" href="{{ route('notifications') }}">
          <i class="material-icons">notifications</i>
          <p>{{ __('Notifications') }}</p>
        </a>
      </li>
    </ul>
  </div>
</div>
