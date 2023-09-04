'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ToolsAdd() {
    const [nome, setNome] = useState("");
    const [posicao, setPosicao] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!nome || !posicao) return alert("Preencha todos os campos!");

        try {
            const res = await fetch ('/api/tools', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, posicao })
                })

                if(res.ok){
                    alert("Ferramenta adicionada com sucesso!");
                    router.push("/listar-ferramentas");
                    return;
                }else{
                    throw new Error("Não foi possível adicionar a ferramenta!");
                }

        } catch (error) {
            console.log(error);
        }
    }

    return (
       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={(e) => setNome(e.target.value)} value={nome} className="border border-slate-500 px-8 py-2" type="text" placeholder="Nome" />
            <input onChange={(e) => setPosicao(e.target.value)} value={posicao} className="border border-slate-500 px-8 py-2" type="text" placeholder="Posição" />

            <button type="submit" className="bg-slate-800 text-white font-bold px-8 py-2">Adicionar</button>
       </form>
    )
}