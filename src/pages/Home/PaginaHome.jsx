import { useEffect, useState } from "react"
import Layout from "../../components/Layout/Layout"
import PaginaEmDesenvolvimento from "../EmDesenvolvimento/PaginaEmDesenvolvimento"
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

function PaginaHome() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, [])

  return (
    <Layout>
      <PaginaEmDesenvolvimento />
    </Layout>
  )
}

export default PaginaHome

/*

      {loading ? (<LoadingSpinner mensagem={"Carregando pagina home"}/>):(<PaginaEmDesenvolvimento />)}

*/