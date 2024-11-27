<style>
    label.error {
        color: #dc3545;
        font-size: 14px;
    }
</style>
@vite(['resources/js/changepassword.js'])
<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <a class="navbar-brand ps-3" href="{{ url('dashboard') }}">Billing Software</a>
    <!-- Sidebar Toggle-->
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
            class="fas fa-bars"></i></button>
    <!-- Navbar Search-->
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        {{-- <div class="input-group">
            <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
        </div> --}}
    </form>
    <!-- Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
                data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                {{-- <li><a class="dropdown-item" href="#!">Change Password</a></li> --}}
                <li><a class="dropdown-item" href="#!" data-bs-toggle="modal"
                        data-bs-target="#changePasswordModal">Change Password</a></li>
                <li>
                    <hr class="dropdown-divider" />
                </li>
                <li>
                    <form method="POST" action="{{ route('bsadmin.logout') }}">
                        @csrf

                        <a class="dropdown-item" href="{{ route('bsadmin.logout') }}"
                            onclick="event.preventDefault();
                                this.closest('form').submit();">
                            {{ __('Log Out') }}
                        </a>
                    </form>
                </li>
            </ul>
        </li>
    </ul>
</nav>

<!-- Modal -->
<div class="modal fade " id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="changePasswordModalLabel">Change Password</h5>                
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="changePasswordForm" action="{{ route('changepassword') }}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label for="password">Old Password</label>
                        <input class="form-control" name="password" type="password" placeholder="enter the password" id="password" />
                        
                    </div>
                    <div class="mb-3">
                         <label for="newpassword">New Password</label>
                        <input class="form-control" name="newpassword" type="password" id="newpassword" placeholder="enter the new password" />
                       
                    </div>
                    <div class="mb-3">
                        <label for="confirmpassword">Confirm Password</label>
                        <input class="form-control" name="confirmpassword" type="password" id="confirmpassword" placeholder="enter the confirm password"/>
                        
                    </div>

                    {{-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> --}}
                    <button type="submit" class="btn btn-primary">Save changes</button>
                    {{-- </div> --}}

                </form>
            </div>

        </div>
    </div>
</div>
