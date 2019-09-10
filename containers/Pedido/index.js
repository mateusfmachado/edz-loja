import React, { Component } from 'react';

import MenuAreaDoCliente from '../Menu/AreaDoCliente';
import PedidoDetalhes from './PedidoDetalhes';

class PedidoContainer extends Component {
    render(){
        const { query } = this.props;
        return (
            <div className="Pedido-Container container-big flex horizontal">
                <MenuAreaDoCliente />
                <PedidoDetalhes query={query} />
            </div>
        )
    }
}

export default PedidoContainer;