import React from 'react'
import { Carousel } from "@material-tailwind/react";
function Home() {
  return ( 
        <>
          <div className="h-[760px]">
              <GalleryWithCarousel/>
              {/* <img id="theText" src={baseUrlImg} alt="..." className='h-full w-full object-cover'/> */}
          </div>
          <div className="text-center">
          </div>
        </>
  )
}
const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random()
      * (max - min + 1)) + min;
};

const GalleryWithCarousel = () => {
  let randomNumber1 = randomNumberInRange(1,999);
  let randomNumber2 = randomNumberInRange(1,999);
  let randomNumber3 = randomNumberInRange(1,999);
  let randomNumber4 = randomNumberInRange(1,999);
  let randomNumber5 = randomNumberInRange(1,999);
  let baseUrlImg = 'https://source.unsplash.com/random?'
  return (
    <Carousel loop={true} autoplay={true} className="rounded-xl">
      <img
        src={baseUrlImg+randomNumber1}
        alt="image 1"
        className="h-full w-full object-cover object-center"
      />
      <img
        src={baseUrlImg+randomNumber2}        
        alt="image 2"
        className="h-full w-full object-cover object-center"
      />
      <img
        src={baseUrlImg+randomNumber3}
        alt="image 3"
        className="h-full w-full object-cover object-center"
      />
      <img
        src={baseUrlImg+randomNumber4}
        alt="image 3"
        className="h-full w-full object-cover object-center"
      />
      <img
        src={baseUrlImg+randomNumber5}
        alt="image 3"
        className="h-full w-full object-cover object-center"
      />
    </Carousel>
  );
}

export default Home