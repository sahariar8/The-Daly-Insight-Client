import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Details = () => {

    const  {image,title,authorName,authorImage,description,tags,date} = useLoaderData();
    return (
        <div className="py-10 bg-[url('/13.jpg')] mb-10 shadow-xl">
     
      <h1 className="text-center text-5xl font-bold py-10">
         <span className="text-emerald-400"> {tags}</span>
      </h1>
      <div
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <div className="relative flex flex-col text-gray-700 bg-white shadow-md  md:w-3/5 rounded-xl bg-clip-border mx-auto">
          <div className="relative  overflow-hidden text-gray-700 bg-white  rounded-xl bg-clip-border">
            <img src={image} className="object-cover w-full h-[600px]" />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="block font-slobo text-2xl antialiased font-semibold leading-relaxed text-blue-gray-900">
                {title}
              </p>
              {/* <p className="block font-slobo text-2xl antialiased font-semibold leading-relaxed text-blue-gray-900">
                $ {service_price}
              </p> */}
            </div>
            
            <div className='flex justify-between'>
            <div className="flex items-center gap-2 pt-2">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={authorImage} />
                </div>
              </div>
               <div>
                    <h1 className="font-semibold">{authorName}</h1>
               </div>
            </div>
                <div>
                    <h1 className='font-semibold'>{date}</h1>
                </div>
            </div>
            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 pt-5">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
    );
};

export default Details;