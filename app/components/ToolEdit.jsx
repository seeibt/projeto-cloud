'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EditarFerramenta({ id, nome, posicao }){

    const [newNome, setNewNome] = useState(nome)
    const [newPosicao, setNewPosicao] = useState(posicao)
    const Router = useRouter();

    const cors = require("cors")
    app.use(cors());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = process.env.API_URL


        try {
            const res = await fetch(`${apiUrl}/api/tools/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newNome, newPosicao })
                })

                console.log(res)

                if(res.ok){
                    alert("Ferramenta editada com sucesso!");
                    Router.push("/listar-ferramentas");
                    Router.refresh();
                    return;
                }else{
                    throw new Error("Não foi possível editar a ferramenta!");
                }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={e => setNewNome(e.target.value)} value={newNome} className="border border-slate-500 px-8 py-2" type="text" placeholder="Nome" />
            <input onChange={e => setNewPosicao(e.target.value)} value={newPosicao} className="border border-slate-500 px-8 py-2" type="text" placeholder="Posição" />

            <button type="submit" className="bg-slate-800 text-white font-bold px-8 py-2">Editar</button>
        </form>
    )
}