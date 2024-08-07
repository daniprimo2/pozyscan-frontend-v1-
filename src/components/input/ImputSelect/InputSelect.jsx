import './main.sass'
import { useState } from "react";


function InputSelect({placeholder, listaOpcoes, dado, setDado}) {
    const [selectedOption, setSelectedOption] = useState(dado);

    

    const handleChange = (event) => {
      setSelectedOption(event.target.value);
      setDado(selectedOption);
    };
    
  return (
    <div className='campo-select'>
        <select value={selectedOption} onChange={handleChange}>
            <option value={""} disabled>{placeholder}</option>
            <option value={""}>Selecione uma Categoria</option>

            {listaOpcoes.map((item, index) => (
                <option value={item.value} key={index}>{item.nome}</option>
            ))}
        </select>
    </div>
  )
}

export default InputSelect