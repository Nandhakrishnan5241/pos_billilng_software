<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return redirect('bsadmin/dashboard');
    return view('admin.dashboard');
})->middleware(['auth', 'verified']);

Route::get('bsadmin/dashboard', function () {
    return view('admin.dashboard');
})->middleware(['auth', 'verified'])->name('bsadmin.dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('bsadmin/category')->middleware('auth')->group(function(){
    Route::get('/', [CategoryController::class, 'index'])->middleware('check.permission:categories.view');
    Route::get('/getdetails', [CategoryController::class, 'getDetails'])->name('category.getdetails');
    Route::get('/add', [CategoryController::class, 'add'])->name('category.add');
    Route::get('{id}/edit', [CategoryController::class, 'edit'])->name('category.edit');
    Route::get('/delete/{id}', [CategoryController::class, 'delete'])->name('category.delete');
    Route::post('/save', [CategoryController::class, 'save'])->name('category.save');
    Route::post('/update', [CategoryController::class, 'update'])->name('category.update');
    Route::post('/image', [CategoryController::class, 'imageUpload'])->name('category.image');
});


Route::post('/changepassword', [AuthController::class, 'changePassword'])->middleware('auth')->name('changepassword');

Route::get('test',function(){
    dd('g');
    return view('errors.error_404');
});

require __DIR__.'/auth.php';

// Include module-specific routes
require base_path('app/Modules/Module/routes.php');
