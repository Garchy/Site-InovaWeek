<?php

use App\Http\Controllers\CadastroController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;


//Route::get('/login', [LoginController::class, 'index']);

Route::get('/cadastro', [CadastroController::class, 'index']);

Route::post('/views',[CadastroController::class, 'store']);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/', function () {
        return view('dashboard');
    })->name('dashboard');
});
