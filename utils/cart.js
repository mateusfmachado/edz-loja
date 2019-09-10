import Router from "next/router";

const _saveCart = (item) => {
    let cart = getCart();

    let found;
    cart = cart.map((_item) => {
        if(
            _item.produto === item.produto &&
            _item.variacao === item.variacao 
        ){
            found = true;
            return { ..._item, quantidade: Number(_item.quantidade) + Number(item.quantidade) }
        } else return _item;
    });
    if(!found) cart.push(item);

    localStorage.setItem("@cart", JSON.stringify(cart));
}

export const getCart = () => JSON.parse(localStorage.getItem("@cart") || "[]");

export const cleanCart = () => localStorage.removeItem("@cart");

export const addCart = (item, goToCart = true) => {
    _saveCart(item);
    if(goToCart) Router.push("/carrinho");
};

export const getCountItemsCart = () => 
            getCart().reduce(
                (c, { quantidade }) => 
                c + (Number(quantidade) || 1) , 0);

export const removeCart = (index) => {
    let cart = getCart();
    cart = cart.reduce(
        (all, item, _index) =>
        index !== _index ? all.concat([item]) : all, []
    );
    localStorage.setItem("@cart", JSON.stringify(cart));
}

export default {
    getCart,
    addCart,
    cleanCart,
    getCountItemsCart,
    removeCart
};