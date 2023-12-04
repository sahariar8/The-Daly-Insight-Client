import React from "react";
import SectionTitle from "../../shared/SectionTitle";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../assets/hook/useAxiosPublic";
import Article from "../all-articles/Article";
import Slider from "../slider/Slider";
import useAxiosSecure from "../../../assets/hook/useAxiosSecure";

const PremiumArticle = () => {
  const axiosSecure = useAxiosSecure();
  const { data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-articles");
      // console.log(res.data);
      const allNews = res.data;
      const premiumNews = allNews.filter(item=>item.premium === 'Yes');
      // console.log(premiumNews);
      return premiumNews;
    },
  });


  return (
    <div className="py-10">
     
      <Slider></Slider>
      <SectionTitle title={"Premium Articles"}></SectionTitle>
      <div className="divider"></div>
      <div className="py-10">
        <div className="grid md:grid-cols-3 gap-5 py-5">
          {articles.map((item) => (
            <Article item={item} key={item._id}></Article>
          ))}
        </div>
      </div>
    </div>
  );
};


export default PremiumArticle;