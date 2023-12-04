import React, { useEffect, useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import useAxiosPublic from '../../../assets/hook/useAxiosPublic';
import useAxiosSecure from '../../../assets/hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useLoaderData } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../assets/hook/useAuth';
import './allarticle.css'

const AllArticle = () => {

  const {count} = useLoaderData();
  const [numberOfItems,setNumberOfItems] = useState(3);
  const [currentPage,setCurrentPage] = useState(0);
  const numberOfPage = Math.ceil(count/numberOfItems);
  console.log(numberOfPage) 
  const pages = [...Array(numberOfPage).keys()];
  // console.log(pages);
  //
    const axiosSecure = useAxiosSecure();
    const { data : allNews = [],refetch } = useQuery({
        queryKey:['allNews',currentPage,numberOfItems],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/news?page=${currentPage}&size=${numberOfItems}`);
            // console.log(res.data);
            return res.data;
        }
    })

    const handleNumberOfItem = e =>{
      const val = parseInt(e.target.value)
      // console.log(val);
      setNumberOfItems(val);
      setCurrentPage(0);  
  } 


    const handlePrev = ()=>{
      if(currentPage > 0){
          setCurrentPage(currentPage - 1);
      }
  }
  const handleNext = () =>{
      if(currentPage < pages.length - 1){
          setCurrentPage(currentPage + 1);
      }
  }

    const handleDelete = (id) =>{
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
             axiosSecure.delete(`/allnews/${id}`)
             .then(res=>{
              // console.log(res.data);
              if(res.data.deletedCount > 0){
                Swal.fire({
                  title: "Deleted!",
                  text: "Your News has been deleted.",
                  icon: "success"
                });
                refetch();
              }
             })
             
            }
          });
    }

    const handlePremium = (id)=>{
        console.log(id);
        axiosSecure.patch(`/news/premium/${id}`)
        .then(res=>{
            // console.log(res.data);
            if(res.data.modifiedCount > 0){
              refetch();
            Swal.fire({
                title: "Good job!",
                text: 'Welcome.Article is Premium Now',
                icon: "success"
              });
            }
        })
    }

    const handleApprove = (id) =>{
        console.log(id);
        axiosSecure.patch(`/news/approve/${id}`)
        .then(res=>{
            // console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    title: "Good job!",
                    text: 'Welcome.Article is Published Now',
                    icon: "success"
                  });
            }
        })
    }

    const handleDecline = (id)=>{
        console.log(id);
        axiosSecure.patch(`/news/decline/${id}`)
        .then(res=>{
            // console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    title: "Good job!",
                    text: 'Article is Declined',
                    icon: "success"
                  });
            }
        })
       
    }
    return (
      <div>
        <SectionTitle title="All Article"></SectionTitle>
        <div className="pt-4 md:pt-10">
          <div className="overflow-x-auto">
            <h1 className="text-2xl md:text-3xl py-3 font-semibold text-slate-600">
              My Total News:{count}
            </h1>
            <table className="table">
              {/* head */}
              <thead className="bg-orange-300  text-base">
                <tr>
                  <th>#sl</th>
                  <th>Title</th>
                  <th>Author Name</th>
                  <th>Author Email</th>
                  <th>Photo</th>
                  <th>Posted Date</th>
                  <th>Publisher Name</th>
                  <th>Status</th>
                  <th>isPremium</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 text-center">
                {allNews.map((item, index) => (
                  <tr key={item._id}>
                    <th>
                      <label>{index + 1}</label>
                    </th>
                    <th>{item.title}</th>
                    <th>{item.authorName}</th>
                    <th>{item.email}</th>
                    <th>
                      <img
                        src={item.authorImage}
                        alt=""
                        className="h-12 w-12 rounded-full "
                      />
                    </th>
                    <th>{item.date}</th>
                    <th>{item.publisher}</th>
                    <th>
                      {item.status? item.status === 'Published'?<h1 className='font-bold bg-success p-2 rounded-lg text-white'>Published</h1> :
                      <h1 className='font-bold bg-error p-2 rounded-lg text-white'>Decline</h1>
                       : (
                        <h1 className="font-bold bg-warning p-2 rounded-lg">
                          Pending
                        </h1>
                      )}
                    </th>
                    <th>
                      {item.premium ? item.premium ==='Yes'? <h1 className='text-success'>{item.premium}</h1> :
                      <h1 className="text-error font-bold  p-2 rounded-lg">No</h1>
                      
                       : (
                        <h1 className="text-error font-bold  p-2 rounded-lg">
                          No
                        </h1>
                      )}
                    </th>
                    <th>
                      <div className="join join-vertical space-y-2">
                        <button className="btn btn-sm bg-sky-400 join-item" onClick={()=>handlePremium(item._id)}>Premium</button>
                        <button className="btn btn-sm bg-success join-item" onClick={()=>handleApprove(item._id)}>Approve</button>
                        <button className="btn btn-sm bg-secondary join-item" onClick={()=>handleDecline(item._id)}>Decline</button>
                        <button className="btn btn-sm bg-error join-item" onClick={()=>handleDelete(item._id)}>Delete</button>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='pagination'>
          <button onClick={handlePrev}>Prev</button>
                {
                    pages.map(page=><button  className={ currentPage === page ?'selected' : undefined } onClick={()=>setCurrentPage(page)}>
                             {page+1}
                        </button>)
                }
                <button  onClick={handleNext}>Next</button>
                <select value={numberOfItems} className='border' onChange={handleNumberOfItem}>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
          </div>
        </div>
      </div>
    );
};

export default AllArticle;