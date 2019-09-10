import React, {Component} from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class SucessoContainer extends Component {

    renderBoleto(){
        const { pagamento } = this.props;
        return (
            <div>
                <p>Para finalizar o pedido, realize o pagamento do boleto pelo link abaixo:</p>
                <br />
                <a 
                    className="btn btn-success" 
                    href={pagamento.payload[0].paymentLink}
                    target="_blank"
                    rel="noopener noreferrer" >
                    IMPRIMIR BOLETO
                </a>
                <br />
            </div>
        )
    }

    renderCartao(){
        return (
            <div>
                <p>O pagamento está sendo processado e você receberá uma confirmação pelo email em breve. Obrigado pelo pedido.</p>
                <br />
            </div>
        )
    }

    renderSucesso(){
        const { pagamento } = this.props;
        return (
            <div className="Sucesso">
                <br />
                <h1 className="headline-big">PEDIDO CONCLUÍDO COM SUCESSO</h1>
                <br /><br />
                { pagamento.forma === "boleto" ? this.renderBoleto() : this.renderCartao() }
                <br />
            </div>
        )
    }

    renderErro(){
        return (
            <div className="Erro">
                <br />
                <h1 className="headline-big">HOUVE UM ERRO COM O SEU PEDIDO</h1>
                <br /><br />
                <p>
                    Houve um erro com o seu pedido e ele foi cancelado, 
                    por favor refaça seu pedido na loja ou entre em contato para continuar o pedido.
                </p>
                <br />
            </div>
        )
    }

    render(){
        const { pagamento } = this.props;
        return (
            <div className="Sucesso-Container container">
                { 
                    !pagamento.payload[0].error ? 
                    this.renderSucesso() : 
                    this.renderErro() 
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pedido: state.checkout.novoPedido,
    pagamento: state.checkout.novoPagamento
});

export default connect(mapStateToProps, actions)(SucessoContainer);