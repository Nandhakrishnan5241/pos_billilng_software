<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <div class="sb-sidenav-menu">
        <div class="nav">
            <hr>
            <a class="nav-link" href="{{ url('bsadmin/dashboard') }}">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-house"></i></div>
                Dashboard
            </a>

            {{-- @if (auth()->user()->hasRole('superadmin'))
                <div class="sb-sidenav-menu-heading">Modules</div>
                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseModule"
                    aria-expanded="false" aria-controls="collapseModule">
                    <div class="sb-nav-link-icon"><i class="fa-solid fa-list"></i></div>
                    Modules
                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                </a>
                <div class="collapse" id="collapseModule" aria-labelledby="headingTwo"
                    data-bs-parent="#sidenavAccordion">
                    <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" href="{{ url('bsadmin/module') }}">Manage Modules</a>
                    </nav>
                </div>
            @endif --}}


            @if (auth()->user()->can('modules.view'))
                {{-- <div class="sb-sidenav-menu-heading">Modules</div> --}}
                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseModule"
                    aria-expanded="false" aria-controls="collapseModule">
                    <div class="sb-nav-link-icon"><i class="fa-solid fa-list"></i></div>
                    Administration
                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                </a>
                <div class="collapse" id="collapseModule" aria-labelledby="headingTwo"
                    data-bs-parent="#sidenavAccordion">
                    <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" href="{{ url('bsadmin/module') }}">
                            <div class="sb-nav-link-icon"><i class="fa-solid fa-user-secret"></i></div>Modules
                        </a>
                    </nav>
                    @if (auth()->user()->can('roles.view'))
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="{{ url('bsadmin/roles') }}">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-user-secret"></i></div>
                                Roles
                            </a>
                        </nav>
                    @endif

                    @if (auth()->user()->can('permissions.view'))
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="{{ url('bsadmin/permissions') }}">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-gear"></i></div>
                                Permissions
                            </a>
                        </nav>
                    @endif

                    @if (auth()->user()->can('privileges.view'))
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="{{ url('bsadmin/privileges') }}">
                                <div class="sb-nav-link-icon"><i class="fa-regular fa-circle-user"></i></div>
                                Privileges
                            </a>
                        </nav>
                    @endif
                    
                    @if (auth()->user()->can('users.view'))
                        <nav class="sb-sidenav-menu-nested nav">
                            <a class="nav-link" href="{{ url('bsadmin/users') }}">
                                <div class="sb-nav-link-icon"><i class="fa-solid fa-user"></i></div>
                                Users
                            </a>
                        </nav>
                    @endif

                    @if (auth()->user()->can('clients.view'))
                    <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" href="{{ url('bsadmin/clients') }}">
                            <div class="sb-nav-link-icon"><i class="fa-solid fa-user"></i></div>
                            Clients
                        </a>
                    </nav>
                @endif
                </div>

            @endif

            @if (auth()->user()->can('categories.view'))
                {{-- <div class="sb-sidenav-menu-heading">CATEGORY</div> --}}
                {{-- <a class="nav-link collapsed" href="#" data-bs-toggle="collapse"
                    data-bs-target="#collapseCategory" aria-expanded="false" aria-controls="collapseCategory">
                    <div class="sb-nav-link-icon"><i class="fa-solid fa-cart-shopping"></i></i></div>
                    Categories
                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                </a> --}}
                {{-- <div class="collapse" id="collapseCategory" aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordion"> --}}
                    <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" href="{{ url('bsadmin/category') }}">Manage Category</a>
                    </nav>
                {{-- </div> --}}
            @endif


        </div>
    </div>
    <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        <b class="text-uppercase">{{ auth()->user()->name}}</b>
    </div>
</nav>
