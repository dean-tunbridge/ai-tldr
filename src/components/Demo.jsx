import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'

function Demo() {
  const [article, setArticle] = useState({ url: '', summary: '' })
  const [allArticles, setAllArticles] = useState([])

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { data } = await getSummary({ articleUrl: article.url })

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updatedAllArticles = [newArticle, ...allArticles]

      setArticle(newArticle)
      setAllArticles(updatedAllArticles)

      console.log(newArticle)

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }

  return (
    <section className="'mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}>
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="enter a URL"
            value={article.url}
            onChange={(event) =>
              setArticle({ ...article, url: event.target.value })
            }
            className="url_input peer"
            required
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
            ↵
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card">
              <div className="copy_btn">
                <img
                  src={copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p>{item.url}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Demo
