import React from 'react';
import SectionTitle from '../shared/SectionTitle';
import useAxiosSecure from '../../assets/hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../assets/hook/useAuth';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useAxiosPublic from '../../assets/hook/useAxiosPublic';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyArticle = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const { data : mynews = [],refetch } = useQuery({
        queryKey:['mynews'],
        queryFn: async ()=>{
          // const email = user.email;
          // console.log(email)
            const res = await axiosSecure.get(`/news/${user.email}`);
            console.log(res.data);
            return res.data;
          
        }
    })

    const handleDelete =(id)=>{
      console.log(id);
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
         axiosPublic.delete(`/news/${id}`)
         .then(res=>{
          console.log(res.data);
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

    const handleDeclineReason = ()=>{
      Swal.fire(
        'error!',
        'Your article Decline By Admin For Valid Reason.Your Article may be copied',
        'error'
      )
    }

    return (
        <div className='py-10'>
            <SectionTitle title='My Article'></SectionTitle>
            <div className="pt-4 md:pt-10">
        <div className="overflow-x-auto">
          <h1 className="text-2xl md:text-3xl py-3 font-semibold text-slate-600">
            My Total News:{mynews.length}
          </h1>
          <table className="table">
            {/* head */}
            <thead className="bg-orange-300 text-center  text-base">
              <tr>
                <th>#sl</th>
                <th>Title</th>
                <th>Details</th>
                <th>Status</th>
                <th>isPremium</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 text-center">
              {mynews.map((item, index) => (
                <tr key={item._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <th>{item.title}</th>
                  <th>
                    {item.description.slice(0,20)}... <br />
                    <Link to={`/details/${item._id}`}><button className='btn btn-sm bg-fuchsia-400'>Details</button></Link>
                  </th>
                  <th>
                    {
                       item.status? item.status ==="Published"?<h1 className='bg-success p-2 font-bold rounded-lg text-white'>{item.status}</h1> 
                       :<>
                          <h1 className='font-bold btn-sm  rounded-lg text-error'>Decline</h1>
                          <h1 className='btn bg-error p-2 font-bold rounded-lg btn-sm text-white' onClick={handleDeclineReason}>Reason</h1>
                       </>
                       :<h1 className='bg-warning p-2 font-bold rounded-lg text-white'>Pending</h1>
                    }
                  </th>
                  <th>
                    {
                      item.premium?item.premium ==='Yes'?<h1 className='text-success font-bold'>Yes</h1>
                      :<h1 className='text-error font-bold'>No</h1>
                      :<h1 className='text-error font-bold'>No</h1>
                    }
                  </th>
                  <th>
                   <Link to={`/update-mynews/${item._id}`}><button className='btn btn-warning'><FaEdit className='text-white text-xl'/></button></Link>
                    <button className='btn btn-error ml-2' onClick={()=>handleDelete(item._id)}><FaTrash className='text-white text-xl'/></button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table> 
        </div>
      </div>
        </div>
    );
};

export default MyArticle;