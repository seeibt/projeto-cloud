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
            
        </>
    )
}