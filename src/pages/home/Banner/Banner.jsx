import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../assets/hook/useAxiosPublic";
import useAxiosSecure from "../../../assets/hook/useAxiosSecure";

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const { data : trending = [] } = useQuery({
      queryKey:['trending'],
      queryFn:async()=>{
        const res = await axiosSecure.get('/all-articles');
        // console.log(res.data);
        const findValue = res?.data.slice(0,6);
        // console.log(findValue);
        return findValue;
        
      }
  })
    return (
      <div className="pt-2 border-b-2 pb-3">
        <Carousel  autoPlay infiniteLoop showThumbs={false}>
         {
          
           trending.map(item=>
            <div className="flex flex-col md:flex-row" key={item._id}>
            <div className="md:w-1/2 shadow-lg">
              <img src={item.image} alt="" className="hover:scale-110 h-[380px]" />
              {/* <h1 className="flex justify-start pt-2 ml-2">
                নির্বাচন কমিশন ভবন | ফাইল ছবি
              </h1> */}
            </div>
            <div className="md:mx-2 mx-1 md:w-1/2 pt-3">
              <h1 className="text-3xl md:text-4xl text-red-600 font-semibold md:pt-5">
              {item.title}
              </h1>
              {/* <h1 className="md:text-xl font-semibold pt-2">
                ভোট সুষ্ঠু করার অঙ্গীকার থেকে এখনো দূরে নির্বাচন কমিশন
              </h1> */}
              {/* <h1 className="text-sm md:text-lg  md:pt-2">
                সুষ্ঠু নির্বাচন করার জন্য পরিকল্পনা বাস্তবায়নেও গা-ছাড়া ভাব
                ইসির।
              </h1> */}
              <h1 className="text-base font-slobo mx-2 text-justify pt-5">
                {item.description}
              </h1>
            </div>
          </div> 
           )
         }
        </Carousel>
      </div>
      
    );
};

export default Banner;