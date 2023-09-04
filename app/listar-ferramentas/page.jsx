import Link from "next/link"
import RemoveBtn from "../components/ToolRemoveBtn.jsx"
import { HiPencilAlt, HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi'

const getTools = async () => {
    const apiUrl = process.env.API_URL

    try{
        const res = await fetch(`${apiUrl}/api/tools`, {
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


export default async function ListTools(){

    let tools = await getTools()

    return (
        <>
          
        </>
      );
}