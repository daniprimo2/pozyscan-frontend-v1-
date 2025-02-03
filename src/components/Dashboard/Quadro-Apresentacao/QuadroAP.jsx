import React from 'react'
import { RxBorderDashed } from "react-icons/rx";

import './main.sass'

function QuadroAP({titulo, valor, descricao, icone, cor}) {
  return (
    <div className="quadro-apresentacao" style={{backgroundColor: cor}}>
        <div className="titulo-icone">
          <p className="titulo">{titulo}</p>
          {icone ? React.cloneElement(icone, {className: 'icone'}) : <RxBorderDashed className='icone'/>}
        </div>
        <div className="quadro-valor">
          <p className="valor">R$ <span>{valor}</span></p>
          <p className="descricao">{descricao}</p>
        </div>
      </div>
    )
}

export default QuadroAP