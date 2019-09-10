import React, { Component } from 'react';
import Link from 'next/link';
import { formatMoney } from '../../utils';

import { connect } from 'react-redux';
import actions from '../../redux/actions';

import Frete from '../../components/Item/Frete';

class DadosDoCarrinho extends Component {

    renderDadosDoCarrinho(){
        const { carrinho, freteSelecionado } = this.props;
        const valorTotal = (carrinho || []).reduce(
            (all, item) => all + ( Number(item.precoUnitario) * Number(item.quantidade) ), 0
        );
        return (
            <div className="dados-do-carrinho-container flex-3">
                <div className="dados-do-carrinho-item flex">
                    <div className="flex-1">
                        <p className="headline">Valor do Pedido:</p>
                    </div>
                    <div className="flex-1 flex flex-center">
                        {formatMoney(valorTotal)}
                    </div>
                </div>
                <Frete />
                <div className="dados-do-carrinho-item flex">
                    <div className="flex-1">
                        <p className="headline">Valor Total:</p>
                    </div>
                    <div className="flex-1 flex flex-center">
                        {
                            formatMoney(
                                valorTotal + 
                                Number( 
                                    freteSelecionado ? 
                                    (freteSelecionado.Valor || "0").replace(",",".") :
                                    0
                                )
                            )
                        }
                    </div>
                </div>
                <div className="dados-do-carrinho-item flex flex-right">
                    <Link href="/checkout">
                        <button className="btn btn-success btn-cta">
                            <span>Finalizar Pedido</span>
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    render(){
        return (
            <div className="Dados-Do-Carrinho flex horizontal" >
                <div className="flex-4"></div>
                { this.renderDadosDoCarrinho() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    carrinho: state.carrinho.carrinho,
    freteSelecionado: state.carrinho.freteSelecionado
});

export default connect(mapStateToProps, actions)(DadosDoCarrinho);