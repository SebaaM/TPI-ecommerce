import { useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart";
import { useContext } from 'react'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { SearchBar } from "./SearchBar";
import CartModal from "./cartModal";

/*cambiar por links definitivos a cada seccion cuando esten creadas las paginas */
const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Categorias", href: "/categorias"},
  { name: "Admin", href: "/Admin"},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const { getCartQuantity } = useContext(CartContext)
  

  return (
    <>
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 right-0 z-50 bg-[#1b1d1f] text-white shadow-md border-b border-gray-700 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Botón menú móvil */}
          <div className="flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none transition">
              <Bars3Icon
                className="block h-6 w-6 group-data-open:hidden"
                aria-hidden="true"
              />
              <XMarkIcon
                className="hidden h-6 w-6 group-data-open:block"
                aria-hidden="true"
              />
            </DisclosureButton>
          </div>

          {/* Logo y Navegación */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Logo"
              />
            </div>

            {/* Links */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      "text-white bg-transparent hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 relative overflow-visible">
            {/*Barra de busqueda, se muestra solo en modo desktop*/}
            <div className="hidden md:block">
              <SearchBar value={value} onChange={onChange} />
            </div>

            {/* Carrito */}
            <div className="relative cursor-pointer" onClick={() => setOpen(prev => !prev)}>
              <ShoppingCartIcon className="h-6 w-6 text-gray-300 hover:text-white transition" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-[5px]">
                {getCartQuantity()}
              </span>
            </div>

            {/* Menú usuario */}
            <Menu as="div" className="relative">
              <div className="cursor-pointer flex items-center justify-center rounded-full hover:ring-2 hover:ring-white transition">
                <Menu.Button as="div">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=256&h=256&q=80"
                    alt="User avatar"
                    className="h-8 w-8 rounded-full border border-gray-600"
                  />
                </Menu.Button>
              </div>

              {/* Dropdown */}
              <MenuItems
                transition
                className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-[#2a2d31] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem
                  as={Link}
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-200 data-focus:bg-gray-700"
                >
                  Tu perfil
                </MenuItem>
                <MenuItem
                  as={Link}
                  to="/settings"
                  className="block px-4 py-2 text-sm text-white data-focus:bg-gray-700"
                >
                  Configuración
                </MenuItem>
                <MenuItem
                  as={Link}
                  className="block px-4 py-2 text-sm text-gray-200 data-focus:bg-gray-700"
                >
                  Cerrar sesión
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <DisclosurePanel className="sm:hidden border-t border-gray-700">
        <div className="space-y-1 px-2 pt-2 pb-3 bg-[#1b1d1f]">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className={classNames(
              "text-white hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
    
    <CartModal open={open} setOpen={setOpen}/>

  </>
  );
}
