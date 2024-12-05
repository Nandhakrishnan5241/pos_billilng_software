<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;

// use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        parent::boot();
        View::addNamespace('module', base_path('app/Modules/Module/views'));
        View::addNamespace('permissions', base_path('app/modules/permissions/views'));
        View::addNamespace('roles', base_path('app/modules/roles/views'));
        View::addNamespace('users', base_path('app/modules/users/views'));
        View::addNamespace('clients', base_path('app/modules/clients/views'));
        View::addNamespace('previleges', base_path('app/modules/previleges/views'));

     
        $this->loadModuleRoutes();
    }

    protected function loadModuleRoutes(): void
    {
        // $modulePath = base_path('modules/module');
        $moduleRoutes = base_path('app/modules/module/routes.php');

        // if (is_dir($modulePath)) {
        //     foreach (scandir($modulePath) as $file) {
        //         if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
        //             Route::middleware('web') // Use 'api' middleware if needed
        //                 ->group($modulePath . '/' . $file);
        //         }
        //     }
        // }
        if (file_exists($moduleRoutes)) {
            Route::middleware('web') // Adjust to 'api' if it's an API route
            ->group(function () use ($moduleRoutes) {
                require $moduleRoutes;
            });
        }
    }
}
