import Link from "next/link"
import RemoveBtn from "../components/ToolRemoveBtn.jsx"
import { HiPencilAlt, HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi'

const getTools = async () => {
    const apiUrl = process.env.API_URL

    try{     
        const toolsRes = await fetch(`${apiUrl}/api/tools`, {
          cache: 'no-store',
        });

        if (!toolsRes.ok) {
          throw new Error('Failed to fetch tools');
        }

        const tools = await toolsRes.json();

        // Realize uma segunda solicitação para obter os logs
        const logsRes = await fetch(`${apiUrl}/api/logs`, {
          cache: 'no-store',
        });

        if (!logsRes.ok) {
          throw new Error('Failed to fetch logs');
        }

        const logs = await logsRes.json();

        // Agora você pode verificar se cada ferramenta está no painel com base nos dados dos logs
        const toolsWithStatus = tools.map(tool => {
          return {
              ...tool,
              ...logs.find(log => log.ferramenta._id === tool._id)
          };
        });

        console.log(toolsWithStatus)

        return toolsWithStatus;

    } catch(err){
        console.log(err)
    }
}


export default async function ListTools(){

    let tools = await getTools()

    if(!tools){
        return <div className="text-red-500 font-semibold">Nenhuma ferramenta cadastrada.</div>
    }

    return (
        <>
          {tools && tools.length > 0 ? (
             tools.map((tool) => (
              <div key={tool._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5">
                <div>
                  <h1 className="font-bold text-2xl">{tool.nome}</h1>
                  <div className="">
                    {tool.posicao} Data: {tool.dataOperacao} {tool.tipoOperacao == 'Devolução' || !tool.tipoOperacao ? <span className="text-green-500"> - Disponível</span> : <span className="text-red-500"> - Indisponível</span>}
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
          ) : (
            <div className="text-red-500 font-semibold">Nenhuma ferramenta cadastrada!</div>
          )}
        </>
      );
}