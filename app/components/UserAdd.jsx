'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserAdd() {
    const [nome, setNome] = useState("");
    const [funcao, setFuncao] = useState("");
    const [codigo, setCodigo] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!nome || !funcao || !codigo) return alert("Preencha todos os campos!");

        try {
            const res = await fetch ('https://main--incomparable-cobbler-553924.netlify.app/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ nome, funcao, codigo })
                })

                if(res.ok){
                    router.push("/listar-usuarios");
                    router.refresh();
                    alert("Usuário adicionado com sucesso!");
                    return;
                }else{
                    throw new Error("Não foi possível adicionar o usuário!");
                }

        } catch (error) {
            console.log(error);
        }
    }

    return (
       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={(e) => setNome(e.target.value)} value={nome} className="border border-slate-500 px-8 py-2" type="text" placeholder="Nome" />
            <input onChange={(e) => setFuncao(e.target.value)} value={funcao} className="border border-slate-500 px-8 py-2" type="text" placeholder="Função" />
            <input onChange={(e) => setCodigo(e.target.value)} value={codigo} className="border border-slate-500 px-8 py-2" type="text" placeholder="Código" />

            <button type="submit" className="bg-slate-800 text-white font-bold px-8 py-2">Adicionar</button>
       </form>
    )
}