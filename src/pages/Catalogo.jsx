import { useState } from "react";
import { ProductList } from "../components/ProductList";

export const Catalogo = ({ apiUrl, apiToken }) => {
  const [searchInput, setSearchInput] = useState('');

  return (
   <div className="p-4 bg-gray-800 flex flex-col w-full min-h-screen overflow-x-hidden items-center my-8">
      <ProductList apiUrl={apiUrl} apiToken={apiToken} searchInput={searchInput} />
   </div>
  );
};
