'use client'
import React, { useCallback, useEffect, useState } from 'react'
import sliderData from './SliderData';
import styles from './Slider.module.scss'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import Image from 'next/image';

const Slider = () => {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length; // => 3
  
  const intervalTime = 5000;

  const nextSlide = useCallback(() => {
    setCurrentSlide(
      // +1 하다가 마지막 슬라이드가 됐다면 0번으로 돌아가는 코드
      currentSlide === sliderLength -1 ? 0 : currentSlide + 1
    );
  }, [currentSlide, sliderLength])

  const prevSlide = useCallback(()=>{
    setCurrentSlide(
      // -1 하다가 슬라이드가 0이 되면 맨끝으로 돌아가는 코드
      currentSlide === 0 ? sliderLength -1 : currentSlide -1
    );
  }, [currentSlide, sliderLength])

  useEffect(()=>{

    // 자동 넘기기 실행
    const interval = setInterval(nextSlide, intervalTime)
    
    return () => {
      clearInterval(interval)
    }
  }, [nextSlide])
  
  return (
    <div className={styles.slider}>
      <AiOutlineArrowLeft className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide} />
      <AiOutlineArrowRight className={`${styles.arrow} ${styles.next}`} onClick={nextSlide} />

      {sliderData.map((slider, index)=>{
        const {image, heading} = slider
        return (
          <div 
            key={heading} 
            className={index === currentSlide ? `${styles.slide} ${styles.current}` : `${styles.slide}`}
          >
            {
              index === currentSlide ?
              <Image src={image} alt={heading} fill />
              :
              null
            }
          </div>
        )
      })}
    </div>
  )
}

export default Slider