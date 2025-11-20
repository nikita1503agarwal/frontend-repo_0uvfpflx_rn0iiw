import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1000px_600px_at_80%_-100px,rgba(59,130,246,0.25),transparent)]" />
      <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-300">
            Ternak Lele
          </h1>
          <p className="mt-4 text-blue-200/90 text-lg max-w-xl">
            A clean, modern API playground with auth, blogging, crypto tools, and YouTube helpers — wrapped in a futuristic, web3-inspired interface.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-blue-100 ring-1 ring-white/20">Auth</span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-blue-100 ring-1 ring-white/20">Blog</span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-blue-100 ring-1 ring-white/20">YT MP3/MP4</span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-blue-100 ring-1 ring-white/20">MD5 · SHA256 · Bcrypt · Argon2</span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-blue-100 ring-1 ring-white/20">Base64 · Hex</span>
          </div>
        </div>
        <div className="h-[380px] md:h-[520px] rounded-3xl overflow-hidden ring-1 ring-white/10 bg-gradient-to-b from-blue-500/10 to-purple-500/10">
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" />
        </div>
      </div>
    </section>
  )
}
