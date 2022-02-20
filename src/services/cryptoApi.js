import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '80126e7cdbmsh4d2a7b56055ebfcp1beae5jsn5e6f6dae89e3'
  };


const createRequest = (url) => ({url, headers: cryptoApiHeaders })


export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery( {baseUrl:'https://coinranking1.p.rapidapi.com'}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),

        getCryptoHistory: builder.query({
            query: ({ id, timeperiod }) => createRequest(`coin/${id}/history?timeperiod=${timeperiod}`),
        }),

        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        }),
    }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery } = cryptoApi