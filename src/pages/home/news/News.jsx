import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useAxiosPublic from "../../../assets/hook/useAxiosPublic";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../assets/hook/useAxiosSecure";

const News = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data:data =[] } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/news");
     
      const mydata = data.slice(6);
      
      return mydata;
    },
  });
 
  const crime = data
    ? data.filter((item) => item?.tags === "Crime").slice(0, 3)
    : [];
  const sports = data
    ? data.filter((item) => item?.tags === "Sports").slice(3, 6)
    : [];
  const business = data ? data.filter((item) => item?.tags === "Business") : [];
  const entertainment = data
    ? data.filter((item) => item?.tags === "Entertainment").slice(0, 3)
    : [];
  const bangladesh = data
    ? data.filter((item) => item?.tags === "Bangladesh")
    : [];

  return (
    <div>
      <div className="grid md:grid-cols-5 md:gap-2">
        <div className="grid md:grid-cols-1 gap-5 pt-2">
          {entertainment.map((item) => (
            <>
              <div className="card bg-base-100 shadow-xl" >
                <figure>
                  <img
                    className="w-full h-[140px]"
                    src={item?.image}
                    alt="Shoes"
                  />
                </figure>
                <div className="p-2">
                  <h2 className="text-sm font-slobo font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-xs pt-3">
                    {item.description.slice(0, 120)}
                  </p>
                  <div className="card-actions justify-end">
                    <Link to={`/details/${item?._id}`}>
                      <button className="btn btn-sm btn-ghost">
                        বিস্তারিত--
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        <div className="md:col-span-3 ">
            <div className="grid md:grid-cols-3 gap-5 pt-2 border-x-2 px-2">
            {bangladesh.map((item) => (
            <>
              <div className="col-span-2 ">
                    <img src={item.image} alt="" className="rounded h-[300px] w-full" />
              </div>
              <div className=" pt-3 pl-2">
                    <h2 className="text-lg text-red-600 font-slobo font-semibold">
                        {item.title}
                  </h2>
                  <p className="text-sm pt-3">
                     {item.description.slice(0, 257)}
                  </p>
                  <div className="card-actions justify-end">
                    <Link to={`/details/${item?._id}`}>
                      <button className="btn btn-sm btn-ghost">
                        বিস্তারিত--
                      </button>
                    </Link>
                  </div>
              </div>
            </>
          ))}
            </div>
        </div>
        <div className="flex flex-col gap-5 pt-2">
          {sports.map((item) => (
            <>
              <div className="card bg-base-100 shadow-xl">
                <figure>
                  <img src={item?.image} alt="Shoes" />
                </figure>
                <div className="p-2">
                  <h2 className="text-sm font-slobo font-semibold">
                    {item.title}
                  </h2>
                  <p className="text-xs pt-3">
                    {item.description.slice(0, 120)}
                  </p>
                  <div className="card-actions justify-end">
                    <Link to={`/details/${item?._id}`}>
                      <button className="btn btn-sm btn-ghost">
                        বিস্তারিত--
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
     <div className="divider"></div>
    </div>
  );
};

export default News;
