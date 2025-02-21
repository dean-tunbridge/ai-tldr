import { logo } from '../assets'

function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz-logo" className="w-28 object-contain" />
      </nav>

      <h1 className="head_text">
        Summarise Articles with <br />
        <span>OpenAI GPT-4</span>
      </h1>
    </header>
  )
}

export default Hero
