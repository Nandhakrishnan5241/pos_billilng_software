<?php

use App\Modules\Clients\Controllers\ClientController;
use App\Modules\Module\Controllers\ModuleController;
use App\Modules\Permissions\Controllers\PermissionController;
use App\Modules\Previleges\Controllers\PrevilegeController;
use App\Modules\Roles\Controllers\RolesController;
use App\Modules\Users\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::prefix('bsadmin/module')->middleware('auth')->group(function () {
    // Route::get('/', [ModuleController::class, 'index']);
    Route::get('/', [ModuleController::class, 'index'])->middleware('check.permission:modules.view');
    Route::get('/getdetails', [ModuleController::class, 'getDetails'])->name('module.getdetails');
    Route::post('/save', [ModuleController::class, 'save'])->name('module.save');
    Route::post('/update', [ModuleController::class, 'update'])->name('module.update');
    Route::get('{id}/edit', [ModuleController::class, 'edit'])->name('module.edit');
    Route::get('/delete/{id}', [ModuleController::class, 'delete'])->name('module.delete');
    Route::get('/moveup/{moduleId}', [ModuleController::class, 'moveUP'])->name('module.moveup');
    Route::get('/movedown/{moduleId}', [ModuleController::class, 'moveDown'])->name('module.movedown');
});

Route::prefix('bsadmin/permissions')->middleware('auth')->group(function () {
    // Route::get('/', [PermissionController::class, 'index']);
    Route::get('/', [PermissionController::class, 'index'])->middleware('check.permission:permissions.view');
    Route::get('/getdetails', [PermissionController::class, 'getDetails'])->name('permissions.getdetails');
    Route::post('/save', [PermissionController::class, 'save'])->name('permissions.save');
    Route::post('/update', [PermissionController::class, 'update'])->name('permissions.update');
    Route::get('{id}/edit', [PermissionController::class, 'edit'])->name('permissions.edit');
    Route::get('/delete/{id}', [PermissionController::class, 'delete'])->name('permissions.delete');
});

Route::prefix('bsadmin/roles')->middleware('auth')->group(function () {
    // Route::get('/', [RolesController::class, 'index']);
    Route::get('/', [RolesController::class, 'index'])->middleware('check.permission:roles.view');
    Route::get('/getdetails', [RolesController::class, 'getDetails'])->name('roles.getdetails');
    Route::post('/save', [RolesController::class, 'save'])->name('roles.save');
    Route::post('/update', [RolesController::class, 'update'])->name('roles.update');
    Route::get('{id}/edit', [RolesController::class, 'edit'])->name('roles.edit');
    Route::get('/delete/{id}', [RolesController::class, 'delete'])->name('roles.delete');
});

Route::prefix('bsadmin/users')->middleware('auth')->group(function () {
    // Route::get('/', [UserController::class, 'index']);
    Route::get('/', [UserController::class, 'index'])->middleware('check.permission:users.view');
    Route::get('/getdetails', [UserController::class, 'getDetails'])->name('users.getdetails');
    Route::post('/save', [UserController::class, 'save'])->name('users.save');
    Route::post('/update', [UserController::class, 'update'])->name('users.update');
    Route::get('{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::get('/delete/{id}', [UserController::class, 'delete'])->name('users.delete');
    Route::post('/changepassword', [UserController::class, 'changePassword'])->name('users.changepassword');
});

Route::prefix('bsadmin/clients')->middleware('auth')->group(function () {
    // Route::get('/', [UserController::class, 'index']);
    Route::get('/', [ClientController::class, 'index'])->middleware('check.permission:clients.view');
    Route::get('/getdetails', [ClientController::class, 'getDetails'])->name('clients.getdetails');
    Route::post('/save', [ClientController::class, 'save'])->name('clients.save');
    Route::post('/update', [ClientController::class, 'update'])->name('clients.update');
    Route::get('{id}/edit', [ClientController::class, 'edit'])->name('clients.edit');
    Route::get('/delete/{id}', [ClientController::class, 'delete'])->name('clients.delete');
});

Route::prefix('bsadmin/privileges')->middleware('auth')->group(function () {
    // Route::get('/', [PrevilegeController::class, 'index']);
    
    Route::get('/', [PrevilegeController::class, 'index'])->middleware('check.permission:privileges.view');
    Route::get('/addpermission/{roleId}/{clientId}/{data}', [PrevilegeController::class, 'addPermissionToRole']);
    // Route::post('/addpermission', [PrevilegeController::class, 'addPermissionToRole']);
    Route::get('/getprivilegesbyclientid/{clientID}', [PrevilegeController::class, 'getPrivilegesByClientID']);
    Route::get('/getprivilegesbyroleid/{roleID}', [PrevilegeController::class, 'getPrivilegesByRoleID']);
    Route::get('/getprivilegesbyclientandroleid/{roleID}/{clientID}', [PrevilegeController::class, 'getPrivilegesByClientAndRoldID']);
});

Route::fallback(function () {
    return redirect()->route('error.404'); // Redirect to a named route
});

Route::get('/error-404', function () {
    return view('errors.error_404');
})->name('error.404');

