import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Login from "../pages/Login/Login"
import PaginaHome from "../pages/Home/PaginaHome"
import NovoUsuario from "../pages/NovoUsuario/NovoUsuario"

function Rotas() {
  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/home" element={<PaginaHome />}/>
                <Route path="/novoUsuario" element={<NovoUsuario />}/>
            </Routes>
        </Router>
    </>
  )
}

export default Rotas