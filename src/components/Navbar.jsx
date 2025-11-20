import { useEffect, useState } from 'react'
import { Menu, Shield, User, LogIn } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Navbar(){
  const [hits, setHits] = useState(0)

  useEffect(()=>{
    fetch(`${API}/stats`).then(r=>r.json()).then(d=> setHits(d.hits || 0)).catch(()=>{})
  },[])

  return (
    <nav className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500 grid place-items-center text-white font-bold">TL</div>
        <div className="text-white font-semibold tracking-tight">Ternak Lele</div>
        <span className="text-xs text-blue-300/70 ml-3">hits: {hits}</span>
      </div>
      <div className="flex items-center gap-2">
        <button className="px-3 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 border border-white/10">
          <User className="w-4 h-4 inline -mt-1 mr-1"/> Sign In
        </button>
        <button className="px-3 py-2 rounded-lg bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 border border-blue-400/30">
          <Shield className="w-4 h-4 inline -mt-1 mr-1"/> Dashboard
        </button>
      </div>
    </nav>
  )
}
