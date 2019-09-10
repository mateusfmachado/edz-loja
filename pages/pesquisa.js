import React, { Component } from 'react';

import Layout from '../components/Layout';
import Cabecalho from '../containers/Cabecalho';
import ProdutosPesquisa from '../containers/Lista/ProdutosPesquisa';
import Rodape from '../containers/Rodape';

import initialize from '../utils/initialize';
import callBaseData from '../utils/callBaseData';

import { connect } from 'react-redux';
import actions from '../redux/actions';

class Pesquisa extends Component {
    static async getInitialProps(ctx){
        initialize(ctx);
        if(ctx.store) ctx.store.dispatch(actions.fetchTermo(ctx.query.termo));
        return callBaseData([
            actions.fetchProdutosPesquisa.bind(null, ctx.query.termo)
        ], ctx);
    }

    render(){
        const { termo } = this.props;
        return(
            <Layout title={`Resultados para ${termo ? termo : "-"} | LOJA IT - Melhores produtos de tecnologia`}>
                <Cabecalho />
                <ProdutosPesquisa />
                <Rodape />
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    termo: state.produto.termo
});

export default connect(mapStateToProps, actions)(Pesquisa);