import ToolDeposit from '../../components/ToolDeposit'

const getToolsById = async (id) => {
    const apiUrl = process.env.API_URL

    try{
        const res = await fetch(`${apiUrl}/api/tools/${id}`, {
            cache: 'no-store',
        })

        if(!res.ok){
            throw new Error('Failed to fetch tools')
        }

        return res.json()
    } catch(err){
        console.log(err)
    }
}

export default async function EditarFerramenta({ params }){
    const { id } = params

    const { tools } = await getToolsById(id)
    const { nome, posicao } = tools

    return(
        <ToolDeposit id={id} nome={nome} posicao={posicao} />
    )
}