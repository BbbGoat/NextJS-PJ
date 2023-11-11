import { IProduct } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IFilterState {
    filteredProducts: IProduct[];
}

const initialState: IFilterState = {
    filteredProducts: []
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_BY_CATEGORY: (state, action: {payload: {products: IProduct[], category: string}}) => {
            const {products, category} = action.payload;
            let tempProducts = [];
            if (category === 'All') {
                tempProducts = products;
            } else {
                tempProducts = products.filter(
                    (product) => product.category === category
                )
            }
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_BRAND: (state, action: {payload: {products: IProduct[], brand: string}}) => {
            const {products, brand} = action.payload;
            let tempProducts = [];
            if (brand === 'All') {
                tempProducts = products;
            } else {
                tempProducts = products.filter(
                    (product) => product.brand === brand
                )
            }
            state.filteredProducts = tempProducts;
        },
        FILTER_BY_PRICE: (state, action: {payload: {products: IProduct[], price: number}}) => {
            const {products, price} = action.payload;
            let tempProducts = [];

            tempProducts = products.filter((product)=>product.price <= price);

            state.filteredProducts = tempProducts;
        },
        // CATEGORY랑 BRAND 두개 합친 함수
        FILTER_BY: (state, action: {payload: {products: IProduct[], price: number, brand: string, category: string}}) => {
            const {products, price, brand, category} = action.payload;
            let tempProducts = [];
            if (category === 'All') {
                tempProducts = products;
            } else {
                tempProducts = products.filter(
                    (product) => product.category === category
                )
            }
            if (brand === 'All') {
                tempProducts = products;
            } else {
                tempProducts = products.filter(
                    (product) => product.brand === brand
                )
            }

            tempProducts = tempProducts.filter(product => product.price <= price);
            state.filteredProducts = tempProducts;
        },
        SORT_PRODUCTS: (state, action: {payload: {products: IProduct[], sort: string}}) => {
            const {products, sort} = action.payload;
            let tempProducts: IProduct[] = [];
            // 기본값 최신순 정렬
            if (sort === 'latest'){
                tempProducts = products;
            }
            // 낮은가격순 정렬
            if (sort === 'lowest-price') {
                // slice해서 products 얕은복사 해주기
                tempProducts = products.slice().sort((a,b)=>{
                    return a.price - b.price;
                })
            }
            // 높은가격순 정렬
            if (sort === 'highest-price') {
                tempProducts = products.slice().sort((a,b)=>{
                    return b.price - a.price;
                })
            }

            state.filteredProducts = tempProducts;
        },
        FILTER_BY_SEARCH: (state, action: {payload: {products: IProduct[], search: string}}) => {
            const { products, search } = action.payload;

            // 검색어 필터링해주기
            const tempProducts = products.filter(
                (product)=>
                product.name.toLowerCase().includes(search.toLowerCase()) || 
                product.category.toLowerCase().includes(search.toLowerCase())
            )
            state.filteredProducts = tempProducts;
        }
    }
});

export const { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE, FILTER_BY, SORT_PRODUCTS, FILTER_BY_SEARCH } = filterSlice.actions;

export const selectFilteredProducts = (state:RootState) => state.filter.filteredProducts;

export default filterSlice.reducer;