import React from 'react'
import styles from './ProductItem.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import priceFormat from '@/utils/priceFormat'
import { Rating } from 'react-simple-star-rating'
import rocketBadgeIcon from '@/assets/badge-rocket.svg'
import useFetchDocuments from '@/hooks/useFetchDocuments'

const ProductItem = ({id, name, price, imageURL}) => {

  // hook 호출
  // const { documents } = useFetchDocuments('reviews', ["productID", "==", id])
  // console.log('documents', documents)

  // let productRating = 0;
  // documents.map(doc => {
  //   productRating = productRating + doc.rate;
  // })
  // 리뷰 평균값 구하기 (상품총별점 / 받은리뷰개수)
  // const rating = productRating / documents.length;

  const shortenText = (text, n) => {
    if(text.length > n) {
      // text가 n을 초과하면 그 뒤부터는 ...로 표시
      const shortenedText = text.substring(0, n).concat('...');
      return shortenedText
    }
    return text;
  }
  
  return (
    <div className={styles.grid}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.img}>
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{shortenText(name, 10)}</p>
          <em>
            <strong
              style={{color:'#cb1400'}}
            >{priceFormat(Number(price))}
            </strong>원{" "}
            <Image src={rocketBadgeIcon} alt='로켓배송' />
          </em>
          <div className={styles.rating}>
            {/* 라이브러리 */}
            <Rating 
              size={17}
              initialValue={1}
              // initialValue={Number.isNaN(rating) ? 0 : rating}
              readonly
            />
            <span className={styles.ratingCount}>
              (1)
              {/* ({documents.length}) */}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem