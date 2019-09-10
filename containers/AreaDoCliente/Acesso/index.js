import React, { Component } from 'react';

import LoginContainer from './Login';
import CadastroContainer from './Cadastro';

export default class AcessoContainer extends Component {
    state = { paraLogar: true }

    changeAcesso = () => this.setState({ paraLogar: !this.state.paraLogar })

    render(){
        return (
            <div className="Acesso-Container">
                { 
                    this.state.paraLogar ? 
                    <LoginContainer changeAcesso={this.changeAcesso} /> : 
                    <CadastroContainer changeAcesso={this.changeAcesso} /> 
                }
            </div>
        )
    }
}