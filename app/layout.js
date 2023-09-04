import Navbar from './components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Auto Peças Müller',
  description: 'Projeto gerado para a disciplina de Prática Profissional',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Navbar />
        </div>
        <div className="max-w-3xl mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  )
}
