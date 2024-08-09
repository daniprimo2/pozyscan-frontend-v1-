import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "../pages/Login/Login"
import PaginaHome from "../pages/Home/PaginaHome"
import NovoUsuario from "../pages/NovoUsuario/NovoUsuario"
import NovaFilial from "../pages/novaFilial/NovaFilial"
import NovaAplicacao from "../pages/NovaAplicacao/NovaAplicacao"
import NovoFornecedor from "../pages/NovoFornecedor/NovoFornecedor"
import BuscarFornecedor from "../pages/PaginaBuscaFornecedor/BuscarFornecedor"

function Rotas() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/home" element={<PaginaHome />}/>
                <Route path="/novoUsuario" element={<NovoUsuario />}/>
                <Route path="/novaFilial" element={<NovaFilial />}/>
                <Route path="/novaAplicacao" element={<NovaAplicacao />}/>
                <Route path="/novoFornecedor" element={<NovoFornecedor />}/>
                <Route path="/buscarNovoFornecedor" element={<BuscarFornecedor />}/>
            </Routes>
        </Router>
    </>
  )
}

export default Rotas