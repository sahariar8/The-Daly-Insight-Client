import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../assets/hook/useAxiosSecure";
import SectionTitle from "../../shared/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
//swipper
import "swiper/css";
import "swiper/css/pagination";
// import '../../css/style.css'

const Publisher = () => {
  const axiosSecure = useAxiosSecure();
  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });
  return (
    <div className="py-10">
      <SectionTitle title="Publishers"></SectionTitle>
      <div className="max-w-screen-xl mx-auto">
        <Swiper
        
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {publishers.map((item) => (
            <SwiperSlide key={item?._id}>
              <div className="avatar flex justify-center py-10" data-aos="zoom-in">
                <div className="w-48 rounded-full">
                  <img src={item.image} />
                </div>
              </div>
              <h1 className="text-center pt-3 pb-8 font-bold text-xl text-slate-600">
                {item.name}
              </h1>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Publisher;
