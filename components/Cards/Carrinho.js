import React, { Component } from 'react';
import Link from 'next/link';
import { getCountItemsCart } from '../../utils/cart';

class CardCarrinho extends Component {
    state = { cartQtd: 0 }

    componentDidMount(){
        this.setState({ cartQtd: getCountItemsCart() })
    }

    render(){
        return (
            <div className="itens-cabecalho flex-2 flex flex-center">
                <Link href="/area-cliente">
                    <div className="item-cabecalho">
                        <i className="fa fa-user"></i>
                        <span>Minha Conta</span>
                    </div>
                </Link>
                <Link href="/carrinho">
                    <div className="item-cabecalho cart">
                        <i className="fa fa-shopping-bag"></i>
                        <span>{ this.state.cartQtd || 0 }</span>
                    </div>
                </Link>
            </div>
        )
    }
}

export default CardCarrinho;