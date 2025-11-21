function BotonLargo ({textoBoton,funcionClick}){



//El stop navigation es para que no navegue si hacen click por ejemplo en el listado
return (<div>
    <button
        className="flex-1 cursor-pointer px-3 py-2 md:px-9 md:py-3 bg-green-700 text-white hover:bg-green-900 transition rounded-lg font-bold"
        onClick={e => {
        e.preventDefault();
        e.stopPropagation();
         if (funcionClick) funcionClick();
        }}
    >
       {textoBoton}
    </button>


</div>);
}

export default BotonLargo;