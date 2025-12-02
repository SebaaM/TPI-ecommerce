import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart";
import { useContext } from "react";
import { useFetchProductos } from "../utils/useFetchProductos";
import ResultadosBusqueda from "./ResultadosBusqueda";
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
import { useFetchCategoria } from "../utils/useFetchCategoria";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

/*cambiar por links definitivos a cada seccion cuando esten creadas las paginas */
const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Productos", href: "/productos" },
  { name: "Admin", href: "/admin" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function Navbar() {
  //Para realizar logout
  const { logout,logged } = useContext(AuthContext);
  //estado para el modal
  const [open, setOpen] = useState(false);
  //inicializar el navigate
  const navigate = useNavigate();

  const activarLogout = () => {
    logout()
    navigate("/")
  };

  //Si esta logueado, filtro admin asi no se mapea en la navBar
  const navigationLogueado = navigation.filter(item => {
    if (item.name === "Admin" && !logged) return false;
    return true;
  });

  const { getCartQuantity } = useContext(CartContext);

  const {
    data: categorias,
    loading: catLoading,
    error: catError,
  } = useFetchCategoria();


  

    //usado en nav Bar y barra de busqueda
    const [searchInput, setSearchInput] = useState("");

    // Fetch de productos
    const {
      data: products,
      loading: loadingProducts,
      error: errorProducts,
    } = useFetchProductos();
  

    

    // filtrado de productos para sugerencias
    const searchResults = searchInput.length > 0
      ? products.filter(p => 
          p.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      : [];



  return (
    <>
      <Disclosure
        as="nav"
        className="mb-2 md:mb-0 fixed top-0 left-0 right-0 z-50 bg-[#1b1d1f] text-white shadow-md border-b border-gray-700 overflow-visible"
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
                  {navigationLogueado.map((item) => (
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
                  <Menu as="div" className="relative">
                    <Menu.Button className="text-sm px-3 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition">
                      Categorías
                    </Menu.Button>
                    <MenuItems className="absolute z-50 mt-2 w-48 origin-top-right rounded-md bg-[#2a2d31] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {catLoading ? (
                        <div className="px-4 py-2 text-sm text-gray-400">
                          Cargando...
                        </div>
                      ) : catError ? (
                        <div className="px-4 py-2 text-sm text-red-400">
                          Error al cargar
                        </div>
                      ) : Array.isArray(categorias) && categorias.length > 0 ? (
                        categorias.map((cat) => (
                          <MenuItem
                            key={cat.id}
                            as={Link}
                            to={`/categorias/${cat.id}`}
                            className="block px-4 py-2 text-sm text-gray-200 data-focus:bg-gray-700"
                          >
                            {cat.title}
                          </MenuItem>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-sm text-gray-400">
                          No hay categorías disponibles
                        </div>
                      )}
                      <MenuItem
                        as={Link}
                        to="/categorias"
                        className="block px-4 py-2 text-sm text-gray-200 font-semibold data-focus:bg-gray-700 border-t border-gray-600"
                      >
                        Ver todas las categorías
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 relative overflow-visible">
              {/*Barra de busqueda, se muestra solo en modo desktop*/}
              <div className="hidden md:block">
                <SearchBar value={searchInput} onChange={setSearchInput} />
              </div>

              {/* Carrito */}
              <div
                className="relative cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
              >
                <ShoppingCartIcon className="h-6 w-6 text-gray-300 hover:text-white transition" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full px-[5px]">
                  {getCartQuantity()}
                </span>
              </div>

              {/* Menú usuario */}
              <Menu as="div" className="relative">
                <div className="cursor-pointer flex items-center justify-center rounded-full hover:ring-2 hover:ring-white transition">
                  <Menu.Button as="div">
                      <div className="relative w-10 h-10 overflow-hidden bg-neutral-secondary-medium rounded-full">
                          <svg className="absolute w-12 h-12 text-body-subtle -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                      </div>
                  </Menu.Button>
                </div>

                {/* Dropdown */}
                <MenuItems
                  transition
                  className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-[#2a2d31] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {logged ? (
                      <MenuItem
                        as="button"
                        onClick={activarLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 data-focus:bg-gray-700"
                      >
                        Cerrar sesión
                      </MenuItem>
                    ) : (
                      <MenuItem
                        as={Link}
                        to="/login"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-200 data-focus:bg-gray-700"
                      >
                        Iniciar sesión
                      </MenuItem>
                      )}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        <DisclosurePanel className="sm:hidden border-t border-gray-700">
          <div className="space-y-1 px-2 pt-2 pb-3 bg-[#1b1d1f]">
            {navigationLogueado.map((item) => (
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
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton className="w-full text-left text-white hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium">
                  Categorías
                  <span className="float-right">{open ? "▲" : "▼"}</span>
                </DisclosureButton>
                <DisclosurePanel className="pl-4">
                  {catLoading ? (
                    <div className="px-3 py-2 text-sm text-gray-400">
                      Cargando categorías...
                    </div>
                  ) : catError ? (
                    <div className="px-3 py-2 text-sm text-red-400">
                      Error al cargar categorías
                    </div>
                  ) : Array.isArray(categorias) && categorias.length > 0 ? (
                    <>
                      {categorias.map((cat) => (
                        <DisclosureButton
                          key={cat.id}
                          as={Link}
                          to={`/categorias/${cat.id}`}
                          className="text-white hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-normal"
                        >
                          {cat.title}
                        </DisclosureButton>
                      ))}
                      <DisclosureButton
                        as={Link}
                        to="/categorias"
                        className="text-white hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-semibold border-t border-gray-600 mt-2"
                      >
                        Ver todas las categorías
                      </DisclosureButton>
                    </>
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-400">
                      No hay categorías disponibles
                    </div>
                  )}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </DisclosurePanel>
        {/* SearchBar móvil */}
        <div className="block md:hidden px-4 pb-3">
          <SearchBar value={searchInput} onChange={setSearchInput} />
        </div>
      </Disclosure>
      {searchInput && (
            <ResultadosBusqueda 
                searchResults={searchResults}
            />
      )}

      <CartModal open={open} setOpen={setOpen} />
    </>
  );
}
