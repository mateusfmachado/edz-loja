import React from 'react';
import Link from 'next/link';

const Paginas = () => (
    <div className="flex-1 flex vertical institucional">
        <div>
            <h2>Páginas</h2>
            <br />
        </div>
        <Link href="/">
            <span>Página Inicial</span>
        </Link>
        <Link href="/carrinho">
            <span>Ver Sacola</span>
        </Link>
        <Link href="/area-cliente/">
            <span>Minha Conta</span>
        </Link>
        <Link href="/sobre">
            <span>Sobre a Loja</span>
        </Link>
    </div>
)

export default Paginas;