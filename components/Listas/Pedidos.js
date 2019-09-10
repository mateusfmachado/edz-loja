import React, { Component } from 'react';

import Pedido from '../Item/PedidoCard';

class Pedidos extends Component {
    renderCabecalho(){
        return (
            <div className="menu-pedidos flex">
                <div className="flex-1 flex flex-start">
                    <h3>DATA</h3>
                </div>
                <div className="flex-1 flex flex-start">
                    <h3>VALOR</h3>
                </div>
                <div className="flex-3 flex flex-start">
                    <h3>STATUS</h3>
                </div>
                <div className="flex-1 flex flex-start"></div>
            </div>
        )
    }

    renderCorpo(){
        const { pedidos } = this.props;
        return pedidos.map((pedido) => (<Pedido pedido={pedido} key={pedido._id} />))
    }

    render(){
        return (
            <div className="Pedidos-Lista">
                { this.renderCabecalho() }
                { this.renderCorpo() }
            </div>
        )
    }
}

export default Pedidos;