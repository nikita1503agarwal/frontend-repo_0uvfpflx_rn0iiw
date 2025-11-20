import { useState } from 'react'

const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Section({ title, children }) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 ring-1 ring-white/10">
      <h3 className="text-blue-100 font-semibold mb-3">{title}</h3>
      {children}
    </div>
  )
}

export default function Tools() {
  const [input, setInput] = useState('Hello Lele')
  const [hashes, setHashes] = useState({})
  const [encoding, setEncoding] = useState({})
  const [yt, setYt] = useState({ url: '', data: null, error: null })

  const run = async (path, body) => {
    const r = await fetch(`${base}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!r.ok) throw new Error('Request failed')
    return r.json()
  }

  const handleHashes = async () => {
    try {
      const [md5, sha256, bcr, arg] = await Promise.all([
        run('/hash/md5', { text: input }),
        run('/hash/sha256', { text: input }),
        run('/hash/bcrypt', { text: input }),
        run('/hash/argon2', { text: input }),
      ])
      setHashes({ md5: md5.hash, sha256: sha256.hash, bcrypt: bcr.hash, argon2: arg.hash })
    } catch (e) {
      console.error(e)
    }
  }

  const handleEncode = async () => {
    try {
      const [hex, b64] = await Promise.all([
        run('/encode/hex', { text: input }),
        run('/encode/base64', { text: input }),
      ])
      setEncoding({ hex: hex.result, base64: b64.result })
    } catch (e) {
      console.error(e)
    }
  }

  const handleDecodeHex = async (val) => {
    try {
      const r = await fetch(`${base}/decode/hex`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: val }) })
      const j = await r.json()
      setEncoding((s)=>({ ...s, hex_decoded: j.result }))
    } catch (e) { console.error(e) }
  }

  const handleDecodeB64 = async (val) => {
    try {
      const r = await fetch(`${base}/decode/base64`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ data: val }) })
      const j = await r.json()
      setEncoding((s)=>({ ...s, base64_decoded: j.result }))
    } catch (e) { console.error(e) }
  }

  const handleYt = async () => {
    try {
      const u = yt.url.trim()
      const r = await fetch(`${base}/yt/info?url=${encodeURIComponent(u)}`)
      const j = await r.json()
      setYt({ url: u, data: j, error: null })
    } catch (e) {
      setYt({ url: yt.url, data: null, error: 'Failed to fetch info' })
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16 space-y-6">
      <Section title="Crypto & Encoding Toolkit">
        <div className="flex flex-col md:flex-row gap-3">
          <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-slate-900/60 text-white ring-1 ring-white/10" placeholder="Type text" />
          <button onClick={handleHashes} className="px-4 py-2 rounded-lg bg-blue-500 text-white">Run Hashes</button>
          <button onClick={handleEncode} className="px-4 py-2 rounded-lg bg-white/10 text-white ring-1 ring-white/20">Encode</button>
        </div>
        <div className="grid md:grid-cols-2 gap-3 mt-4 text-xs text-blue-100 font-mono">
          <div className="p-3 rounded-lg bg-black/30">MD5: {hashes.md5 || '-'}</div>
          <div className="p-3 rounded-lg bg-black/30">SHA256: {hashes.sha256 || '-'}</div>
          <div className="p-3 rounded-lg bg-black/30">Bcrypt: <span className="break-all">{hashes.bcrypt || '-'}</span></div>
          <div className="p-3 rounded-lg bg-black/30">Argon2: <span className="break-all">{hashes.argon2 || '-'}</span></div>
          <div className="p-3 rounded-lg bg-black/30">Hex: {encoding.hex || '-'}</div>
          <div className="p-3 rounded-lg bg-black/30">Base64: {encoding.base64 || '-'}</div>
          <div className="p-3 rounded-lg bg-black/30">Hex → Text: {encoding.hex_decoded || '-'}</div>
          <div className="p-3 rounded-lg bg-black/30">Base64 → Text: {encoding.base64_decoded || '-'}</div>
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={()=>handleDecodeHex(encoding.hex || '')} className="text-xs px-3 py-1.5 rounded bg-white/10 text-white">Decode Hex</button>
          <button onClick={()=>handleDecodeB64(encoding.base64 || '')} className="text-xs px-3 py-1.5 rounded bg-white/10 text-white">Decode Base64</button>
        </div>
      </Section>

      <Section title="YouTube Helper (ytmp3 / ytmp4)">
        <div className="flex flex-col md:flex-row gap-3">
          <input value={yt.url} onChange={e=>setYt({...yt, url: e.target.value})} className="flex-1 px-3 py-2 rounded-lg bg-slate-900/60 text-white ring-1 ring-white/10" placeholder="Paste YouTube URL" />
          <button onClick={handleYt} className="px-4 py-2 rounded-lg bg-blue-500 text-white">Get Links</button>
        </div>
        {yt.error && <p className="text-red-300 text-sm mt-2">{yt.error}</p>}
        {yt.data && (
          <div className="mt-4 p-4 rounded-2xl bg-black/30 text-blue-100">
            <div className="flex items-start gap-3">
              {yt.data.thumbnail && <img src={yt.data.thumbnail} className="w-24 h-16 object-cover rounded-lg" />}
              <div>
                <p className="font-semibold">{yt.data.title}</p>
                <p className="text-xs opacity-70">{yt.data.uploader}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              {yt.data.audio_url && <a className="text-xs px-3 py-1.5 rounded bg-white/10 ring-1 ring-white/20" href={yt.data.audio_url} target="_blank">Download MP3</a>}
              {yt.data.video_url && <a className="text-xs px-3 py-1.5 rounded bg-white/10 ring-1 ring-white/20" href={yt.data.video_url} target="_blank">Download MP4</a>}
            </div>
          </div>
        )}
      </Section>
    </section>
  )
}
