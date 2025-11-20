import { useEffect, useState } from 'react'

const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Blog() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`${base}/blog`).then(r=>r.json()).then(setPosts).catch(()=>{})
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <h2 className="text-2xl font-bold text-white mb-4">Latest Posts</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(p => (
          <article key={p.id} className="p-4 rounded-2xl bg-white/5 ring-1 ring-white/10">
            <h3 className="text-white font-semibold">{p.title}</h3>
            <p className="text-sm text-blue-100/80 line-clamp-3 mt-1">{p.content}</p>
            <div className="mt-3 text-xs text-blue-200/70">by {p.author}</div>
          </article>
        ))}
        {posts.length === 0 && (
          <div className="col-span-full text-blue-200/70">No posts yet. Sign in and create one via API.</div>
        )}
      </div>
    </section>
  )
}
