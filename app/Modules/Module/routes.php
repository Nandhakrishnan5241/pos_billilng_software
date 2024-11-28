<?php

use App\Modules\Module\Controllers\ModuleController;
use App\Modules\Permissions\Controllers\PermissionController;
use App\Modules\Previleges\Controllers\PrevilegeController;
use App\Modules\Roles\Controllers\RolesController;
use App\Modules\Users\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::prefix('bsadmin/module')->middleware('auth')->group(function(){
    Route::get('/', [ModuleController::class, 'index']);
    Route::get('/getdetails', [ModuleController::class, 'getDetails'])->name('module.getdetails');
    Route::post('/save', [ModuleController::class, 'save'])->name('module.save');
    Route::post('/update', [ModuleController::class, 'update'])->name('module.update');
    Route::get('{id}/edit', [ModuleController::class, 'edit'])->name('module.edit');
    Route::get('/delete/{id}', [ModuleController::class, 'delete'])->name('module.delete');
    
});

Route::prefix('bsadmin/permissions')->middleware('auth')->group(function(){
    Route::get('/', [PermissionController::class, 'index']);
    Route::get('/getdetails', [PermissionController::class, 'getDetails'])->name('permissions.getdetails');
    Route::post('/save', [PermissionController::class, 'save'])->name('permissions.save');
    Route::post('/update', [PermissionController::class, 'update'])->name('permissions.update');
    Route::get('{id}/edit', [PermissionController::class, 'edit'])->name('permissions.edit');
    Route::get('/delete/{id}', [PermissionController::class, 'delete'])->name('permissions.delete');
   
});

Route::prefix('bsadmin/roles')->middleware('auth')->group(function(){
    Route::get('/', [RolesController::class, 'index']);
    Route::get('/getdetails', [RolesController::class, 'getDetails'])->name('roles.getdetails');
    Route::post('/save', [RolesController::class, 'save'])->name('roles.save');
    Route::post('/update', [RolesController::class, 'update'])->name('roles.update');
    Route::get('{id}/edit', [RolesController::class, 'edit'])->name('roles.edit');
    Route::get('/delete/{id}', [RolesController::class, 'delete'])->name('roles.delete');

    Route::get('{roleId}/addpermission',[RolesController::class,'addPermissionToRole']);
    Route::put('{roleId}/givepermissions',[RolesController::class,'givePermissionToRole']);
   
});

Route::prefix('bsadmin/users')->middleware('auth')->group(function(){
    Route::get('/', [UserController::class, 'index']);
    Route::get('/getdetails', [UserController::class, 'getDetails'])->name('users.getdetails');
    Route::post('/save', [UserController::class, 'save'])->name('users.save');
    Route::post('/update', [UserController::class, 'update'])->name('users.update');
    Route::get('{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::get('/delete/{id}', [UserController::class, 'delete'])->name('users.delete');
   
});

Route::prefix('bsadmin/previleges')->middleware('auth')->group(function(){
    Route::get('/', [PrevilegeController::class, 'index']);
    Route::get('/addpermission/{roleId}/{data}',[PrevilegeController::class,'addPermissionToRole']);
    Route::put('/givepermissions/{roleId{/{data}',[PrevilegeController::class,'givePermissionToRole']);
});

Route::fallback(function () {
    return response()->json(['message' => 'Route not found'], 404);
});