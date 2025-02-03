import { baseAutenticar } from "../api/base"


export const informacoesDashboard = () => {
    const url = '/dashboard'
    return baseAutenticar.get(url)
}