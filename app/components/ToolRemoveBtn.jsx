'use client'
import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"


export default function RemoveBtn({ id }) {

    const router = useRouter();
    const apiUrl = process.env.API_URL

    const removeTools = async () => {
        const confirmed = confirm("Tem certeza que deseja remover esta ferramenta?")

        if(confirmed){
            const res = await fetch(`https://main--incomparable-cobbler-553924.netlify.app/api/tools?id=${id}`, {
                method: 'DELETE',
            },)
            if(res.ok){
                router.refresh();
            }
        }
    } 

    return (
        <button onClick={removeTools} id={id} className="btn btn-danger text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    )
}