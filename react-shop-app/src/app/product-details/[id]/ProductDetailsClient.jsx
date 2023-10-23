'use client'
import useFetchDocument from '@/hooks/useFetchDocument';
import { useParams } from 'next/navigation';
import React from 'react'
import styles from './ProductDetails.module.scss';
import Loader from '@/components/loader/Loader';
import Image from 'next/image';

const ProductDetailsClient = () => {

    const { id } = useParams();

    const { document: product } = useFetchDocument('products', id);
    // => document 사용할 때 이름을 product로 사용함

    const addToCart = () => {};

    const today = new Date();
    const tomorrow = new Date(today.setDate(today.getDate() + 1));

    const tomorrowDate = tomorrow.getDate();
    const tomorrowMonth = tomorrow.getMonth();

    
    return (
        <section className={styles.product}>
            {product === null ?
            (<Loader />) : (
                <>
                    <div className={styles.details}>
                        <div className={styles.img}>
                            <Image src={product.imageURL} alt={product.name} priority width={477} height={410} />
                        </div>
                    </div>
                </>
            )}

        </section>
    )
}

export default ProductDetailsClient