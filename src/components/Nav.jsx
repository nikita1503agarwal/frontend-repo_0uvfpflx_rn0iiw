import { useEffect, useState } from 'react'
import { Menu, ShieldCheck, User, Activity, Code2 } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [hits, setHits] = useState(0)

  useEffect(() => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    fetch(`${base}/stats`).then(r => r.json()).then(d => setHits(d.hits || 0)).catch(()=>{})
  }, [])

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 text-blue-100/80" onClick={()=>setOpen(v=>!v)}>
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 ring-2 ring-white/30" />
            <span className="font-bold text-white tracking-tight">Ternak Lele</span>
          </div>
        </div>
        <nav className={`absolute lg:static left-0 right-0 top-16 lg:top-auto bg-slate-900/90 lg:bg-transparent ${open?'block':'hidden'} lg:block`}>
          <ul className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 p-4 lg:p-0">
            <li className="text-blue-100/80 hover:text-white transition">Overview</li>
            <li className="text-blue-100/80 hover:text-white transition">Playground</li>
            <li className="text-blue-100/80 hover:text-white transition">Blog</li>
            <li className="text-blue-100/80 hover:text-white transition flex items-center gap-2"><Activity size={16}/>Hits: <span className="font-mono">{hits}</span></li>
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <button className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-white ring-1 ring-white/20 hidden md:flex items-center gap-1"><ShieldCheck size={16}/>API Docs</button>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-blue-500 text-white hidden md:flex items-center gap-1"><User size={16}/>Sign in</button>
        </div>
      </div>
    </header>
  )
}
