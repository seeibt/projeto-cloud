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
          {tools.length === 0 ? (
            <div className="text-red-500 font-semibold">Nenhuma ferramenta cadastrada.</div>
          ) : (
            tools.map((tool) => (
              <div key={tool._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5">
                <div>
                  <h1 className="font-bold text-2xl">{tool.nome}</h1>
                  <div className="">
                    {tool.posicao} Data: {tool.dataOperacao}
                  </div>
                </div>
      
                <div className="flex gap-2 items-center">
                  <RemoveBtn id={tool._id} />
                    <Link href={`/editar-ferramenta/${tool._id}`}>
                        <HiPencilAlt size={24} />
                    </Link>
                    <Link alt="Retirar Ferramenta" href={`/retirar-ferramenta/${tool._id}`}>
                        <HiArrowNarrowUp size={24} />
                    </Link>
                    <Link alt="Devolver Ferramenta" href={`/devolver-ferramenta/${tool._id}`}>
                        <HiArrowNarrowDown size={24} />
                    </Link>
                </div>
              </div>
            ))
          )}
        </>
      );
}