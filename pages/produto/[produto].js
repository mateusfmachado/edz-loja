import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Cabecalho from '../../containers/Cabecalho';
import Produto from '../../containers/Produto';
import Rodape from '../../containers/Rodape';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

import initialize from '../../utils/initialize';
import callBaseData from '../../utils/callBaseData';

class ProdutoPage extends Component {
    static async getInitialProps(ctx){
        initialize(ctx);
        return callBaseData([
            actions.fetchProduto.bind(null, ctx.query.id),
            actions.fetchAvaliacoes.bind(null, ctx.query.id),
            actions.fetchVariacoes.bind(null, ctx.query.id)
        ], ctx);
    }

    async componentDidMount(){
        await this.props.getUser({ token: this.props.token });
    }

    render(){
        const { produto } = this.props;
        return(
            <Layout title={`${produto ? produto.titulo : ""} | LOJA IT - Melhores produtos de tecnologia`}>
                <Cabecalho />
                <Produto />
                <Rodape />
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    produto: state.produto.produto,
    token: state.auth.token
});

export default connect(mapStateToProps, actions)(ProdutoPage);