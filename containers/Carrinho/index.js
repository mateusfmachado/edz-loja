import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

import ListaDeProdutos from './ListaDeProdutos';
import DadosDoCarrinho from './DadosDoCarrinho';

class CarrinhoContainer extends Component {

    componentDidMount(){
        this.props.setCarrinho();
    }

    componentDidUpdate(prevProps){
        const { carrinho } = this.props;
        if( carrinho && carrinho[0] && 
            carrinho[0].produto && !carrinho[0].produto._id ){
            carrinho.forEach((item, idx) => {
                this.props.fetchProdutoCarrinho(item.produto, idx);
                this.props.fetchVariacoesCarrinho(item.variacao, item.produto, idx);
            });
        }
    }

    render(){
        return (
            <div className="container Carrinho">
                <h2>Detalhes do Pedido</h2>
                <br />
                <ListaDeProdutos />
                <DadosDoCarrinho />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    carrinho: state.carrinho.carrinho
});

export default connect(mapStateToProps, actions)(CarrinhoContainer);