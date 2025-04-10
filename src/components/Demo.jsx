import { useState, useEffect } from 'react'
import { copy, linkIcon, tick, bin } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article'
import Loader from './Loader'

function Demo() {
  const [article, setArticle] = useState({ url: '', summary: '' })
  const [allArticles, setAllArticles] = useState([])
  const [copied, setCopied] = useState('')

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

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
    setArticle({ url: '', summary: data.summary })
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false), 1000)
  }

  const handleDelete = (deleteUrl) => {
    const updatedAllArticles = allArticles.filter(
      (item) => item.url !== deleteUrl
    )
    setAllArticles(updatedAllArticles)
    localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
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
              <div
                className={`${copied === item.url ? 'tick_btn' : 'copy_btn'}`}
                onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 text-blue-700 font-medium text-small truncate">
                {item.url}
              </p>

              <div
                onClick={() => handleDelete(item.url)}
                className="delete_btn">
                <img
                  src={bin}
                  alt="delete_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <Loader />
        ) : error ? (
          <p className=" font-bold text-black text-center">
            Well, that wasn&apos;t supposed to happen...
            <br />
            <span className=" font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3 text-center ">
              <h2 className=" font-bold text-gray-600 text-3xl">
                Article <span className="purple_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className=" font-medium text-sm text-white">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo
