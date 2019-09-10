import React, { Component } from 'react';

import Hero from './Hero';
import Descricao from './Descricao';
import Avaliacoes from './Avaliacoes';
import ProdutosRelacionados from './ProdutosRelacionados';

export default class ProdutoContainer extends Component {
    render(){
        return (
            <div className="container-big Produto">
                <Hero />
                <Descricao />
                <Avaliacoes />
                <ProdutosRelacionados />
            </div>
        )
    }
}