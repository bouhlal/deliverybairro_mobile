import React, { useState, createContext} from 'react';

export const CartContext = createContext({});

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [info, setInfo] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

  function SetDelivery(data) {
    setInfo(data);
  }

  function AddToCart(newItem, qty, total) {
    console.log(newItem);
    const i = cart.findIndex(item => item.id_produto === newItem.id_produto);
    if(i !== -1){
      let cList = cart;
      cList[i].qtd = cList[i].qtd +qty;
      cList[i].vr_total  = cList[i].vr_total +total;
      setCart(cList);
      setCartTotal(cList);
      return;
    }
    let data = {
      ...newItem,
      qtd: qty,
      vr_total: total
    }
    setCart(products => [...products, data]);
    setCartTotal([...cart, data])
  }

  function RemoveFromCart(product){
    const i = cart.findIndex(item => item.id_produto === product.id_produto);
    if (cart[i]?.qtd >1) {
      let cList = cart;
      cList[i].qtd = cList[i].qtd -1;
      cList[i].vr_total = cList[i].vr_total - cList[i].vr_unitario;
      setCart(cList);
      setCartTotal(cList);
      return;
    }
    const newList = cart.filter(item => item.id_produto !== product.id_produto);
    setCart(newList);
    setCartTotal(newList);
  }

  function setCartTotal(items) {
    let cesta = items;
    let result = cesta.reduce((acc, obj) => { return acc + obj.vr_total}, 0)
    setSubTotal(result.toFixed(2));
  }

  function cleanCart() {
    setCart([]);
    setSubTotal(0);
  }

  return(
    <CartContext.Provider value={{
      cart, info, subtotal,
      cleanCart, AddToCart, RemoveFromCart,
      SetDelivery,
    }}>
      { children }
    </CartContext.Provider>
  )
}
