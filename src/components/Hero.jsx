function Hero() {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3"></nav>

      <h1 className="head_text">
        TL;DR using <br className="max-md:hidden" />
        <span className="purple_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="description">
        Paste the URL of an article, blog, or wikipedia page and get a summary
        in seconds.
        <br />
      </h2>
    </header>
  )
}

export default Hero
