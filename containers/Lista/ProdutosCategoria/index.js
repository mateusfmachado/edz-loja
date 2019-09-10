import React, { Component } from 'react';

import Produtos from '../../../components/Listas/Produtos';
import Paginacao from '../../../components/Paginacao';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';


class ProdutosCategoria extends Component {
    state = { 
        atual: 0,
        limit: 20
    }

    getProdutos(){
        const { atual, limit } = this.state;
        const { categoria } = this.props;
        this.props.fetchProdutosCategoria(categoria._id, atual, limit);
    }

    changeNumeroAtual = (atual) => {
        this.setState({ atual }, () => this.getProdutos());
    }

    render(){
        const { categoria, produtosCategoria } = this.props;
        return (
            <div className="container Categoria-Produtos">
                <br /><br />
                <div className="flex flex-center">
                    <h1>{categoria ? categoria.nome : "-"}</h1>
                </div>
                <br />
                <Produtos
                    produtos={produtosCategoria ? produtosCategoria.docs : []}
                    itensPorLinha={4} />
                <Paginacao 
                    atual={this.state.atual || 0}
                    total={produtosCategoria.total}
                    limite={this.state.limit}
                    onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categoria: state.categoria.categoria,
    produtosCategoria: state.categoria.produtosCategoria
})

export default connect(mapStateToProps, actions)(ProdutosCategoria);