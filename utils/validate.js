import { numberPattern } from './format';

export const onlyNumbers = (value) => {
    const auxCep = (value || "").match(numberPattern);
    return (auxCep || []).join("");
};

export const validateCPF = (_strCPF) => {
    const strCPF = onlyNumbers(_strCPF);
    if(strCPF.length !== 11) return false;
    let soma;
    let resto;
    soma = 0;
    if (strCPF == "00000000000") return false;
        
    for (var i=1; i<=9; i++){
        soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
   
    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
    soma = 0;
    for (var j = 1; j <= 10; j++){
        soma = soma + parseInt(strCPF.substring(j-1, j)) * (12 - j);
    }
    resto = (soma * 10) % 11;
   
    if( ( resto == 10 ) || ( resto == 11 ) )  resto = 0;
    if( resto != parseInt(strCPF.substring(10, 11)) ) return false;

    return true;
};

export default {
    validateCPF,
    onlyNumbers
};