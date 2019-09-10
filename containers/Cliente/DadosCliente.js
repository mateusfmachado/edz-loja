import React, { Component } from 'react';
import FormSimples from '../../components/Inputs/FormSimples';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import moment from 'moment';

import { validateCPF } from '../../utils/validate';
import { formatDataDeNascimento, formatTelefone, formatCPF } from '../../utils/format';

class DadosClienteContainer extends Component {

    state = {
        erros: {}
    }

    componentDidMount(){
        this.props.setForm({
            email: "",
            senha: "",
            nome: this.props.cliente ? this.props.cliente.nome : "",
            CPF: this.props.cliente ? this.props.cliente.cpf : "",
            telefone: this.props.cliente && this.props.cliente.telefones ? 
                this.props.cliente.telefones[0] : "",
            dataDeNascimento: this.props.cliente ? 
                moment(this.props.cliente.dataDeNascimento).format("DD/MM/YYYY") : ""
        });
    }

    componentDidUpdate(prevProps){
        if(!prevProps.cliente && this.props.cliente){
            const { nome, cpf, telefones, dataDeNascimento } = this.props.cliente;
            this.props.setForm({
                nome, CPF: cpf, telefone: telefones[0], 
                dataDeNascimento: moment(dataDeNascimento).format("DD/MM/YYYY")
            });
        }
    }

    validate(){
        const { email, senha, nome, CPF, dataDeNascimento, telefone } = this.props.form;
        const { usuario } = this.props;
        const erros = {};

        if(!usuario && !email) erros.email = "Preencha aqui com o seu email";
        if(!usuario && !senha) erros.senha = "Preencha aqui com a sua senha";

        if(!nome) erros.nome = "Preencha aqui com o seu nome";
        if(!CPF || CPF.length !== 14) erros.CPF = "Preencha aqui com o seu CPF";
        if(CPF && CPF.length === 14 && !validateCPF(CPF)) 
            erros.CPF = "Preencha aqui com o seu CPF corretamente";
        if(!dataDeNascimento || dataDeNascimento.length !== 10)
            erros.dataDeNascimento = "Preencha aqui com a sua data de nascimento";
        if(!telefone || telefone.length < 11)
            erros.telefone = "Preencha aqui com o seu telefone";

        this.setState({ erros });
        return !(Object.keys(erros).length > 0);
    }

    onChange = (field, e, value) => {
        this.props.setForm({ [field]: value || e.target.value }, null)
        .then(() => this.validate());
    }

    renderDadosRegistro(){
        const { email, senha } = this.props.form;
        const { erros } = this.state;
        return (
            <div className="flex-1 flex horizontal">
                <div className="flex-1">
                    <FormSimples 
                        value={email || ""} 
                        name="email" 
                        placeholder="E-mail" 
                        label="E-mail" 
                        erro={erros.email}
                        onChange={(e) => this.onChange("email", e)} />
                </div>
                <div className="flex-1">
                    <FormSimples 
                        value={senha || ""} 
                        name="senha" 
                        placeholder="Senha" 
                        label="Senha" 
                        type="password"
                        erro={erros.senha}
                        onChange={(e) => this.onChange("senha", e)} />
                </div>                
            </div>
        )
    }

    renderDadosUsuario(){
        const { nome, CPF, dataDeNascimento, telefone } = this.props.form;
        const { erros } = this.state;
        return (
            <div className="flex-1 flex vertical">
                <div className="flex-1">
                    <FormSimples 
                        value={nome || ""} 
                        name="nome" 
                        placeholder="Nome" 
                        label="Nome" 
                        erro={erros.nome}
                        onChange={(e) => this.onChange("nome", e)} />
                </div>
                <div className="flex-1">
                    <FormSimples 
                        value={CPF || ""} 
                        name="CPF" 
                        placeholder="CPF" 
                        label="CPF"
                        erro={erros.CPF} 
                        onChange={(e) => this.onChange("CPF", e, formatCPF(e.target.value))} />
                </div>    
                <div className="flex-1 flex horizontal">
                    <div className="flex-1">
                        <FormSimples 
                            value={dataDeNascimento || ""} 
                            erro={erros.dataDeNascimento}
                            name="dataDeNascimento" 
                            placeholder="DD/MM/AAAA" 
                            label="Data de Nascimento" 
                            onChange={(e) => this.onChange("dataDeNascimento", e, formatDataDeNascimento(e.target.value))} />
                    </div>
                    <div className="flex-1">
                        <FormSimples 
                            value={telefone || ""}
                            erro={erros.telefone}
                            name="telefone" 
                            placeholder="(34) 1234-5678" 
                            label="Telefone/Celular" 
                            onChange={(e) => this.onChange("telefone", e, formatTelefone(e.target.value))} />
                    </div>   
                </div>            
            </div>
        )
    }

    render(){
        return(
            <div className="flex-1">
                <div>
                    <h2>DADOS DO CLIENTE</h2>
                </div>
                { !this.props.usuario && this.renderDadosRegistro() }
                { this.renderDadosUsuario() }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario,
    token: state.auth.token,
    cliente: state.cliente.cliente,
    form: state.checkout.form
});

export default connect(mapStateToProps, actions)(DadosClienteContainer);