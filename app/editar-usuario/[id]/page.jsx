import EditarUsuarioForm from '../../components/UserEdit'

const getUserById = async (id) => {
    const apiUrl = process.env.API_URL

    try{
        const res = await fetch(`${apiUrl}/api/users/${id}`, {
            cache: 'no-store',
        })

        if(!res.ok){
            throw new Error('Failed to fetch users')
        }

        return res.json()
    } catch(err){
        console.log(err)
    }
}

export default async function EditarUsuario({ params }){
    const { id } = params

    const { user } = await getUserById(id)
    const { nome, funcao, codigo } = user

    return(
        <EditarUsuarioForm id={id} nome={nome} funcao={funcao} codigo={codigo} />
    )
}