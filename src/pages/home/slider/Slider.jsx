import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import SectionTitle from '../../shared/SectionTitle';
import useAxiosPublic from '../../../assets/hook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../assets/hook/useAxiosSecure';
;

const Slider = () => {

    const axiosSecure = useAxiosSecure();
  const { data:data =[] } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/news");
      const mydata = data.slice(6);
      return mydata;
    },
  });
    return (
        <div>
            <SectionTitle title={"Trending News"}></SectionTitle>
        <div className='mx-auto py-10'>
      <section>
         
      <Swiper
        
         slidesPerView={5}
         spaceBetween={30}
         centeredSlides={false}
         loop={true}
         autoplay={{
             delay: 50,
             // disableOnInteraction: false
         }}
         pagination={{
           clickable: true,
         }}
         modules={[Pagination]}
         className="mySwiper"
       >
        {
            data.map(item=><SwiperSlide className='grid md:grid-cols-5' key={item?._id}>
                <img src={item.image} className='md:h-[140px] md:w-[250px]' />
                <div className='divider'></div>
                <h3 className='text-xs md:text-base font-semibold font-rancho bottom-8  mb-10'>{item.title}</h3>
              </SwiperSlide> )
             
        }
         
       </Swiper>
      </section>
     </div>
      </div>
    );
};

export default Slider;