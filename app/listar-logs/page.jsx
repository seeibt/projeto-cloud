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

    const logComponent = <></>

    return(
        <div>
            {logComponent}
        </div>
    )
}