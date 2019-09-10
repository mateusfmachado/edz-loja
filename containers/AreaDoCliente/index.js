import React, { Component } from 'react';

import PedidosContainer from './Pedidos';
import AcessoContainer from './Acesso';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class AreaDoClienteContainer extends Component {
    render(){
        return this.props.usuario ? <PedidosContainer /> : <AcessoContainer />;
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario
});

export default connect(mapStateToProps, actions)(AreaDoClienteContainer);