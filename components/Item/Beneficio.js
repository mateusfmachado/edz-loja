import React from 'react';

export default ({ icone, texto }) => (
    <div className="flex-1 flex vertical flex-start wrap-2-mb">
        <i className={`fa ${icone} fa-3x`}></i>
        <span className="text-center">{texto}</span>
    </div>
)