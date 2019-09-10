import React from 'react';

export default () => (
    <style jsx global>{`
    
    body { 
        margin: 0;
        padding: 0; }
    body, * {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    .container,
    .container-big {
        width: calc(100% - 20px);
        padding: 0 10px;
        max-width: 1200px;
        margin: 0 auto; }
    .container-big {
        max-width: 1440px; }

    .flex { display: flex; }
    .flex-1 { flex: 1; }
    .flex-2 { flex: 2; }
    .flex-3 { flex: 3; }
    .flex-4 { flex: 4; }
    .flex-5 { flex: 5; }
    .flex-6 { flex: 6; }

    .wrap { flex-wrap: wrap; }
    .wrap-1 { 
        flex-basis: calc(100% - 50px);
        max-width: calc(100% - 50px);
    }
    .wrap-2 { 
        flex-basis: calc(50% - 50px);
        max-width: calc(50% - 50px);
    }
    .wrap-3 { 
        flex-basis: calc(32% - 50px);
        max-width: calc(32% - 50px);
    }
    .wrap-4 { 
        flex-basis: calc(25% - 50px);
        max-width: calc(25% - 50px);
    }
    .wrap-5 { 
        flex-basis: calc(20% - 50px);
        max-width: calc(20% - 50px);
    }

    .vertical { flex-direction: column; }

    .flex-center {
        justify-content: center;
        align-items: center; }
    .flex-start {
        justify-content: flex-start;
        align-items: center; }
    .flex-right {
        justify-content: flex-end;
        align-items: center; }

    .text-center {
        text-align: center;
    }

    select {
        font-size: 1rem; }
    
    @media screen and (max-width: 720px){
        .wrap-mb { flex-wrap: wrap; }
        .wrap-2-mb {
            flex-basis: calc(50% - 20px);
            max-width: calc(50% - 20px);
        }
        .produto.wrap-2-mb {
            flex-basis: calc(50% - 50px);
            max-width: calc(50% - 50px);
        }
        .horizontal-mb { flex-direction: row; }
        .horizontal { flex-direction: column; }
    }

    `}</style>
)