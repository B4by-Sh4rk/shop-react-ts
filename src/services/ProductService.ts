import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react"
import { IProduct } from "../models/IProduct"

export const productAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllProducts: build.query<IProduct[], number>({
            query: () => ({
                url: '/products',
            }),
            providesTags: result => ['Post']
        }),
        fetchAllProductsWherePrice: build.query<IProduct[], number>({
            query: (price: number = 1 ) => ({
                url: `/products?price_gte=0&price_lte=${price}`,
            }),
            providesTags: result => ['Post']
        }),
        fetchAllProductsWhereManufacturer: build.query<IProduct[], string>({
            query: (manufacturer: string = '' ) => ({
                url: `/products?manufacturer_like=${manufacturer}`,
            }),
            providesTags: result => ['Post']
        }),
        fetchAllProductsWhereCareType: build.query<IProduct[], string>({
            query: (careType: string = '' ) => ({
                url: `/products?careType_like=${careType}`,
            }),
            providesTags: result => ['Post']
        }),
        fetchSortDescPriceProducts: build.query<IProduct[], number>({
            query: () => ({
                url: '/products?_sort=price&_order=desc',
            }),
            providesTags: result => ['Post']
        }),
        fetchSortDescNameProducts: build.query<IProduct[], number>({
            query: () => ({
                url: '/products?_sort=name&_order=desc',
            }),
            providesTags: result => ['Post']
        }),
        fetchSortAcsPriceProducts: build.query<IProduct[], number>({
            query: () => ({
                url: '/products?_sort=price&_order=acs',
            }),
            providesTags: result => ['Post']
        }),
        fetchSortAcsNameProducts: build.query<IProduct[], number>({
            query: () => ({
                url: `/products?_sort=name&_order=acs`,
            }),
            providesTags: result => ['Post']
        }),
        fetchCart: build.query<IProduct[], number>({
            query: () => ({
                url: '/cartProducts',
            }),
            providesTags: result => ['Post']
        }),
        fetchAllProductsByPage: build.query<IProduct[], number>({
            query: (page: number = 1 ) => ({
                url: '/products?_limit=8',
                params:{
                    _page: page,
                }
            }),
            providesTags: result => ['Post']
        }),
        fetchAllProductsMainPage: build.query<IProduct[], number>({
            query: (page: number = 1 ) => ({
                url: '/products?_limit=6',
                params:{
                    _page: page,
                }
            }),
            providesTags: result => ['Post']
        }),
        fetchCurrentProduct: build.query<IProduct[], number>({
            query: (id: number = 1) => ({
                url: `/products?id=${id}`,
            }),
            providesTags: result => ['Post']
        }),
        createCart: build.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: '/cartProducts',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Post']
        }),
        createProduct: build.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: '/products',
                method: 'POST',
                body: product,
            }),
            invalidatesTags: ['Post']
        }),
        updateProduct:build.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: 'PUT',
                body: product,
            }),
            invalidatesTags: ['Post']
        }),
        deleteProduct:build.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/products/${product.id}`,
                method: 'DELETE',
                body: product,
            }),
            invalidatesTags: ['Post']
        }),
        deleteProductfromCart:build.mutation<IProduct, IProduct>({
            query: (product) => ({
                url: `/cartproducts/${product.id}`,
                method: 'DELETE',
                body: product,
            }),
            invalidatesTags: ['Post']
        }),
    })
})