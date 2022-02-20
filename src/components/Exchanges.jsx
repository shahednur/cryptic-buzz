import React,{ useState, useEffect } from 'react'
import millify from 'millify'
import { Audio } from 'react-loader-spinner'
import { useGetCryptoExchangeQuery } from '../services/cryptoExchangeApi'

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const { data:exchangeList, isFetching } = useGetCryptoExchangeQuery();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if(exchangeList){
      setExchanges(exchangeList?.exchange);
      const filteredExchange = exchangeList?.filter(exchange => exchange.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setExchanges(filteredExchange);
    }
  }, [exchangeList, searchTerm]);

  if(isFetching) return <Audio heigth="100" width="100" color="grey" ariaLabel="loading" wrapperStyle={{marginLeft:'45%', marginTop:'20%'}} />
  return (
    <>
     <div className="container mx-auto ml-4 flex sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <label htmlFor="search" className="form-label inline-block mb-2 text-gray-700"
            >Search Cryptocurrency</label
            >
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
              id="search"
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </div>
        </div>
      </div>
    <div className="container mx-auto ">
        <div className="flex flex-wrap items-center">
         {exchanges && exchanges.map((exchange, i) => (
          <>
          <div className="block mx-4 my-4 p-6 rounded-lg shadow-lg bg-white w-1/4" key={i}>
            <div className="flex items-center justify-between">
                 <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{exchange.name}</h5>
                 <img className="h-8 w-8 rounded-full mr-4" src={exchange.image} alt={exchange.name} />
            </div>
            <p className="text-gray-700 text-base mb-4">
              Trust Score Rank: { exchange.trust_score_rank}
            </p>
            <p className="text-gray-700 text-base mb-4">
              Trust Score: { exchange.trust_score }
            </p>
            <p className="text-gray-700 text-base mb-4">
              24H Trade Vol: { millify(exchange.trade_volume_24h_btc)}
            </p>
            <p className="text-gray-700 text-base mb-4">
              24H Trade Vol Norm: { millify(exchange.trade_volume_24h_btc_normalized)}
            </p>
          </div>
        </>
        ))}
      </div>
    </div>
    </>
  )
}

export default Exchanges