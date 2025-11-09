

function Boton ({textoBoton,funcionClick}){



//El stop navigation es para que no navegue si hacen click por ejemplo en el listado
return (<div>
    <button
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
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

export default Boton;