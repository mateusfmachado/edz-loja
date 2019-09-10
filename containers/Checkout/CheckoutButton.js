import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { getCart } from '../../utils/cart';
import { validateCPF } from '../../utils/validate';
import AlertGeral from '../../components/Alert/Geral';

class CheckoutButton extends Component {
    state = { 
        disabled: false, 
        aviso: null 
    }

    toggleDisabled = () => this.setState({ disabled: !this.state.disabled });

    calcularValorTotal(carrinho, freteSelecionado){
        const valorProdutos = carrinho.reduce(
                            (all, item) => 
                            all + (Number(item.precoUnitario) * Number(item.quantidade)) , 0
                        );
        const valorFrete = Number(freteSelecionado.Valor.replace(',','.'));
        return valorProdutos + valorFrete;
    }

    validarFormulario(){
        const {  
            nome, CPF, dataDeNascimento, telefone,
            local, numero, bairro, cidade, estado, CEP,
            dadosCobranca, dadosEntregaIgualDadosCobranca,
            CPFboleto,
            numeroCartao, nomeCartao, mesCartao, anoCartao, parcelasCartaoSelecionada, CVVCartao,
            credit_card_token
        } = this.props.form;
        const { tipoPagamentoSelecionado } = this.props;

        let temErro = false;

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

        if(!dadosEntregaIgualDadosCobranca){
            if(!dadosCobranca.local) temErro = true;
            if(!dadosCobranca.numero) temErro = true;
            if(!dadosCobranca.bairro) temErro = true;
            if(!dadosCobranca.cidade) temErro = true;
            if(!dadosCobranca.estado) temErro = true;
            if(!dadosCobranca.CEP || dadosCobranca.CEP.length !== 9) temErro = true;
        }

        if(tipoPagamentoSelecionado === "boleto"){
            if(!CPFboleto && !CPF) temErro = true;
            if(CPFboleto && CPFboleto.length !== 14 && !validateCPF(CPFboleto)) temErro = true;
        } else {
            if(!numeroCartao || numeroCartao.length !== 19) temErro = true;
            if(!nomeCartao) temErro = true;
            if(!mesCartao || mesCartao.length !== 2) temErro = true;
            if(!anoCartao || anoCartao.length !== 4) temErro = true;
            if(!parcelasCartaoSelecionada) temErro = true;
            if(!credit_card_token) temErro = true;
            if(!CVVCartao || CVVCartao.length !== 3) temErro = true;
        }

        return !temErro;
    }

    validate(){
        const { freteSelecionado, tipoPagamentoSelecionado } = this.props;
        const validarFormulario = this.validarFormulario();
        return validarFormulario && freteSelecionado && tipoPagamentoSelecionado;
    }

    handleSubmit(){
        const {
            form, freteSelecionado, token, senderHash, tipoPagamentoSelecionado
        } = this.props;
        const carrinho = getCart();
        const valorTotal = this.calcularValorTotal(carrinho, freteSelecionado);

        if(!this.validate()) return null;
        this.toggleDisabled();
        this.props.novoPedido(
            form, freteSelecionado, tipoPagamentoSelecionado, 
            valorTotal, token, senderHash, carrinho, (error) => {
                console.log('pedido finalizado');
                if(error){
                    this.setState({ aviso: { status:false, message: error.message } })
                }
                this.toggleDisabled();
            }
        )
    }

    render(){
        return (
            <div className="flex flex-right">
                <AlertGeral aviso={this.state.aviso} />
                <button 
                    className="btn btn-cta btn-success"
                    disabled={this.state.disabled}
                    onClick={() => this.handleSubmit()} >
                    <span>{ 
                        this.state.disabled ? 
                        "ENVIANDO..." : 
                        "CONCLUIR PEDIDO"
                    }</span>
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    carrinho: state.carrinho.carrinho,
    usuario: state.auth.usuario,
    cliente: state.cliente.cliente,
    freteSelecionado: state.carrinho.freteSelecionado,
    form: state.checkout.form,
    token: state.auth.token,
    senderHash: state.checkout.senderHash,
    tipoPagamentoSelecionado: state.checkout.tipoPagamentoSelecionado
});

export default connect(mapStateToProps, actions)(CheckoutButton);