import { Link } from 'react-router-dom'
import { Fish } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Fish size={56} className="text-verde-claro" />
      <h1 className="mt-4 text-2xl font-extrabold text-texto-principal">Página não encontrada</h1>
      <p className="mt-1 text-sm text-texto-secundario">O conteúdo que você procura não existe ou ainda está em construção.</p>
      <Link to="/" className="mt-5 rounded-lg bg-verde-escuro px-4 py-2 text-sm font-semibold text-white hover:bg-verde-positivo">
        Voltar ao Dashboard
      </Link>
    </div>
  )
}
