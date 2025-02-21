import { logo } from '../assets'

function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz-logo" className="w-28 object-contain" />
      </nav>

      <h1 className="head_text">
        Summarise Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading usign this open source article summariser that
        transforms lengthy articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero
