import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Cabecalho from '../../containers/Cabecalho';
import DadosContainer from '../../containers/AreaDoCliente/Dados';
import Rodape from '../../containers/Rodape';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import initialize from '../../utils/initialize';
import callBaseData from '../../utils/callBaseData';


class DadosDoCliente extends Component {
    static async getInitialProps(ctx){
        initialize(ctx);
        return callBaseData([ ], ctx);
    }

    async componentDidMount(){
        await this.props.getUser({ token: this.props.token });
    }
    
    render(){
        return(
            <Layout title="Meus Dados | LOJA IT - Melhores produtos em Informática">
                <Cabecalho />
                <DadosContainer />
                <Rodape />
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(mapStateToProps, actions)(DadosDoCliente)