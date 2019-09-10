export const numberPattern = /\d+/g;

export const formatCEP = (value) => {
    const auxCep = (value || "").match(numberPattern);
    const _cep = (auxCep || []).join('');
    return _cep.length > 5 ? _cep.slice(0,5)+'-'+_cep.slice(5,8) : _cep;
};

export const formatCPF = (value) => {
    const auxCPF = (value || "").match(numberPattern);
    const _CPF = (auxCPF || []).join(''); 
    if(_CPF.length > 9) return _CPF.slice(0,3) + '.' + _CPF.slice(3,6) + '.' + _CPF.slice(6,9) + '-' + _CPF.slice(9,11);
    if(_CPF.length > 6) return _CPF.slice(0,3) + '.' + _CPF.slice(3,6) + '.' + _CPF.slice(6,9);
    if(_CPF.length > 3) return _CPF.slice(0,3) + '.' + _CPF.slice(3,6);
    return _CPF;
};

export const formatDataDeNascimento =  (value) => {
    const auxData = (value || "").match(numberPattern);
    const _data = (auxData || []).join(''); 
    if(_data.length > 4) return _data.slice(0,2) + '/' + _data.slice(2,4) + '/' + _data.slice(4,8);
    if(_data.length > 2) return _data.slice(0,2) + '/' + _data.slice(2,4);
    return _data;
};

export const formatTelefone =  (value) => {
    const auxTelefone = (value || "").match(numberPattern);
    const _telefone = (auxTelefone || []).join('');     
    return _telefone.length > 2 ? _telefone.slice(0,2) + ' ' + _telefone.slice(2,12) : _telefone;
};

export const formatNumber =  (value, limit) => {
    const auxN = (value || "").match(numberPattern);
    const _n = (auxN || []).join('');     
    return limit ? _n.slice(0,limit) : _n;
};

export const formatCartao = (value) => {
    const auxCartao = (value || "").match(numberPattern);
    const _cartao = (auxCartao || []).join(''); 
    if(_cartao.length > 12) 
        return _cartao.slice(0,4) + ' ' + _cartao.slice(4,8) + ' ' + _cartao.slice(8,12) + ' ' + _cartao.slice(12,16);
    if(_cartao.length > 8) 
        return _cartao.slice(0,4) + ' ' + _cartao.slice(4,8) + ' ' + _cartao.slice(8,12);
    if(_cartao.length > 4) 
        return _cartao.slice(0,4) + ' ' + _cartao.slice(4,8);
    return _cartao;
};

export default {
    numberPattern,
    formatCEP,
    formatCPF,
    formatDataDeNascimento,
    formatTelefone,
    formatNumber,
    formatCartao
};