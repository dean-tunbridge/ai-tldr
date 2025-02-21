import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'


const options = {
  method: 'GET',
  url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
  qs: {
    url: 'https://time.com/6266679/musk-ai-open-letter/',
    lang: 'en',
    engine: '2'
  },
  headers: {
    'x-rapidapi-key': '6415556743msh75bb24354eb7f24p12da11jsnff5d676164e3',
    'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
  }
};

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  })
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) => 'test',
    }),
  }),
})
