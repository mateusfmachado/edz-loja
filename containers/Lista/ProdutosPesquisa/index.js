import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';

import Produtos from '../../../components/Listas/Produtos';
import Paginacao from '../../../components/Paginacao';

class ProdutosPesquisa extends Component {
    state = { 
        atual: 0,
        limit: 20
    }

    getProdutos(){
        const { atual, limit } = this.state;
        const { termo } = this.props;
        this.props.fetchProdutosPesquisa(termo, atual, limit);
    }

    changeNumeroAtual = (atual) => {
        this.setState({ atual }, () => this.getProdutos());
    }

    render(){
        const { termo, produtosPesquisa } = this.props;
        return (
            <div className="container Categoria-Produtos">
                <br /><br />
                <div className="flex flex-center">
                    <h1>Resultados para: {termo}</h1>
                </div>
                <br />
                <Produtos
                    produtos={produtosPesquisa ? produtosPesquisa.docs : []}
                    itensPorLinha={4} />
                <Paginacao 
                    atual={this.state.atual || 0}
                    total={produtosPesquisa.total}
                    limite={this.state.limit}
                    onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    termo: state.produto.termo,
    produtosPesquisa: state.produto.produtosPesquisa
});

export default connect(mapStateToProps, actions)(ProdutosPesquisa);