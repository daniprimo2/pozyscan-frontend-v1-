import './main.sass'
import { LuConstruction } from "react-icons/lu";
import { MdConstruction } from "react-icons/md";

function PaginaEmDesenvolvimento() {
  return (
    <div className='container'>
        <div className='em-desenvolvimento'>
            <LuConstruction />
            <div id='texto-dev'>Pagina em Desenvolvimento <MdConstruction /></div>
        </div>
    </div>
  )
}

export default PaginaEmDesenvolvimento