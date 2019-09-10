import React from 'react';

const TabelaSimples = ({ cabecalho, dados }) => (
    <div className="TabelaSimples">
        <table className="simples">
            <thead>
                <tr>
                    { cabecalho.map((item, idx) => (<th key={idx}>{item}</th>)) }
                </tr>
            </thead>
            <tbody>
                { dados.map((linha, idx) => (
                    <tr key={idx}>
                        { cabecalho.map((item, index) => (
                            <td key={index}>{ linha[item] || "" }</td>
                        )) }
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default TabelaSimples;