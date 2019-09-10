import React, { Component } from 'react';

import DadosCliente from './DadosCliente';
import DadosEntrega from './DadosEntrega';
import SubmitDadosCliente from './SubmitDadosCliente';
import DadosFrete from './DadosFrete';
import DadosPagamento from './DadosPagamento';
import DadosPedido from './DadosPedido';
import CheckoutButton from './CheckoutButton';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

class CheckoutContainer extends Component {
    state = {
        permissaoInicial: false,
        permissaoCheckout: false
    }

    render(){
        const { permissaoInicial, permissaoCheckout } = this.state;
        const { usuario, freteSelecionado } = this.props;
        return (
            <div className="Checkout container">
                <h2>
                    CONCLUINDO SEU PEDIDO
                </h2>
                <br />
                <DadosCliente 
                    usuario={usuario} 
                    permissaoInicial={permissaoInicial}
                    permitir={() => this.setState({ permissaoInicial: true })} />
                { ( permissaoInicial || usuario ) && <DadosEntrega />}
                { 
                    ( permissaoInicial || usuario ) && 
                    <SubmitDadosCliente permitir={() => this.setState({ permissaoCheckout: true })} />
                }
                { permissaoCheckout && <DadosFrete />}
                { permissaoCheckout && freteSelecionado && <DadosPagamento />}
                { permissaoCheckout && freteSelecionado && <DadosPedido />}
                { permissaoCheckout && freteSelecionado && <CheckoutButton />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario,
    freteSelecionado: state.carrinho.freteSelecionado
})

export default connect(mapStateToProps, actions)(CheckoutContainer);