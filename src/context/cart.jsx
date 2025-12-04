import { createContext, useState, useEffect } from 'react'


export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])

    //agregar a carrito
    const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
    setCartItems(
      //si esta en el carrito, se agrega 1 a su cantidad
        cartItems.map((cartItem) => 
        cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem 
        )
    );
    } else {
    //si no existe se agrega con cantidad 1
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    };
    //agregar multiple, se usa en detalle de producto, para agregar mas de uno si es necesario
    const addMultiple = (item, quantity) => {
      const isItemInCart = cartItems.find(p => p.id === item.id);

      if (isItemInCart) {
        // si ya existe solo incremento su cantidad una vez
        setCartItems(cartItems.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + quantity }
            : p
        ));
      } else {
        // si no existe lo agrego con la cantidad pedida
        setCartItems([...cartItems, { ...item, quantity }]);
      }
    };


    const removeFromCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.id === item.id);

    if (isItemInCart.quantity === 1) {
        //si queda uno solo, lo borra
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    } else {
        setCartItems(
        cartItems.map((cartItem) =>
            cartItem.id === item.id
        //si hay mas de un mismo item, le resta 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        );
    }
    };
    //Elimina un producto del carrito sin importar su cantidad
    const deleteFromCart = (item) =>{
        setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
    }
     // borra todos los productos
    const clearCart = () => {
    setCartItems([]);
    };

    //calcular precio total
    const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    //calcular cantidad total de items
    const getCartQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
    };


    useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);



    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
        setCartItems(JSON.parse(cartItems));
        }
    }, []);




return (
  <CartContext.Provider
    value={{
      cartItems,
      addMultiple,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartQuantity,
      deleteFromCart,
    }}
  >
    {children}
  </CartContext.Provider>
);

}
