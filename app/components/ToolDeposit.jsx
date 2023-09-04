'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DevolverFerramenta({ id, nome, posicao }){

    const [codigoUsuario, setCodigoUsuario] = useState('')
    const Router = useRouter();
    const tipoOperacao = 'Devolução'

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/tools/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, posicao, tipoOperacao, codigoUsuario })
                })

                if(res.ok){
                    alert("Ferramenta devolvida com sucesso!");
                    Router.push("/listar-logs");
                    Router.refresh();
                    return;
                }else{
                    throw new Error("Não foi possível devolver a ferramenta!");
                }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div key={id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5">
                <div>
                  <h1 className="font-bold text-2xl">{nome}</h1>
                    <p className="text-lg">{posicao}</p> 
                </div>
            </div>
            <input onChange={e => setCodigoUsuario(e.target.value)} value={codigoUsuario} className="border border-slate-500 px-8 py-2" type="text" placeholder="Código Usuário" />
            
            <button type="submit" className="bg-slate-800 text-white font-bold px-8 py-2">Devolver</button>
        </form>
    )
}