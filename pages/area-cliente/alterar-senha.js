import React, { Component } from 'react';

import Layout from '../../components/Layout';
import Cabecalho from '../../containers/Cabecalho';
import AlterarSenhaContainer from '../../containers/AreaDoCliente/AlterarSenha';
import Rodape from '../../containers/Rodape';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import initialize from '../../utils/initialize';
import callBaseData from '../../utils/callBaseData';

class AlterarSenha extends Component {
    static async getInitialProps(ctx){
        initialize(ctx);
        return callBaseData([ ], ctx);
    }

    async componentDidMount(){
        await this.props.getUser({ token: this.props.token });
    }

    render(){
        return(
            <Layout title="Alterar Senha | LOJA IT - Melhores produtos em Informática">
                <Cabecalho />
                <AlterarSenhaContainer />
                <Rodape />
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(mapStateToProps, actions)(AlterarSenha)