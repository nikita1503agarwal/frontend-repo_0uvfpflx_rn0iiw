import Nav from './components/Nav'
import Hero from './components/Hero'
import Tools from './components/Tools'
import Blog from './components/Blog'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-blue-50">
      <Nav />
      <Hero />
      <Tools />
      <Blog />
      <footer className="border-t border-white/10 py-10 text-center text-blue-200/70">
        Built for creators • Secure auth • Powerful tools • Total hits live
      </footer>
    </div>
  )
}

export default App
