

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


import SectionTitle from '../shared/SectionTitle';
import useAxiosPublic from '../../assets/hook/useAxiosPublic';
import useAuth from '../../assets/hook/useAuth';
import { reload } from 'firebase/auth';



const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateProfile = () => {

    const {user,userProfileUpdate} = useAuth();
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const onSubmit = async(data)=>{
        console.log(data)
        const imagefile = { image: data.image[0] };
        console.log(imagefile)
        const res = await axiosPublic.post(image_hosting_api,imagefile,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        console.log(res.data);
            const name =  data.name;
            const image =  res.data.data.display_url;
            const email = user.email;
            console.log(email);

            if(res.data.success){
                const value = {name,image,email};
                console.log(value);
             
                const res = await axiosPublic.put(`/users/${email}`,value);
                console.log(res.data,'dala');
                if(res.data.modifiedCount > 0){
                  Swal.fire({
                    title: "Good job!",
                    text: "Profile updated SuccessFully",
                    icon: "success"
                  });
                  navigate('/profile');
                  userProfileUpdate(name,image)
                  .then(()=>{
                    console.log('update done');
                  })
                  .catch(error=>{
                    console.log(error)
                  })
                }
            }

    }

    return (
        <div  className='py-10'>
           <SectionTitle title='Profile Update'></SectionTitle>
           <div className="card shadow-2xl md:w-1/2 md:px-10 w-full mx-auto py-10">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)} >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" defaultValue={user.displayName} className="input input-bordered" {...register('name')} required />
              </div>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" defaultValue={user.email} className="input input-bordered" {...register('email')} required />
              </div> */}
              <input type="file" className="file-input w-full max-w-xs" {...register('image')} />
              <div className="form-control mt-6">
                <button  className="btn bg-cyan-600 hover:bg-cyan-700 text-white" type='submit'>Update</button>
              </div>
            </form>
          </div>
        </div>
    );
};

export default UpdateProfile;