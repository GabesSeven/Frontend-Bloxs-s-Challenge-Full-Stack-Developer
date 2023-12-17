// useState: hook, isto é, função especial que permitem usar o estado e outros recursos do React em componentes funcionais.
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        id_pessoa: '',
        senha: ''
    });
    // "useState": gerencia variáveis de estado, inicialmente é um objeto vazio.
    // "message": estado para mensagem de feedback para o usuário
    const [message, setMessage] = useState('');

    // "handleChange": função invocada sempre que um campo do formulário é alterado.
    // "..." spread operator, cria uma cópia superficial de um objeto existente.
    // "e.target.value": adiciona ou atualiza uma propriedade no novo objeto com nome ("name") e valor ("value") do elemento HTML.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // "handleSubmit": função invocada quando formulário submetido.
    // "e.preventDefault()": impede comportamento padrão de submissão do formulário.
    // "axios": realiza requisição rota de login.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            if (response.status === 200) {
                setMessage('Login bem-sucedido');
                window.location.href = '/user-details'; // Redireciona para a página UserDetails
            }
        } catch (error) {
            setMessage('Credenciais inválidas');
        }
    };

    // "return": renderiza HTML do formulário de login.
    // "formData": garante controle pelo React nos campos de "input".
    // "handleChange": atualizar dinamicamente o estado "formData" conforme digitação do usuário 
    // "onSubmit": submete formulário e invoca função "handleSubmit".
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id_pessoa"
                    placeholder="ID Pessoa"
                    value={formData.id_pessoa}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
