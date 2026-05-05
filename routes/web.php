<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;


Route::get('/', function () {
    return view('welcome');
});


Route::get('/products', [ProductController::class, 'index']);
Route::post('/products/{id}/restore', [ProductController::class, 'restore']);
Route::post('/products/{id}/force-delete', [ProductController::class, 'forceDelete']);
Route::post('/products/{id}/delete', [ProductController::class, 'destroy']);
Route::get('/products/live-search', [ProductController::class, 'search']);