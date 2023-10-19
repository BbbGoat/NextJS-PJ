'use client'
import React, { useState } from 'react'
import styles from './AddProduct.module.scss'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader/Loader'
import Heading from '@/components/heading/Heading'
import Button from '@/components/button/Button'


const categories = [
    {id: 1, name: 'Laptop'},
    {id: 2, name: 'Electronics'},
    {id: 3, name: 'Fashion'},
    {id: 4, name: 'Phone'},
    {id: 5, name: 'Movies & Television'},
    {id: 6, name: 'Home & Kitchen'},
    {id: 7, name: 'Automotive'},
    {id: 8, name: 'Software'},
    {id: 9, name: 'Video Games'},
    {id: 10, name: 'Sports & Outdoor'},
    {id: 11, name: 'Toys & Games'},
    {id: 12, name: 'Industrial & Scientific'},
]

const initialState = {
    name: '',
    imageURL: '',
    price: 0,
    category: '',
    brand: '',
    desc: '',
}

const AddProductClient = () => {

    const [product, setProduct] = useState({...initialState});

    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
    }
    
    const addProduct = (e) => {
        e.preventDefault();
    }
    
    return (
        <>
            {isLoading && <Loader />}
            <div className={styles.product}>
                <Heading title="새상품 생성하기" />
                <form onSubmit={addProduct}>
                    <label>상품이름:</label>
                    <input
                        type='text'
                        placeholder='상품 이름'
                        required
                        name='name'
                        value={product.name}
                        onChange={(e)=>handleInputChange(e)}
                    />
                    <div>
                        {
                            uploadProgress === 0 ? null : 
                            <div className={styles.progress}>
                                <div 
                                    className={styles["progress-bar"]}
                                    style={{width: `${uploadProgress}%`}}
                                >
                                    {uploadProgress < 100
                                    ? `Uploading... ${uploadProgress}%`
                                    : `Upload Complete ${uploadProgress}%`
                                    }
                                </div>
                            </div>
                        }
                        <input 
                            type='file'
                            placeholder='상품 이미지'
                            accept='image/*'
                            name='image'
                            required
                            onChange={(e)=>handleImageChange(e)}
                        />

                        {product.imageURL === "" ? null :
                            <input 
                                type='text'
                                name='imageURL'
                                disabled
                                value={product.imageURL}
                                required
                                placeholder='이미지 URL'
                            />
                        }
                    </div>
                    <label>상품 가격:</label>
                    <input 
                        type='number'
                        placeholder='상품 가격'
                        required
                        name='price'
                        value={product.price}
                        onChange={(e)=>handleInputChange(e)}
                    />
                    <label>상품 카테고리:</label>
                    <select
                        required
                        name='category'
                        value={product.category}
                        onChange={(e)=>handleInputChange(e)}
                    >
                        <option
                            value=""
                            disabled
                        >
                            -- 상품 카테고리 선택
                        </option>
                        {
                            categories.map((category)=>{
                                return (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <label>상품 브랜드/회사:</label>
                    <input 
                        type='text'
                        placeholder='상품 브랜드/회사'
                        name='brand'
                        value={product.brand}
                        onChange={(e)=>handleInputChange(e)}
                    />
                    <label>상품 설명:</label>
                    <textarea
                        name='desc'
                        value={product.desc}
                        cols={10}
                        rows={10}
                        required
                        onChange={(e)=>handleInputChange(e)}
                    >
                    </textarea>
                    <Button type='submit'>
                        상품 생성
                    </Button>
                </form>
            </div>
        </>
    )
}

export default AddProductClient