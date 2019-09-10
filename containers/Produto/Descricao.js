import React from 'react';
import { connect } from 'react-redux';

class Descricao extends React.Component {
    render(){
        const { produto } = this.props;
        return (
            <div className="Descricao flex vertical">
                <h2>Descrição</h2>
                <br />
                <div>
                    {
                        produto.descricao.split("\n")
                        .map((item, idx) => <p key={idx}>{item}</p>)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    produto: state.produto.produto
});

export default connect(mapStateToProps)(Descricao);