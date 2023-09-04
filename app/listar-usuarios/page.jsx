import Link from "next/link"
import RemoveBtn from "../components/UserRemoveBtn.jsx"
import { HiPencilAlt } from 'react-icons/hi'

const getUsers = async () => {
    const apiUrl = process.env.API_URL

    try{
        const res = await fetch(`${apiUrl}/api/users`, {
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


export default async function ListUsers(){

    let users = await getUsers()

    return(
        <>
            {users.map((user) => (
                <div key={user._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5">
                    <div>
                        <h1 className="font-bold text-2xl"> {user.codigo} - {user.nome} </h1>
                        <div className="">{user.funcao}</div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <RemoveBtn id={user._id}/>
                        <Link href={`/editar-usuario/${user._id}`}>
                            <HiPencilAlt size={24} />
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
}