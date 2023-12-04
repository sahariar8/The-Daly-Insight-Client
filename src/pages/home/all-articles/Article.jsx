import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAxiosPublic from '../../../assets/hook/useAxiosPublic';
import useSubscription from '../../../assets/hook/useSubscription';
import useAuth from '../../../assets/hook/useAuth';


const Article = ({item}) => {

  const axiosPublic = useAxiosPublic();


  const { user } = useAuth();
  const [ subscriber] = useSubscription();

  const userEmail = user?.email;
  // console.log(userEmail);

  const checkSubscriber = subscriber.find(item=>item.email == userEmail && item.subscription == 'yes');
  // console.log(checkSubscriber);
  const check = checkSubscriber?.subscription;



  //views
const handleViews = (id) =>{
  const count = 1;
  const viewCount = {count};
  console.log(viewCount);
     axiosPublic.patch(`/views/${id}`,viewCount)
     .then(res=>{
      console.log(res.data);
     })
}

  

    const {_id,title,image,publisher,description,premium} = item;
    // console.log({check,premium});
    return (
        <div data-aos="zoom-in">
         <div className="card card-compact bg-base-100 shadow-xl h-[500px]">
        <figure>
          <img src={image} alt="Shoes" className='h-[230px] w-full' />
        </figure>
        <div className="card-body">
          <div className='flex justify-between'>
          <h2 className="card-title">{title}</h2>
         {
            premium === "Yes"?
             <h2 className='text-xl font-bold block text-purple-500'>{publisher}</h2>
             :
             <h2 className='text-xl font-bold text-emerald-500'>{publisher}</h2>
         }
          </div>
          <p className='py-4 text-slate-600 font-semibold'>{description.slice(0,100)}</p>
        
          {
            
           ( premium ==='Yes' && check == 'yes') ||  (!premium) ?
           <div className="card-actions justify-end">
           <NavLink to={`/details/${_id}`}><button className="btn bg-emerald-400 normal-case hover:bg-emerald-600 text-white" onClick={()=>handleViews(_id)}>View Details</button></NavLink>
           </div>
              :
            <div className="card-actions justify-end">
                <button className="btn btn-disabled text-red-500" disabled>View Details</button>
            </div>
            
          }
          
        </div>
      </div>
     </div>
    );
};

export default Article;