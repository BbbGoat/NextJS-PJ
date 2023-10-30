'use client'
import React, { useEffect, useState } from 'react'
import styles from './AllProducts.module.scss'
import useFetchCollection from '@/hooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS, selectProducts } from '@/redux/slice/productSlice';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '@/redux/slice/filterSlice';
import Loader from '@/components/loader/Loader';
import Heading from '@/components/heading/Heading';
import Search from '@/components/search/Search';
import priceFormat from '@/utils/priceFormat';
import Link from 'next/link';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Pagination from '@/components/pagination/Pagination';
import Image from 'next/image';

const AllProductsClient = () => {

    const [search, setSearch] = useState('');
    const {data, isLoading} = useFetchCollection("products");

    // 상품, 필터링된 상품 state 가져오기
    const products = useSelector(selectProducts);
    const filteredProducts = useSelector(selectFilteredProducts);

    // 페이지네이션 용도
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    )

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(
            STORE_PRODUCTS({
                products: data
            })
        )
    }, [dispatch, data])

    useEffect(() => {
      dispatch(
        FILTER_BY_SEARCH({products, search})
      )
    }, [dispatch, products, search])

    const confirmDelete = (id, imageURL) => {}
    
    
  return (
    <>
        {isLoading && <Loader />}
        <div className={styles.table}>
            <Heading title="모든 상품" subtitle={`총 ${filteredProducts.length} 개의 상품`} />
            <div className={styles.search}>
                <Search value={search} onChange={(e)=>setSearch(e.target.value)} />
            </div>
            {currentProducts.length === 0 ? (
                <p>상품이 없습니다.</p>
            ):(
                <table>
                    <thead>
                        <tr>
                            <th>순서</th>
                            <th>이미지</th>
                            <th>이름</th>
                            <th>카테고리</th>
                            <th>가격</th>
                            <th>실행</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => {
                            const { id, name, category, price, imageURL } = product;
                            return (
                                <tr key={id}>
                                    <td>{index + 1 }</td>
                                    <td>
                                        <Image src={imageURL} alt={name} width={100} height={100} />
                                    </td>
                                    <td>
                                        {name}
                                    </td>
                                    <td>
                                        {category}
                                    </td>
                                    <td>
                                       {priceFormat(price)}원
                                    </td>
                                    <td>
                                        <Link href={`/admin/edit-product/${id}`}>
                                        <FaEdit size={20} color='green' />
                                        </Link>
                                        {" "}
                                        <FaTrashAlt size={18} color='red' onClick={()=>confirmDelete(id, imageURL)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}

            <Pagination 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalProducts={filteredProducts.length}
                productsPerPage={productsPerPage}
            />
        </div>
    </>
  )
}

export default AllProductsClient