import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { CrypticCurrencies,News } from '../components'

const Homepages = () => {
  const { data, isFetching } = useGetCryptosQuery(10)

  const globalStats = data?.data?.stats;

  if (isFetching) return <Audio heigth="100" width="100" color="grey" ariaLabel="loading" wrapperStyle={{marginLeft:'45%', marginTop:'20%'}} />
  return (
    <>
    <div className="container mx-auto flex sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
      <div className="flex justify-center">
        <div className="block p-6 mx-4 w-2/6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Total Cryptocurrencies</h5>
          <p className="text-indigo-700 text-4xl font-extrabold mb-4">
            { millify(globalStats.total) }
          </p>
        </div>
        <div className="block p-6 mx-4 w-2/6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Total Exchanges</h5>
          <p className="text-indigo-700 text-4xl font-extrabold mb-4">
            {globalStats.totalExchanges }
          </p>
        </div>
        <div className="block p-6 mx-4 w-2/6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Total Market Capital:</h5>
          <p className="text-indigo-700 text-4xl font-extrabold mb-4">
            {millify(globalStats.totalMarketCap) }
          </p>
        </div>
        <div className="block p-6 mx-4 w-2/6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Total 24h Volume:</h5>
          <p className="text-indigo-700 text-4xl font-extrabold mb-4">
            { millify(globalStats.total24hVolume) }
          </p>
        </div>
        <div className="block p-6 mx-4 w-2/6 rounded-lg shadow-lg bg-white max-w-sm">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Total Markets</h5>
          <p className="text-indigo-700 text-4xl font-extrabold mb-4">
            { millify(globalStats.totalMarkets) }
          </p>
        </div>
      </div>
    </div>
    <div className="container mx-auto flex my-4">
      <div className="flex justify-between">
      <h3 className="font-medium ml-4 pt-4 leading-tight text-3xl mt-0 mb-2 text-gray-600">Top 10 Cryptos in the world.</h3>
      <Link to="/cryptocurrencies" className="font-medium ml-4 pt-5 leading-tight text-2xl mt-0 mb-2 text-indigo-400">Show More..</Link>
      </div>
    </div>
    <CrypticCurrencies simplified/>
    <div className="container mx-auto flex my-4">
      <div className="flex justify-between">
      <h3 className="font-medium ml-4 pt-4 leading-tight text-3xl mt-0 mb-2 text-gray-600">Top 10 Crypto News in the world.</h3>
      <Link to="/news" className="font-medium ml-4 pt-5 leading-tight text-2xl mt-0 mb-2 text-indigo-400">Show More..</Link>
      </div>
    </div>
    <News simplified />
    </>
  )
}

export default Homepages