'use client'

import Link from "next/link";
import { useState } from 'react'; 


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    return (
      <nav className="bg-white p-4 md:p-8 shadow-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link className="text-white font-bold text-lg" href={"/"}>
                <img className="h-20" src="https://cdn.discordapp.com/attachments/923992628658323467/1147220671525568612/AUTO_PECAS22.png" alt="Logo" />
            </Link>
          </div>
  
          {/* Menu Sanduíche para Dispositivos Móveis */}
          <div className="md:hidden relative">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                )}
              </svg>
            </button>
  
            {isMenuOpen && (
              <div className="absolute top-12 right-0 mt-2 bg-white shadow-lg rounded-lg py-2 space-y-2">
                <Link
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                  href={"/add-user"}
                  onClick={toggleMenu}
                >
                  Adicionar Usuário
                </Link>
                <Link
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                  href={"/add-tools"}
                  onClick={toggleMenu}
                >
                  Adicionar Ferramenta
                </Link>
                <Link 
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                    href={"/listar-usuarios"}
                    onClick={toggleMenu}
                >
                    Listar Usuários
                </Link>
                <Link
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                    href={"/listar-ferramentas"}
                    onClick={toggleMenu}
                >
                    Listar Ferramentas
                </Link>
                <Link
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
                    href={"/listar-logs"}
                    onClick={toggleMenu}
                >
                    Listar Logs
                </Link>
              </div>
            )}
          </div>
  
          {/* Menu de Navegação para Telas Maioress */}
          <div className="hidden md:flex space-x-4">
            <Link className="text-black hover:text-gray-300" href={"/add-user"}>Adicionar Usuário</Link>
            <Link className="text-black hover:text-gray-300" href={"/add-tools"}>Adicionar Ferramenta</Link>
            <Link className="text-black hover:text-gray-300" href={"/listar-usuarios"}>Listar Usuários</Link>
            <Link className="text-black hover:text-gray-300" href={"/listar-ferramentas"}>Listar Ferramentas</Link>
            <Link className="text-black hover:text-gray-300" href={"/listar-logs"}>Listar Logs</Link>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;