import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import HTMLReactParser from 'html-react-parser';
import millify from 'millify'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery  } from '../services/cryptoApi'
import { Audio } from 'react-loader-spinner'

import { LineChart } from '.';

const CrypticDetails = () => {
  const { id } = useParams()
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(id)
  const { data: coinHistory } = useGetCryptoHistoryQuery({id, timeperiod});
  const cryptoDetails = data?.data?.coin;

  useEffect(() => {
    if(coinHistory) {
      setTimeperiod(coinHistory.timeperiod);
    }
  }, [coinHistory])

  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];
  const stats = [
    { id:1, title: 'Rank', value: cryptoDetails?.rank},
    { id:2, title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}` },
    { id:3, title: '24h Volume', value: `$ ${cryptoDetails?.volume_24h && millify(cryptoDetails?.volume_24h)}` },
    { id:4, title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}` },
    { id:5, title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}` },
  ];

  const genericStats = [
    { id:1, title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets },
    { id:2, title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges },
    { id:3, title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? 'Yes' : 'No' },
    { id:4, title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}` },
    { id:5, title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}` },
  ];

  if(isFetching) return <Audio heigth="100" width="100" color="grey" ariaLabel="loading" wrapperStyle={{marginLeft:'45%', marginTop:'20%'}} />
  return (
    <div>
      <div className="flex justify-between">
        <div className="block p-6 rounded-lg shadow-lg bg-white w-full">
          <div className="flex items-center justify-between">
          <h5 className="text-indigo-700 text-4xl leading-tight font-medium mb-2">{data?.data?.coin.name} ({data?.data?.coin.symbol}) Price</h5>
          <img className="h-20 w-20 rounded-full mr-4" src={cryptoDetails.iconUrl} alt={cryptoDetails.name} />
          </div>
          <p className="text-gray-700 text-xl mb-4">
              {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div className="block p-6 rounded-lg shadow-lg bg-white w-full">
        <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <select onChange={(e) => setTimeperiod(e.target.value)} className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
                <option defaultValue>Cyptocurrency Timestamp</option>
                {time.map((date) => <option key={date}>{date}</option>)}
              </select>
            </div>
          </div>
          <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
        </div>
      </div>
      <div className="flex flex-row justify-between mt-8">
      <div className="block p-6 rounded-lg shadow-lg bg-white w-1/2 mr-4">
          <h5 className="text-gray-700 text-xl leading-tight font-medium mb-2">{cryptoDetails.name} Value Statistics</h5>
          <p className="text-gray-500 text-base mb-4">
          An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.
          </p>
          <div className="flex">
            <ul className="bg-white rounded-lg w-96 text-gray-900 ">
              {stats.map(({title, value}, i) => (
              <li className="py-2 border-b border-gray-200 w-full" key={i}>
                <div className="flex items-center justify-between">
                <p className="text-gray-500 text-base mb-4">{title}</p>
                <p className="text-gray-500 text-base mb-4">{value}</p>
                </div>
              </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="block p-6 rounded-lg shadow-lg bg-white w-1/2">
        <h5 className="text-gray-700 text-xl leading-tight font-medium mb-2">Other Stats Info</h5>
          <p className="text-gray-500 text-base mb-4">
          An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.
          </p>
          <div className="flex">
            <ul className="bg-white rounded-lg w-96 text-gray-900 ">
              {genericStats.map(({ title, value}, i) => (
              <li className="py-2 border-b border-gray-200 w-full" key={i}>
                <div className="flex items-center justify-between">
                <p className="text-gray-500 text-base mb-4">{title}</p>
                <p className="text-gray-500 text-base mb-4">{value}</p>
                </div>
              </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div className="block p-6 rounded-lg shadow-lg bg-white mt-4 mr-4 w-1/2">
          <h5 className="text-gray-700 text-xl leading-tight font-medium mb-2">{cryptoDetails.name} Links</h5>
          <ul className="bg-white rounded-lg w-96 text-gray-900 ">
            {cryptoDetails.links?.map((link, i) => (
              <li className="py-2 border-b border-gray-200 w-full" key={i}>
                <div className="flex items-center justify-between">
                  <h5 className="text-gray-700 text-xl leading-tight font-medium mb-2">{link.type}</h5>
                  <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="block p-6 rounded-lg shadow-lg bg-white mt-4 w-1/2">
          <h5 className="text-gray-700 text-xl leading-tight font-medium mb-2">What is {cryptoDetails.name}?</h5>
          <p className="text-gray-500 text-base mb-4">{HTMLReactParser(cryptoDetails.description)}</p>
        </div>
      </div>
    </div>
  )
}

export default CrypticDetails