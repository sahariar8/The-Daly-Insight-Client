
// import { NavLink, Outlet } from 'react-router-dom';
// import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUsers, FaUtensils, FaWallet } from "react-icons/fa";
// import { MdOutlineRestaurantMenu } from "react-icons/md";
// import useAdmin from '../../assets/hooks/useAdmin';
// import useCart from '../../assets/hooks/useCart';

import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../assets/hook/useAuth";
import { FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import Statistics from "./statistics/Statistics";


const Dashboard = () => {
    const {user} = useAuth();
    // const [isAdmin] = useAdmin();
    // const [cart] = useCart();
    return (
        <div className='flex max-w-screen-xl mx-auto'>
           <div className='w-2/5 md:w-1/5 bg-orange-300 min-h-screen  px-2'>
            <h1 className='text-sm md:text-3xl pt-6 font-bold font-slobo '>The Daily Insight</h1>
            <h1 className='text-sm md:text-xl font-bold font-slobo pt-2 flex items-center'><FaHome className="text-white mr-2"/>Admin Home</h1>
           
           
             <ul className='menu md:p-4 md:font-semibold text-sm p-0 pt-3' >
              
                   
                  
                    <li><NavLink to='/dashboard/allusers'><FaUsers/>All Users</NavLink></li>
                    <li><NavLink to='/dashboard/allarticle'><FaUsers/>All Articles</NavLink></li>
                    <li><NavLink to='/dashboard/addpublisher'><FaUsers/>Add Publisher</NavLink></li>
                   
                    
              
               <div className="divider"></div>
                    <li><NavLink to='/'><FaHome/>Home</NavLink></li>
                   
               
            </ul> 

           </div>
           <div className='w-3/5 md:w-4/5'>
                <div className='py-10 px-10'>
                <Outlet></Outlet>
                </div>
           </div>
        </div>
    );
};

export default Dashboard;