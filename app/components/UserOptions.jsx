import Link from "next/link";

export default function UserOptions() {
    return(
        <>
            <div className="text-center">
                <h1 className="text-4xl font-semibold mb-8">Tela Principal</h1>
                <div className="space-y-4">
                    <div className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                        <Link href="/listar-ferramentas">
                            Ferramentas
                        </Link>
                    </div>
                    <div className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                        <Link href="/listar-usuarios">
                            Usuários
                        </Link>
                    </div>
                    <div className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
                        <Link href="/listar-logs">
                            Logs
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}