const errorHandling = (error) => {
    console.log(error, error.response ? error.response.data : null);
    if(!error.response || !error.response.data){
        return { status: 500, message: "Ocorreu um erro no servidor. Tente novamente." };
    }
    if(error.response.data.status === 401){
        return { status: 401, message: "Você não tem autorização para acessar esses dados." };
    }

    const _errors = error.response.data.errors || error.response.data.error;
    if(_errors && typeof _errors === "string") return { status: 400, message: _errors };

    let msg = 'Erro: ';
    if(!Array.isArray(_errors)){
        Object.keys(_errors).forEach((erro, index) => {
            msg += `${erro} ${_errors[erro].message || _errors[erro]}\n`;
        });
    } else {
        msg += `Preencha corretamente ${ _errors.length > 1 ? "os campos ": "o campo " } de:`;
        _errors.forEach((item, index) => {
            const field = item.field[item.field.length - 1];
            msg += ` ${field}${index === _errors.length - 1 ? "." : ","}`;
        })
    }
    return { status: 400, message: msg };
}

export default errorHandling;