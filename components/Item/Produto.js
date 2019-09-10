import React, { Component } from 'react';
import Link from 'next/link';

import { formatMoney } from '../../utils';
import { baseImg } from '../../config';

class Produto extends Component {
    render(){
        const { item, porLinha } = this.props;
        const { _id, titulo, preco, promocao, fotos } = item;
        const temPromo = promocao && preco !== promocao;
        return (
            <Link href={`/produto/${titulo}?id=${_id}`}>
                <div className={`produto flex flex-1 vertical wrap-${porLinha} wrap-2-mb`}>
                    <div className="produto-image flex flex-center">
                        <img src={`${baseImg}${fotos[0]}`} alt={titulo} style={{ maxWidth: "95%" }} />
                    </div>
                    <div className="produto-title flex flex-center">
                        <h3>{titulo}</h3>
                    </div>
                    <br />
                    <div 
                        className={`produto-preco ${temPromo ? "produto-por": ""} flex flex-center`}>
                        <h2>{formatMoney(preco)}</h2>
                    </div>
                    { temPromo && (
                        <div className={`produto-preco-promocao flex flex-center`}>
                            <h2>{formatMoney(promocao)}</h2>
                        </div>
                    )}
                    <div className={`produto-preco-parcelado flex flex-center`}>
                        <h4>ou 6x de {formatMoney((temPromo ? promocao : preco)/6)} sem juros</h4>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Produto;