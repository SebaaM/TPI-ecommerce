import { CartContext } from "../context/cart";
import { useContext } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function CartModal({open, setOpen}) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal, deleteFromCart} = useContext(CartContext)
  
  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-9999">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto z-9999 w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Carro de compras</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartItems.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img alt={product.title} src={product.pictures} className="size-full object-cover" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col min-w-0">
                                <div>   
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3 className="truncate max-w-[60%]">
                                      <a>{product.title}</a>
                                    </h3>
                                    <p className="ml-4">$ {(product.price*product.quantity).toFixed(2)}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">

                                     <div className="flex items-center md:px-2.5 md:py-1.5 border border-gray-300 text-slate-900 text-xs rounded-md">
                                        {/*Boton menos en modal de carro*/ }
                                        <span className="cursor-pointer"  onClick={()=>removeFromCart(product)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 124 124">
                                                <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                                            </svg>
                                        </span>
                                         {/*Cantidad de producto en modal de carro*/ }
                                        <span className="mx-3">{product.quantity}</span>
                                         {/*Boton mas en modal de carro*/ }
                                        <span className="cursor-pointer" onClick={()=>addToCart(product)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 fill-current" viewBox="0 0 42 42">
                                                <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                                            </svg>
                                        </span>
                                    </div>
                                 {/* Icono de eliminar del carrito el producto */ }
                                  <div className="flex items-center">
                                    <button type="button" 
                                            className="mb-1 font-semibold text-red-500 text-xs flex items-center gap-2 shrink-0 cursor-pointer"
                                            onClick={() => deleteFromCart(product)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-current inline" viewBox="0 0 24 24">
                                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                                      </svg>
                                      Eliminar
                                  </button>
                                    
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total</p>
                      <p>$ {getCartTotal().toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Envío e impuestos calculados al pagar.</p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="flex items-center justify-center rounded-md border border-transparent bg-green-700 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-green-900"
                      >
                        Realizar compra
                      </a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        o{' '}
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Seguir explorando
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
