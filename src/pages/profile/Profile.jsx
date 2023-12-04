import React from 'react';
import useAuth from '../../assets/hook/useAuth';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user,loading } = useAuth();
    return (
      <div>
        {
            loading && <span className="loading loading-infinity loading-lg"></span>
        }
        <h1 className="text-center text-5xl text-yellow-800 font-bold pt-10">
          Profile
        </h1>
        <div className="divider w-40 mx-auto"></div>
        <div className="p-20 bg-base-100 shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
           <div className='w-1/4'>
            <img
                src={user?.photoURL}
                className="md:w-full rounded-lg shadow-2xl"
                />
           </div>
           
             <div className='md:w-3/4 ml-10'>
                <h1 className="text-3xl font-bold">Name: {user?.displayName}</h1>
                <p className="py-3 font-bold">
                   Email: { user?.email }
                </p>
                <Link to='/update-profile' className="btn btn-info text-white">Update Profile</Link>
             </div>
            
          </div>
        </div>
      </div>
    );
};

export default Profile;