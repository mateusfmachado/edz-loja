import React, { Component } from 'react';

import AlertGeral from '../../components/Alert/Geral';
import { validateCPF } from '../../utils/validate';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class SubmitDadosCliente extends Component {
    state = { aviso: null }

    callback = (error) => {
        if(!error){
            this.props.permitir();
            this.setState({ aviso: null })
        } else {
            this.setState({ aviso: { status: false, message: error.message } });
        }
    }

    validate = () => {
        const {  
            email, senha, nome, CPF, dataDeNascimento, telefone,
            local, numero, bairro, cidade, estado, CEP
        } = this.props.form;
        const { usuario } = this.props;

        let temErro = false;

        if(!usuario && !email) temErro = true;
        if(!usuario && !senha) temErro = true;
        if(!nome) temErro = true;
        if(!CPF || CPF.length !== 14) temErro = true;
        if(CPF && CPF.length === 14 && !validateCPF(CPF)) temErro = true;
        if(!dataDeNascimento || dataDeNascimento.length !== 10) temErro = true;
        if(!telefone || telefone.length < 11) temErro = true;

        if(!local) temErro = true;
        if(!numero) temErro = true;
        if(!bairro) temErro = true;
        if(!cidade) temErro = true;
        if(!estado) temErro = true;
        if(!CEP || CEP.length !== 9) temErro = true;

        return !temErro;
    }

    handleSubmit(){
        if(!this.validate()) return null;
        const { token, form, cliente } = this.props;
        if(!token) this.props.newCliente(form, this.callback);
        else this.props.updateCliente(form, cliente._id, token, this.callback);
    }

    render(){
        return(
            <div>
                <AlertGeral aviso={this.state.aviso} />
                <div className="flex flex-right">
                    <button 
                        className="btn btn-success btn-cta" 
                        onClick={() => this.handleSubmit()}>
                        CONTINUAR PEDIDO
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario,
    token: state.auth.token,
    cliente: state.cliente.cliente,
    form: state.checkout.form
});

export default connect(mapStateToProps, actions)(SubmitDadosCliente);