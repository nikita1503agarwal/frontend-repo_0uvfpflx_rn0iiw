import { useEffect, useMemo, useState } from 'react'

const BE = import.meta.env.VITE_BACKEND_URL

export default function AuthBlog() {
  const [token, setToken] = useState(localStorage.getItem('tk') || '')
  const [me, setMe] = useState(null)

  const authed = useMemo(() => !!token, [token])

  useEffect(() => {
    if (!token) return
    fetch(`${BE}/me`, { headers: { Authorization: `Bearer ${token}` }})
      .then(r=>r.json()).then(setMe).catch(()=>{})
  }, [token])

  async function register(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const body = {
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
      hash_scheme: form.get('scheme'),
    }
    const r = await fetch(`${BE}/auth/register`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
    const j = await r.json(); if (j.access_token) { localStorage.setItem('tk', j.access_token); setToken(j.access_token) }
  }

  async function login(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const body = { email: form.get('email'), password: form.get('password') }
    const r = await fetch(`${BE}/auth/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) })
    const j = await r.json(); if (j.access_token) { localStorage.setItem('tk', j.access_token); setToken(j.access_token) }
  }

  async function createPost(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const body = { title: form.get('title'), content: form.get('content'), tags: (form.get('tags')||'').split(',').map(s=>s.trim()).filter(Boolean), status: 'published' }
    const r = await fetch(`${BE}/blog`, { method:'POST', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}, body: JSON.stringify(body) })
    const j = await r.json(); alert('Created: ' + (j.slug || JSON.stringify(j)))
  }

  return (
    <section id="auth" className="py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {!authed ? (
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/10">
            <h3 className="text-white font-semibold mb-4">Register</h3>
            <form onSubmit={register} className="space-y-3">
              <input name="name" required placeholder="Name" className="w-full px-3 py-2 rounded bg-slate-900 text-sky-200" />
              <input name="email" required placeholder="Email" type="email" className="w-full px-3 py-2 rounded bg-slate-900 text-sky-200" />
              <input name="password" required placeholder="Password" type="password" className="w-full px-3 py-2 rounded bg-slate-900 text-sky-200" />
              <select name="scheme" className="w-full px-3 py-2 rounded bg-slate-900 text-sky-200">
                <option value="bcrypt">bcrypt</option>
                <option value="argon2">argon2</option>
              </select>
              <button className="px-4 py-2 rounded bg-gradient-to-r from-sky-500 to-indigo-500 text-white">Create account</button>
            </form>

            <h3 className="text-white font-semibold mt-8 mb-3">Login</h3>
            <form onSubmit={login} className="space-y-3">
              <input name="email" required placeholder="Email" type="email" className="w-full px-3 py-2 rounded bg-slate-900 text-sky-200" />
              <input name="password" required placeholder="Password" type="password" className="w-full px-3 py-2 rounded bg-slate-900 text-sky-200" />
              <button className="px-4 py-2 rounded bg-gradient-to-r from-sky-500 to-indigo-500 text-white">Login</button>
            </form>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Welcome</h3>
              <button onClick={()=>{localStorage.removeItem('tk'); setToken(''); setMe(null)}} className="text-sky-300 underline">Logout</button>
            </div>
            {me ? (
              <div className="text-sky-200">
                <div className="text-white text-lg font-semibold">{me.name}</div>
                <div className="text-sm opacity-80">{me.email}</div>
                <div className="mt-2 text-xs opacity-70">User ID: {me._id}</div>
              </div>
            ) : (
              <div className="text-sky-200">Loading profile…</div>
            )}
          </div>
        )}

        <div id="blog" className="p-6 rounded-2xl bg-slate-800/50 border border-white/10">
          <h3 className="text-white font-semibold mb-4">Create Blog Post</h3>
          {authed ? (
            <form onSubmit={createPost} className="space-y-3">
              <input name="title" required placeholder="Title" className="w-full px-3 py-2 rounded bg-slate-900 text-sky-200" />
              <textarea name="content" required placeholder="Content" className="w-full h-28 px-3 py-2 rounded bg-slate-900 text-sky-200" />
              <input name="tags" placeholder="tags,comma,separated" className="w-full px-3 py-2 rounded bg-slate-900 text-sky-200" />
              <button className="px-4 py-2 rounded bg-gradient-to-r from-sky-500 to-indigo-500 text-white">Publish</button>
            </form>
          ) : (
            <div className="text-sky-200">Login to create a post.</div>
          )}
        </div>
      </div>
    </section>
  )
}
