import React, { useState } from 'react'
import moment from 'moment'
import { Audio } from 'react-loader-spinner'

import { useGetCryptosQuery} from '../services/cryptoApi'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'


const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data, isFetching } = useGetCryptosQuery(100);

  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

  const { data: newsData, isFetching: newsIsFetching } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 10});

  if(isFetching || newsIsFetching) return <Audio heigth="100" width="100" color="grey" ariaLabel="loading" wrapperStyle={{marginLeft:'45%', marginTop:'20%'}} />

  return (
    <>
      {!simplified && (
        <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <select onChange={(e) => setNewsCategory(e.target.value)} filteroption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
            <option defaultValue>Cyptocurrency</option>
            {data?.data?.coins?.map((currency, i) => <option key={i} value={currency.name}>{currency.name}</option>)}
          </select>
        </div>
      </div>
      )}
    <div className="container mx-auto ">
        <div className="flex flex-wrap items-center">
        {newsData.value.map((news, i) => (
          <>
          <div className="block mx-4 my-4 p-6 rounded-lg shadow-lg bg-white w-1/4" key={i}>
          <a href={news.url} target="_blank" rel="noreferrer">
            <div className="flex items-center justify-between">
                 <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                   {news.name.length > 30 ? `${news.name.substring(0, 30)}...` : news.name}
                </h5>
                 <img className="h-8 w-8 rounded-full mr-4" src={news?.image?.thumbnail?.contentUrl || demoImage } alt={news.name} />
            </div>
            <p className="text-gray-700 text-base mb-4">
            {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full mr-4" src={news?.provider[0]?.image?.thumbnail?.contentUrl} alt={news.provider.name} />
                <p className="text-gray-700 text-base mb-4">{news.provider[0]?.name}</p>
                </div>
                <p className="text-gray-700 text-base mb-4">{moment(news.datePublished).startOf('ss').fromNow()}</p>
            </div>
            </a>
          </div>
        </>
        ))}
      </div>
    </div>
    </>
  )
}

export default News