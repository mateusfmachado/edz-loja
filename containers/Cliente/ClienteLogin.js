import React, { Component } from 'react';

import FormInput from '../../components/Inputs/FormSimples';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import AlertGeral from '../../components/Alert/Geral';

class ClienteLogin extends Component {
    state = {
        email: "",
        senha: "",
        aviso: null,
        erros: {}
    }

    renderAvisoDeRegistro(){
        return (
            <div className="flex-1">
                <h2>Comprar como Visitante/Realizar Registro</h2>
                <br />
                <button 
                    className="btn btn-success" 
                    onClick={() => this.props.permitir()}>
                    <span>CONTINUAR</span>
                </button>
            </div>
        )
    }

    validate(){
        const { email, senha } = this.state;
        const erros = {};

        if(!email) erros.email = "Preencha aqui com o seu email";
        if(!senha) erros.senha = "Preencha aqui com a sua senha";

        this.setState({ erros, aviso: null });
        return !(Object.keys(erros).length > 0);
    }

    onChange = (field, e) => this.setState({ [field]: e.target.value }, () => this.validate());

    handleSubmit(){
        if(!this.validate()) return null;
        const { email, senha } = this.state;
        this.props.autenticar({ email, password: senha }, false, (error) => {
            if(error) this.setState({ aviso: { status: false, message: error.message } });
        });
    }

    renderFormLogin(){
        const { email, senha, erros } = this.state;
        return (
            <div className="flex-1">
                <h2>Fazer Login</h2>
                <AlertGeral aviso={this.state.aviso} />
                <br />
                <FormInput 
                    value={email} 
                    name={"email"} 
                    label="E-mail" 
                    erro={erros.email}
                    placeholder="E-mail" 
                    onChange={(e) => this.onChange("email", e)} />
                <br />
                <FormInput 
                    value={senha} 
                    name={"senha"} 
                    erro={erros.senha}
                    label="Senha" 
                    type="password"
                    placeholder="Senha" 
                    onChange={(e) => this.onChange("senha", e)} />
                <br />
                <button 
                    className="btn btn-success"
                    onClick={() => this.handleSubmit()} >
                    <span>ENTRAR</span>
                </button>
            </div>
        )
    }

    render(){
        return (
            <div className="Cliente-Login flex horizontal">
                { this.renderAvisoDeRegistro() }
                { this.renderFormLogin() }
            </div>
        )
    }
}

export default connect(null, actions)(ClienteLogin);