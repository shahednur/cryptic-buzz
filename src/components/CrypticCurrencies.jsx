import React,{ useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Audio } from 'react-loader-spinner'
import { useGetCryptosQuery } from '../services/cryptoApi'

const CrypticCurrencies = ({simplified}) => {
  const count = simplified ? 10 : 50;
  const [cryptos, setCryptos] = useState([]);
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [searchTerm, setSearchTerm] = useState('');

  

  useEffect(() => {
    if(cryptosList){
      setCryptos(cryptosList?.data?.coins);
      const filteredCryptos = cryptosList?.data?.coins.filter(crypto => crypto.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setCryptos(filteredCryptos);
    }
  }, [cryptosList, searchTerm]);
  return (
    <>
    { !simplified && <div className="container mx-auto ml-4 flex sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
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
    }
     { isFetching ? <Audio heigth="100" width="100" color="grey" ariaLabel="loading" wrapperStyle={{marginLeft:'45%', marginTop:'20%'}} /> : 
      <div className="container mx-auto ">
        <div className="flex flex-wrap items-center">
        {cryptos?.map((currency, i) => (
          <>
          <div className="block mx-4 my-4 p-6 rounded-lg shadow-lg bg-white w-1/4" key={i}>
          <Link to={`/cryptodetails/${currency.uuid}`}>
            <div className="flex items-center justify-between">
                 <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{`${currency.rank}. ${currency.name}`}</h5>
                 <img className="h-8 w-8 rounded-full mr-4" src={currency.iconUrl} alt={currency.name} />
            </div>
            <p className="text-gray-700 text-base mb-4">
              Price: { millify(currency.price)}
            </p>
            <p className="text-gray-700 text-base mb-4">
              Market Cap: { millify(currency.marketCap)}
            </p>
            <p className="text-gray-700 text-base mb-4">
              Daily Change: { millify(currency.change)} %
            </p>
            </Link>
          </div>
        </>
        ))}
      </div>
    </div>
    }
    </>
  )
}

export default CrypticCurrencies