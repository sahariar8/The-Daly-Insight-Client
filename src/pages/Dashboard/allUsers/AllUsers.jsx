import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../assets/hook/useAxiosPublic';
import { FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../../assets/hook/useAuth';
import useAxiosSecure from '../../../assets/hook/useAxiosSecure';


const AllUsers = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
   
    const { data : users = [], refetch} = useQuery({
        queryKey:['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users');
            return res.data;  
        }
    })

    const handleDelete = (id) =>{
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
                axiosPublic.delete(`/users/${id}`)
                .then(res=>{
                    console.log(res.data);
                    if(res.data.deletedCount > 0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          }); 
                    } 
                })
               
            }
          });
    }

    const handleMakeAdmin = (user) =>{
       axiosSecure.patch(`/users/admin/${user._id}`)
       .then(res=>{
        console.log(res.data);
        if(res.data.modifiedCount > 0){
            refetch();
            Swal.fire({
                title: "Good job!",
                text: `${user.name} is admin Now`,
                icon: "success"
              });
        }
       })


    }




    return (
        <div>
            <SectionTitle title='All Users'></SectionTitle>
            <div>
      <h1 className="text-sm md:text-5xl pt-2 md:pt-5 text-center text-orange-300 font-bold">
        Manage All Users
      </h1>
      <div className="pt-4 md:pt-10">
        <div className="overflow-x-auto">
          <h1 className="text-2xl md:text-3xl py-3 font-semibold text-slate-600">
            Total User:{users.length}
          </h1>
          <table className="table">
            {/* head */}
            <thead className="bg-orange-300  text-base">
              <tr>
                <th>#sl</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              {users.map((item, index) => (
                <tr key={item._id}>
                  <th>
                    <label>{index + 1}</label>
                  </th>
                  <th>
                    <img src={item.image} alt="" className='w-12 h-12' />
                  </th>
                  <th>{item.name}</th>
                  <th>{item.email}</th>
                  <td>
                  {
                    item.role === "admin"? <>
                        <h1 className=" font-serif font-semibold text-red-600 p-1">admin</h1>
                    </>
                    :
                    <button
                      className="btn btn-warning btn-xs"
                      onClick={() => handleMakeAdmin(item)}
                    >
                      <FaUsers className="text-xl text-white" />Make Admin
                    </button>
                  }
                  </td>
                  <th className="flex gap-2">
                    {
                        user?.email === item.email ?<button className='btn btn-xs disabled'>Delete</button>
                        :
                        <>
                        <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button></>
                    }
                   
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </div>
    );
};

export default AllUsers;