import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Exchanges,Sidebar, Homepages, News, CrypticCurrencies, CrypticDetails } from './components'
function App() {
  return (
    <div className="flex flex-no-wrap">
            <Sidebar />
            {/* Sidebar ends */}
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className="container mx-auto py-10 md:w-4/5 w-11/12 px-6">
                {/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
                <div className="w-full h-full rounded">
                  <Routes>
                    <Route exact path="/" element={<Homepages />} />
                    <Route exact path="/exchanges" element={<Exchanges />} />
                    <Route exact path="/cryptocurrencies" element={<CrypticCurrencies />} />
                    <Route exact path="/cryptodetails/:id" element={<CrypticDetails />} />
                    <Route exact path="/news" element={<News />} />
                  </Routes>
                </div>
            </div>
        </div>
  );
}

export default App;
