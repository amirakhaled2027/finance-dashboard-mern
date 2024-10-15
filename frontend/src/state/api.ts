//Redux toolkit: to access the state globally
//Redux toolkit query on top of that: so we can grab or make api calls, and that data can be stored in the global store easily 

//Creating our boilerplate for redux toolkit query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from "./types";

//we're using createApi so it will allow us to make endpoints that we can use to call our backend
//so we can grab data from our backend using this particular setup 
//and to dot this we have some boilerplate code that we need to setup
//and the way we do this is by setting baseQuery, we're gonna use fetchBaseQuery
//as a function from redux query, and in our base url we're basing in the environment variable we added earlier

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    
    // this is just a name for this particular api call
    reducerPath: "main",

    // these wha's being used to keep information, and this is the name for each api data
    tagTypes: ['Kpis', 'Products', 'Transactions'],

    //this is we actually create our api calls
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>, void>({  //when you create these queries you're just wanna pass in <void, void> so that we don't really need any arguments for now but we'll add them eventually
            query: () => "kpi/kpis/",
            providesTags: ['Kpis']
        }),
        getProducts: build.query<Array<GetProductsResponse>, void>({  //when you create these queries you're just wanna pass in <void, void> so that we don't really need any arguments for now but we'll add them eventually
            query: () => "product/products/",
            providesTags: ['Products']
        }),
        //when you get the product, wou get the full list of the product(LIKE ABOVE), 
        //BUT when you delete it, what happens is you have to delete it in the database, but you also have to delete it in the frontend
        //This kinda of a hassle coz you have to either tell your backend team to tell you:
        //I need the updated list of the product, so either your backend team will have to send you the correct information
        //or you have to do it yourself 
        //SO instead of that redux toolkit query can give you an option that when you delete something 
        // in the product section you don't have to worry about getting the updated list
        //it'll automatically recall the products list anytime you call the next code on any kind of query
        // deleteProduct:
        // invalidTags: ['Products']


        getTransactions: build.query<Array<GetTransactionsResponse>, void>({  //when you create these queries you're just wanna pass in <void, void> so that we don't really need any arguments for now but we'll add them eventually
            query: () => "transaction/transactions/",
            providesTags: ['Transactions']
        }),
    })
});

export const {  useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api