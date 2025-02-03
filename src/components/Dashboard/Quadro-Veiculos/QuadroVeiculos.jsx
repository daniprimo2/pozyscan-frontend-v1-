import React from 'react'
import { RxBorderDashed } from "react-icons/rx";

import './main.sass'


function QuadroVeiculos({titulo, total, propria, agregado, descricao, icone, cor}) {
  return (
    <div className="quadro-apresentacao" style={{backgroundColor: cor}}>
        <div className="titulo-icone">
          <p className="titulo">{titulo}</p>
          {icone ? React.cloneElement(icone, {className: 'icone'}) : <RxBorderDashed className='icone'/>}
        </div>
        <div className="quadro-valor-veiculo">
            <div className="primeiraMetade">
                <p className="total">Total: <span>{total}</span></p>
                <p className="descricao">{descricao}</p>
            </div>
            <div className='primeiraMetade'>
                <p className="total propria">Frota Própria: <span>{propria}</span></p>
                <p className="total agregado">Frota Agregada: <span>{agregado}</span></p>
            </div>
        </div>
      </div>
  )
}

export default QuadroVeiculos