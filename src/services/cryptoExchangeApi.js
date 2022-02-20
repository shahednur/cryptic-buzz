import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoExchangeHeaders = {
    'x-rapidapi-host': 'coingecko.p.rapidapi.com',
    'x-rapidapi-key': '80126e7cdbmsh4d2a7b56055ebfcp1beae5jsn5e6f6dae89e3'
};

const createRequest = (url) => ({url, headers: cryptoExchangeHeaders })

export const cryptoExchangeApi = createApi({
    reducerPath: 'cryptoExchangeApi',
    baseQuery: fetchBaseQuery( {baseUrl:'https://coingecko.p.rapidapi.com'}),
    endpoints: (builder) => ({
        getCryptoExchange: builder.query({
            query: () => createRequest('/exchanges'),
        }),
    }),
    
});

export const { useGetCryptoExchangeQuery } = cryptoExchangeApi;