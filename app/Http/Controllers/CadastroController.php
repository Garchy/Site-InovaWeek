<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class CadastroController extends Controller
{
    public function index(){

        // Recuperando Dados do Banco
        $usuarios = Usuario::all()->get();

        return view('cadastro',['usuarios' => $usuarios]);
    }
    public function store(Request $request){

        $usuario = new Usuario;

        $usuario->nome = $request->nome;
        $usuario->sobrenome = $request->sobrenome;
        $usuario->email = $request->email;
        $usuario->senha = $request->senha;
        $usuario->data_nascimento = $request->data_nascimento;
        $usuario->genero = $request->genero;
        $usuario->CPF = $request->CPF;
        $usuario->termo = $request->termo;


        $usuario->save();

        return redirect('/')->with('cadastro_msg','Cadastro realizado com sucesso');
    }
}
