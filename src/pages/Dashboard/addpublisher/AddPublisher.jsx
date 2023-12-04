import React from 'react';
import SectionTitle from '../../shared/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../assets/hook/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../assets/hook/useAxiosSecure';


const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddPublisher = () => {
   const axiosSecure = useAxiosSecure();
    const { register, handleSubmit,reset} = useForm();
    const onSubmit = async(data)=>{
        console.log(data);
        const imagefile = { image: data.image[0] };
        console.log(imagefile)
        const res = await axiosSecure.post(image_hosting_api,imagefile,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        console.log(res.data);
            const take =  data.name;
            const name = take.toLowerCase();
            const image =  res.data.data.display_url;
            if(res.data.success){
                const user = {name,image};
                axiosPublic.post('/publishers',user)
                .then(res=>{
                    if(res.data.insertedId){
                        Swal.fire({
                            title: "Good job!",
                            text: "Add Publisher Successfully",
                            icon: "success"
                          });
                        reset();  
                    }
                })
            }

    }
    return (
        <div>
            <SectionTitle title='Add Publisher'></SectionTitle>
            <div className="card shadow-2xl w-full md:px-10 mt-10">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)} >
            <h1 className="text-3xl md:text-5xl font-bold text-center text-cyan-600">Add Publisher</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name"  className="input input-bordered" {...register('name')} required />
              </div>
              <input type="file" className="file-input w-full max-w-xs" {...register('image')} />
              <div className="form-control mt-6">
                <button  className="btn bg-cyan-600 hover:bg-cyan-700 text-white" type='submit'>Add Publisher</button>
              </div>
              
            </form>   
          </div>
        </div>
    );
};

export default AddPublisher;