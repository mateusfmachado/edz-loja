import React, { Component } from 'react';

import FormSimples from '../../../components/Inputs/FormSimples';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import AlertGeral from '../../../components/Alert/Geral';

class FormularioSenha extends Component {    
    state = {
        senhaAntiga: "",
        novaSenha: "",
        confirmarNovaSenha: "",
        aviso: null,
        erros: {}
    };

    validate(){
        const { senhaAntiga, novaSenha, confirmarNovaSenha } = this.state;
        const erros = {};

        if(!senhaAntiga) erros.senhaAntiga = "Preencha aqui com a sua senha atual";
        if(!novaSenha) erros.novaSenha = "Preencha aqui com a sua nova senha";
        if(!confirmarNovaSenha) 
            erros.confirmarNovaSenha = "Preencha aqui novamente com a sua nova senha";
        if(novaSenha !== confirmarNovaSenha)
            erros.confirmarNovaSenha = "As duas senhas digitadas não se coincidem";

        this.setState({ erros, aviso: null });
        return (Object.keys(erros).length === 0);
    }

    handleSubmit(){
        const { token } = this.props;
        if(!token || !this.validate()) return null;
        this.props.updateSenha(this.state, token, (error) => {
            if(error) this.setState({ aviso: { status: false, message: error.message } });
            else {
                alert("Senha atualizada com sucesso!");
                this.setState({ senhaAntiga: "", novaSenha: "", confirmarNovaSenha: "" });
            }
        });
    }

    onChange = (f, v) => this.setState({ [f]: v }, () => this.validate());

    render(){
        const { senhaAntiga, novaSenha, confirmarNovaSenha, erros } = this.state;
        return (
            <div className="flex-4 conteudo-area-cliente">
                <h2>ALTERAR SENHA</h2>
                <br />
                <br />
                <div className="form-dados">
                    <FormSimples 
                        value={senhaAntiga} 
                        erro={erros.senhaAntiga}
                        onChange={(e) => this.onChange("senhaAntiga", e.target.value)}
                        label="Senha Atual"
                        name="senhaAntiga" 
                        type="password" 
                        placeholder="Senha Atual" />
                    <FormSimples 
                        value={novaSenha} 
                        erro={erros.novaSenha}
                        onChange={(e) => this.onChange("novaSenha", e.target.value)}
                        label="Nova Senha"
                        name="novaSenha" 
                        type="password" 
                        placeholder="Nova Senha" />
                    <FormSimples 
                        value={confirmarNovaSenha} 
                        erro={erros.confirmarNovaSenha}
                        onChange={(e) => this.onChange("confirmarNovaSenha", e.target.value)}
                        label="Confirmar Nova Senha"
                        name="confirmarNovaSenha" 
                        type="password" 
                        placeholder="Confirmar Nova Senha" />                    
                </div>
                <br />
                <AlertGeral aviso={this.state.aviso} />
                <div className="flex flex-start">
                    <button 
                        className="btn btn-primary"
                        onClick={() => this.handleSubmit()} >
                        SALVAR
                    </button>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario,
    token: state.auth.token,
    cliente: state.cliente.cliente
});

export default connect(mapStateToProps, actions)(FormularioSenha);