import React, { Component } from 'react';
import { baseImg } from '../../config';
import { formatMoney } from '../../utils';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { addCart } from '../../utils/cart';

class ListaDeProdutos extends Component {

    renderCabecalhoCarrinho(semAlteracoes){
        return (
            <div className="carrinho-cabecalho no-mb-flex flex">
                <div className="flex-4"></div>
                <div className="headline flex-1 flex flex-center">
                    <h3 className="text-center">Quantidade</h3>
                </div>
                <div className="headline flex-1 flex flex-center">
                    <h3 className="text-center">Preço Unitário</h3>
                </div>
                <div className="headline flex-1 flex flex-center">
                    <h3 className="text-center">Preço Total</h3>
                </div>
                { !semAlteracoes && (<div className="flex-1"></div>) }
            </div>
        )
    }

    changeQuantidade(e, quantidade, item, index){
        if(Number(e.target.value) < 1) return;
        let novaQuantidade = Number(e.target.value);
        let change = novaQuantidade - quantidade;
        if( novaQuantidade >= item.variacao.quantidade ){
            return alert("Não temos essa quantidade em estoque.");
        }
        addCart({
            produto: item.produto._id,
            variacao: item.variacao._id,
            quantidade: change,
            precoUnitario: item.precoUnitario
        }, false);
        this.props.updateQuantidade(change, index);
    }

    removerProdutoCarrinho(index){
        if(window.confirm("Você deseja realmente remover esse produto?")){
            this.props.removerProduto(index);
        }
    }

    renderProduto(item, semAlteracoes, index){
        if(
            !item.variacao || !item.variacao._id || 
            !item.produto || !item.produto._id
        ) return null;
        
        const foto = item.variacao.fotos && item.variacao.fotos.length > 0 ? 
                            item.variacao.fotos[0] : 
                            item.produto.fotos[0];
        const nome = item.produto.titulo + " - " + item.variacao.nome;
        const { quantidade, precoUnitario } = item;
        
        return (
            <div key={index} className="carrinho-item flex">
                <div className="flex-4 flex">
                    <div className="produto-image flex-2 flex flex-center">
                        <img src={baseImg + foto} alt={nome} width="100px" />
                    </div>
                    <div className="produto-titulo flex-4 flex flex-start">
                        <h3 className="text-center">{nome}</h3>
                    </div>
                </div>
                <div className="flex-1 flex flex-center">
                    {
                        semAlteracoes ?
                        (<span>{quantidade}</span>) :
                        (<input 
                            type="number" value={quantidade} 
                            className="produto-quantidade" 
                            onChange={(e) => this.changeQuantidade(e, quantidade, item, index)}
                        />)
                    }
                </div>
                <div className="flex-1 flex flex-center">
                    <span>{formatMoney(precoUnitario)}</span>
                </div>
                <div className="flex-1 flex flex-center">
                    <span>{formatMoney(precoUnitario * quantidade)}</span>
                </div>
                { !semAlteracoes && (
                    <div 
                        className="flex-1 flex flex-center"
                        onClick={() => this.removerProdutoCarrinho(index)} >
                        <span className="btn-remover">Remover</span>
                    </div>
                )}
            </div>
        )
    }

    renderProdutos(semAlteracoes){
        return this.props.carrinho.map((item, index) => this.renderProduto(item, semAlteracoes, index))
    }

    render(){
        const { semAlteracoes, carrinho } = this.props;
        return (
            <div className="Lista-De-Produtos flex vertical">
                { this.renderCabecalhoCarrinho(semAlteracoes) }
                { carrinho && this.renderProdutos(semAlteracoes) }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    carrinho: state.carrinho.carrinho
});

export default connect(mapStateToProps, actions)(ListaDeProdutos);