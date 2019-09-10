import React, { Component } from 'react';

import Layout from '../../../components/Layout';
import Cabecalho from '../../../containers/Cabecalho';
import PedidoContainer from '../../../containers/Pedido';
import Rodape from '../../../containers/Rodape';

import { connect } from 'react-redux';
import actions from '../../../redux/actions';
import initialize from '../../../utils/initialize';
import callBaseData from '../../../utils/callBaseData';

class Pedido extends Component {
    static async getInitialProps(ctx){
        initialize(ctx);
        return { 
            ...await callBaseData([ ], ctx), 
            query: ctx.query 
        };
    }

    async componentDidMount(){
        await this.props.getUser({ token: this.props.token });
    }

    render(){
        const { query } = this.props;
        return(
            <Layout title="Pedido | LOJA TI - Melhores produtos em informática">
                <Cabecalho />
                <PedidoContainer query={query} />
                <Rodape />
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(mapStateToProps, actions)(Pedido)