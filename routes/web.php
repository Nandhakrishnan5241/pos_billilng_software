<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('bsadmin/dashboard', function () {
    return view('admin.dashboard');
})->middleware(['auth', 'verified'])->name('bsadmin.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('category')->middleware('auth')->group(function(){
    Route::get('/', [CategoryController::class, 'index']);
    Route::get('/getdetails', [CategoryController::class, 'getDetails'])->name('category.getdetails');
    Route::get('/add', [CategoryController::class, 'add'])->name('category.add');
    Route::get('{id}/edit', [CategoryController::class, 'edit'])->name('category.edit');
    Route::get('/delete/{id}', [CategoryController::class, 'delete'])->name('category.delete');
    Route::post('/save', [CategoryController::class, 'save'])->name('category.save');
    Route::post('/update', [CategoryController::class, 'update'])->name('category.update');
    Route::post('/image', [CategoryController::class, 'imageUpload'])->name('category.image');
});


Route::post('/changepassword', [AuthController::class, 'changePassword'])->middleware('auth')->name('changepassword');

// Route::prefix('module')->middleware('auth')->group(function(){
//     Route::get('/', [ModuleController::class, 'index']);
//     Route::get('/getmodules', [ModuleController::class, 'getModules'])->name('module.getmodules');
//     Route::get('/add', [ModuleController::class, 'add'])->name('module.add');
//     Route::get('{id}/edit', [ModuleController::class, 'edit'])->name('module.edit');
//     Route::get('/delete/{id}', [ModuleController::class, 'delete'])->name('module.delete');
//     Route::post('/save', [ModuleController::class, 'save'])->name('module.save');
//     Route::post('/update', [ModuleController::class, 'update'])->name('module.update');
// });

Route::get('test',function(){
    return view('test');
});

require __DIR__.'/auth.php';

// Include module-specific routes
require base_path('app/Modules/Module/routes.php');
