const getLogs = async () => {
    const apiUrl = process.env.API_URL

    try{
        const res = await fetch(`${apiUrl}/api/logs`, {
            cache: 'no-store',
        })

        if(!res.ok){
            throw new Error('Failed to fetch logs')
        }

        return res.json()

    } catch(err){
        console.log(err)
    }
}


export default async function ListLogs(){

    let logs = await getLogs()

    console.log(logs)

    const logComponent = logs.map((log) => {
        const ferramenta = JSON.parse(log.ferramenta)
        const usuario = JSON.parse(log.usuario)

        console.log(log.usuario)

        return(
            <div key={log._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5">
                <div>
                    <div className="">
                        <b>{ferramenta.nome}</b> {log.tipoOperacao} em: <span>{log.dataOperacao} da posição {ferramenta.posicao}</span> por <b> {usuario.nome} </b>
                    </div>
                </div>
            </div>
        )
    })

    return(
        <div>
            {logComponent}
        </div>
    )
}