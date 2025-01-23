<nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
    <div class="sb-sidenav-menu">
        <div class="nav">
            <hr>
            @php
                $user = Auth::user();
                $client = \App\Modules\Clients\Models\Client::with('modules')->find($user->client_id);
                $modules = $client ? $client->modules : collect();
                
                $modules = json_decode(json_encode($modules), true);
                $modulesList = [];
                foreach ($modules as $module) {
                    array_push($modulesList, $module['slug']);
                }
            @endphp
            <a class="nav-link" href="{{ url('bsadmin/dashboard') }}">
                <div class="sb-nav-link-icon"><i class="fa-solid fa-house"></i></div>
                Dashboard
            </a>

            @foreach ($modules as $module)
               
                 @if ((auth()->user()->can($module['slug'].'.view')   || auth()->user()->hasRole('superadmin')))
                    <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" href="{{ url('bsadmin/'. $module['url']) }}"><div class="sb-nav-link-icon"><i class="{{$module['icon']}}"></i></div>{{$module['name']}}</a>
                    </nav>
                @endif
                {{-- @if ((auth()->user()->can($module['slug'].'.view')   || auth()->user()->hasRole('superadmin')))
                    <nav class="sb-sidenav-menu-nested nav">
                        <a class="nav-link" href="{{ url('bsadmin/'. $module['url']) }}"><div class="sb-nav-link-icon"><img style="width: 23px"
                            src="{{ asset('images/default/' . $module['icon']) }}"
                            onerror="this.onerror=null; this.src='{{ asset('images/default/notfound.svg') }}';"
                            alt="{{ $module['name'] }}"></div>{{$module['name']}}</a>
                    </nav>
                @endif --}}
            @endforeach



        </div>
    </div>
    <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        <b class="text-uppercase">{{ auth()->user()->name }}</b>
    </div>
</nav>
