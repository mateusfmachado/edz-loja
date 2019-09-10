import React, { Component } from 'react';

import FormRadio from '../../components/Inputs/FormRadio';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { getCart } from '../../utils/cart';
import { formatMoney, codigosCorreios } from '../../utils';

class DadosFrete extends Component{
    
    componentDidMount(){
        const { form } = this.props;
        if(form){
            this.props.calcularFrete(form.CEP, getCart());
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.form.CEP !== this.props.form.CEP && this.props.form.CEP.length === 9){
            this.props.calcularFrete(this.props.form.CEP, getCart());
        }
    }

    selecionarFrete(frete){
        this.props.selecionarFrete(frete);
    }

    render(){
        const { fretes, freteSelecionado } = this.props;
        return (
            <div className="Dados-Frete">
                <h2>MÉTODOS DE ENTREGA</h2>
                <br />
                <div className="flex horizontal">
                    {
                        (fretes || []).map((frete, index) => (
                            <div className="flex-1" key={index}>
                                <FormRadio 
                                    name="frete_selecionado" 
                                    checked={freteSelecionado ? freteSelecionado.Codigo === frete.Codigo : false} 
                                    onChange={()=> this.selecionarFrete(frete)}
                                    label={`
                                        ${codigosCorreios[frete.Codigo]} 
                                        (${frete.PrazoEntrega} dias úteis) - 
                                        ${formatMoney(frete.Valor.replace(',','.'))}
                                    `} />
                            </div>
                        ))
                    }                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    usuario: state.auth.usuario,
    carrinho: state.carrinho.carrinho,
    cliente: state.cliente.cliente,
    form: state.checkout.form,
    fretes: state.carrinho.fretes,
    freteSelecionado: state.carrinho.freteSelecionado
});

export default connect(mapStateToProps, actions)(DadosFrete);