import React, { Component } from 'react';

import MenuAreaDoCliente from '../../Menu/AreaDoCliente';
import FormularioSenha from './FormularioSenha';

class AlterarSenhaContainer extends Component {
    render(){
        return (
            <div className="Senha-Container container-big flex horizontal">
                <MenuAreaDoCliente />
                <FormularioSenha />
            </div>
        )
    }
}

export default AlterarSenhaContainer;