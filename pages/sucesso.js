import React, { Component } from 'react';

import Layout from '../components/Layout';
import Cabecalho from '../containers/Cabecalho';
import SucessoContainer from '../containers/Sucesso';
import Rodape from '../containers/Rodape';

export default class Sucesso extends Component {
    render(){
        return(
            <Layout title="LOJA IT - Melhores produtos em Informática">
                <Cabecalho simples />
                <SucessoContainer />
                <Rodape />
            </Layout>
        )
    }
}