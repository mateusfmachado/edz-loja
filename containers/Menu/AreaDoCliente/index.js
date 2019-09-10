import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import actions from '../../../redux/actions';

class MenuAreaDoCliente extends Component {

    componentDidMount(){
        this.fetchCliente();
    }

    componentDidUpdate(){
        this.fetchCliente();
    }

    fetchCliente(){
        const { usuario, token, cliente } = this.props;
        if(usuario && token && !cliente){
            this.props.fetchCliente(usuario._id, token);
        }
    }

    renderCabecalho(){
        const { usuario } = this.props;
        return (
            <div>
                <h3>Oi, {usuario ? usuario.nome : "cliente"}!<br /> Seja bem-vindo a Área do Cliente.</h3>
                <p>Por aqui você pode acompanhar seus pedidos e também alterar seus dados de acesso e senha.</p>
            </div>
        )
    }

    renderMenu(){
        const url = this.props.router.pathname;
        const estaEmDados = url.includes("/area-cliente/dados");
        const estaEmAlterarSenha = url.includes("/area-cliente/alterar-senha");
        const estaEmPedidos = !estaEmDados && !estaEmAlterarSenha;
        return (
            <div className="menu-lateral">
                <Link href="/area-cliente">
                    <div className={`menu-lateral-item ${estaEmPedidos ? "menu-lateral-item-active": ""}`}>
                        <span>MEUS PEDIDOS</span>
                    </div>
                </Link>
                <Link href="/area-cliente/dados">
                    <div className={`menu-lateral-item ${estaEmDados ? "menu-lateral-item-active": ""}`}>
                        <span>MEUS DADOS</span>
                    </div>
                </Link>
                <Link href="/area-cliente/alterar-senha">
                    <div className={`menu-lateral-item ${estaEmAlterarSenha ? "menu-lateral-item-active": ""}`}>
                        <span>ALTERAR SENHA</span>
                    </div>
                </Link>
                <div 
                    className="menu-lateral-item" 
                    onClick={() => this.props.logoutCliente()}>
                    <span>SAIR</span>
                </div>            
            </div>
        )
    }

    render(){
        return (
            <div className="flex-1 flex vertical">
                { this.renderCabecalho() }
                { this.renderMenu() }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usuario: state.auth.usuario,
    token: state.auth.token,
    cliente: state.cliente.cliente
});

export default connect(mapStateToProps, actions)(withRouter(MenuAreaDoCliente));