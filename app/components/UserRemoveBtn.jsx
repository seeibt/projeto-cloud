'use client'
import { HiOutlineTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"

export default function RemoveBtn({ id }) {

    const router = useRouter();

    const removeUser = async () => {
        const confirmed = confirm("Tem certeza que deseja remover este usuário?")

        if(confirm){
            const res = await fetch(`/api/users?id=${id}`, {
                method: 'DELETE',
            })
            if(res.ok){
                router.refresh();
            }
        }
    } 

    return (
        <button onClick={removeUser} id={id} className="btn btn-danger text-red-400">
            <HiOutlineTrash size={24} />
        </button>
    )
}