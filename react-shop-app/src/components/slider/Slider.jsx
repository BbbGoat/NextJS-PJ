'use client'
import React, { useCallback, useState } from 'react'
import sliderData from './SliderData';

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
  
  return (
    <div>Slider</div>
  )
}

export default Slider