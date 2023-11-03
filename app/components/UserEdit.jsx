'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function EditarUsuario({ id, nome, funcao, codigo }){

    const [newNome, setNewNome] = useState(nome)
    const [newFuncao, setNewFuncao] = useState(funcao)
    const [newCodigo, setNewCodigo] = useState(codigo)

    const Router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`https://main--incomparable-cobbler-553924.netlify.app/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newNome, newFuncao, newCodigo })
                })

                if(res.ok){
                    alert("Usuário editado com sucesso!");
                    Router.push("/listar-usuarios");
                    Router.refresh();
                    return;
                }else{
                    if(res.status == 509){
                        alert("Não foi possível editar o usuário! Código já existente");
                    }else{
                        throw new Error("Não foi possível editar o usuário!");
                    }
                }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input onChange={e => setNewNome(e.target.value)} value={newNome} className="border border-slate-500 px-8 py-2" type="text" placeholder="Nome" />
            <input onChange={e => setNewFuncao(e.target.value)} value={newFuncao} className="border border-slate-500 px-8 py-2" type="text" placeholder="Função" />
            <input onChange={e => setNewCodigo(e.target.value)} value={newCodigo} className="border border-slate-500 px-8 py-2" type="text" placeholder="Código" />
            
            <button type="submit" className="bg-slate-800 text-white font-bold px-8 py-2">Editar</button>
        </form>
    )
}