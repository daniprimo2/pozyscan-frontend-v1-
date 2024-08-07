import './main.sass'
import Campo from "../campoMenu/Campo";
import CampoSimples from '../CampoMenuSimples/Campo';

function MenuLateral({mostra, mostraSubMenu, setMostraSubMenu, nomeMenu}) {
 
    const menuAdministracao = [
        {path: "/novoUsuario", label: "Novo Usuario"},
        {path: "/novaFilial", label: "Nova Filial"}
    ];

    const menuFornecedor = [
        {path: "/home", label: "Novo Fornecedor"},
        {path: "/home", label: "Buscar Fornecedor"},
        {path: "/home", label: "Deletar Fornecedor"}
    ];

    const menuCategoria = [
        {path: "/home", label: "Nova categoria"},
        {path: "/home", label: "Buscar categoria"},
        {path: "/home", label: "Deletar categoria"}
    ];

    const menuVeiculo = [
        {path: "/home", label: "Novo Veiculo"},
        {path: "/home", label: "Buscar Veiculos"},
        {path: "/home", label: "Deletar Veiculo"}
    ];

    const menuGerenciador = [
        {path: "/home", label: "Novo Lancamento"},
        {path: "/home", label: "Buscar Lancamento"},
        {path: "/home", label: "Gerenciar Nota Fiscal"}
    ];



    return (
    <div className={mostra ? "active" : "sidenav"}>
        <h1 id="logo">POZYSCAN</h1>

        <CampoSimples nomeMenu={"Home"} />
        <Campo nomeMenu={"Gerenciador"} listaSubMenus={menuGerenciador}/>
        <Campo nomeMenu={"Administracao"} listaSubMenus={menuAdministracao}/>
        <Campo nomeMenu={"Fornecedor"} listaSubMenus={menuFornecedor}/>
        <Campo nomeMenu={"Categoria"} listaSubMenus={menuCategoria}/>
        <Campo nomeMenu={"Veiculo"} listaSubMenus={menuVeiculo}/>

        
    </div>
  )
}

export default MenuLateral