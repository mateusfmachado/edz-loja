import React from 'react';
import Link from 'next/link';

import Logo from '../../components/Logo/Cabecalho';
import CampoPesquisa from '../../components/Campos/Pesquisa';
import CardCarrinho from '../../components/Cards/Carrinho';
import Categorias from '../../components/Listas/Categorias';

class Cabecalho extends React.Component {
    renderCabecalhoNormal(){
        return (
            <div className="Header">
                <div className="header-wrapper">
                    <Logo />
                    <CampoPesquisa />
                    <CardCarrinho />
                </div>
                <div className="categorias-wrapper">
                    <Categorias />
                </div>
            </div>
        )
    }

    renderCabecalhoSimples(){
        return (
            <div className="Header No-Links Header-Simples">
                <div className="header-wrapper">
                    <Logo />
                </div>
            </div>
        )
    }

    render(){
        const { simples } = this.props;
        return simples ? 
                this.renderCabecalhoSimples() : 
                this.renderCabecalhoNormal()
    }
}

export default Cabecalho;