import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import Link from 'next/link';

class Avaliacoes extends Component{
    state = {
        texto: "",
        pontuacao: 5
    }

    renderAvaliacoes(){
        const { avaliacoes } = this.props;
        return (
            <div className="avaliacoes-items flex horizontal wrap no-wrap-mb">
                {
                    avaliacoes.map((avaliacao) => (
                        <div 
                            key={avaliacao._id} 
                            className="avaliacao flex-1 flex vertical wrap-3">
                            <div className="avaliacao-texto flex-3 flex texto">
                                <p>{avaliacao.texto}</p>
                            </div>
                            <div className="avaliacao-dados flex">
                                <div className="avaliacao-nome flex-1 flex">
                                    <small>{avaliacao.nome}</small>
                                </div>
                                <div className="avaliacao-pontuacao flex-1 flex">
                                    <span>
                                        {
                                            [...Array(avaliacao.pontuacao).keys()].map((i, idx) => (
                                                <i key={idx} className="fa fa-star"></i>
                                            ))
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }                
            </div>
        )
    }

    submitAvaliacao(){
        const { texto, pontuacao } = this.state;
        const { produto, token, usuario } = this.props;
        if(!texto || !produto) alert("Preencha o campo de texto da avaliação.");
        this.props.novaAvaliacao({ 
            nome: usuario.nome, 
            token, 
            produto: produto._id,
            texto, 
            pontuacao
        }, (err) => {
            if(err) alert("Ocorreu um erro, tente novamente.");
            else this.setState({ texto: "", pontuacao: 5 });
        });
    }

    renderFormularioDeAvaliacoes(){
        return (
            <div className="avaliacoes-form">
                <h4>Envie sua avaliação para o produto:</h4>
                <div className="flex vertical">
                    <div className="flex horizontal">
                        <label>Pontuação:&nbsp;</label>
                        <select 
                            value={this.state.pontuacao}
                            onChange={(e) => this.setState({ pontuacao: e.target.value })} >
                            <option value="1">1 estrela</option>
                            <option value="2">2 estrelas</option>
                            <option value="3">3 estrelas</option>
                            <option value="4">4 estrelas</option>
                            <option value="5">5 estrelas</option>
                        </select>
                    </div>
                    <div className="flex vertical">
                        <label>Avaliação:</label><br />
                        <textarea 
                            rows="3" style={{ resize: "none", width: "100%", maxWidth: "500px" }}
                            placeholder="Digite aqui a sua avaliação..."
                            value={this.state.texto} 
                            onChange={(e) => this.setState({ texto: e.target.value })} />
                    </div>
                    <div>
                        <button
                            onClick={() => this.submitAvaliacao()} 
                            className="btn btn-primary btn-lg">
                            <span>Enviar Avaliação</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderAvisoLogin(){
        return (
            <div>
                <Link href="/area-cliente">
                    <button className="btn btn-primary btn-sm">
                        CLIQUE AQUI PARA LOGAR E DEIXAR UMA AVALIAÇÃO
                    </button>
                </Link>
            </div>
        )
    }

    render(){
        return (
            <div className="Avaliacoes flex vertical">
                <h2>Avaliações</h2>
                <br />
                { this.renderAvaliacoes() }
                <br />
                { 
                    this.props.token ? 
                        this.renderFormularioDeAvaliacoes() : 
                        this.renderAvisoLogin() 
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    produto: state.produto.produto,
    avaliacoes: state.produto.avaliacoes,
    token: state.auth.token,
    usuario: state.auth.usuario
});

export default connect(mapStateToProps, actions)(Avaliacoes);