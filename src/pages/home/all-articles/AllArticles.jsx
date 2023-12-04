import React, { useState } from "react";
import SectionTitle from "../../shared/SectionTitle";
import Article from "./Article";
import { useQuery } from "@tanstack/react-query";

import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../assets/hook/useAxiosSecure";
import useAxiosPublic from "../../../assets/hook/useAxiosPublic";

const AllArticles = () => {

  const axiosPublic = useAxiosPublic();
  const [tags,setTags] = useState('');
  const [search, setSearch] = useState(null);
  const [target,setTarget] = useState([]);

  //
 

  //
  const { data: articles = [] } = useQuery({
    queryKey: ["articles",tags,search],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-articles?tags=${tags}`);
      const allNews = res.data;
      const publishedNews = allNews.filter(item=>item.status === 'Published');
      setTarget(publishedNews);
      return publishedNews;
     
    },
  });

  //
  const handleOptionChange = (event) => {
    setTags(event.target.value);
    // console.log(event.target.value);
    // refetch();
  };

  const handleSearch = e =>{
    e.preventDefault();
    const searchText = e.target.search.value;
    // console.log(searchText);
    setSearch(target.filter(item=>item.title === searchText));
    // const searchResult = articles.find(item=>item.title === searchText);
    // console.log(searchResult);
}

  


  return (
    <div className="py-10">
      <SectionTitle title={"All Articles"}></SectionTitle>
    <div className="flex justify-between pt-5 bg-red-400 p-4">
         <div className="md:w-1/6 w-1/2">
         <select name="tags" className="input input-bordered w-full" defaultValue='default' onChange={handleOptionChange}>
                  <option value='default' disabled>select</option>
                  <option value=''>All</option>
                  <option value='Business'>Business</option>
                  <option value='Entertainment'>Entertainment</option>
                  <option value='International'>International</option>
                  <option value='Sports'>Sports</option>
                  <option value='Health'>Health</option>
                  <option value='Education'>Education</option>
                  <option value='Job'>Job</option>
                  <option value='Politics'>Politics</option>
                  <option value='Crime'>Crime</option>
                  <option value='Features'>Features</option>
                  
          </select>
         </div>
         <div className="w-1/2 md:w-3/6">
         <form onSubmit={handleSearch} className="flex justify-end w-full">
                  <input type="text" name="search" className="input input-bordered w-3/6"  placeholder="Search Here..." />
                  <input type="submit" value="Search" className="btn ml-2"/>
          </form>

         </div>
    </div>
      <div className="py-10">
        <div className="grid md:grid-cols-3 gap-5 py-5">
          { 
            search === null || search === '' ?
            target.map((item) => (
            <Article item={item} key={item._id}></Article>
            ))
            :
            search.map((item) => (
              <Article item={item} key={item._id}></Article>
              ))
          }
        </div>
      </div>
    </div>
  );
};

// const getArticles = async({ pageParam = 0 }) =>{
//     const res = await fetch(`https://daily-insight-server-lyart.vercel.app/news?limit=10&offset=${pageParam}`);
//     const data = await res.json();
//     return { ...data, prevOffset : pageParam };
// }

// const AllArticles = () => {

//     const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
//         queryKey:['articles'],
//         queryFn: getArticles,
//         getNextPageParam: (lastPage) =>{
//             if(lastPage.prevOffset + 10 > lastPage.articleCount){
//                 return false;
//             }
//             return lastPage.prevOffset + 10;
//         }
//     });

//     console.log(data)
//     const articles = data?.pages.reduce((acc,page)=>{
//         console.log(page);
//         return [...acc, page.articles];
//     },[]);

//     console.log(articles);

//     return (
//         <div>
//             <h1>Sahariar</h1>
//         </div>
//     )
// }

export default AllArticles;
