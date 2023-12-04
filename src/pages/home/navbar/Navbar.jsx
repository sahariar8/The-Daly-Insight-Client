import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../assets/hook/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../../assets/hook/useAdmin";
import { GiNewspaper } from "react-icons/gi";
import useSubscription from "../../../assets/hook/useSubscription";



const Navbar = () => {
 
    const { user,logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const navigate = useNavigate();

    const [subscriber] = useSubscription();
    const userEmail = user?.email;
    const premiumUser = subscriber?subscriber.find(item=>item?.email == userEmail && item?.subscription === 'yes'):[];

    const handleLogOut = () =>{
        logOut()
        .then(()=>{
            Swal.fire({
                title: "Good job!",
                text: "Successfully Logged Out",
                icon: "Success"
              });
              navigate('/login');
        })
        .catch();
    }
    const item = (
        <>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-articles">All Articles</Link>
          </li>
          {
            user &&
            <>
              <li>
                <Link to="/add-article">Add Articles</Link>
              </li>
              
              <li>
                <Link to="/subscription">Subscription</Link>
              </li> 
              <li>
                <Link to="/my-article">My Articles</Link>
              </li>
             {
                premiumUser &&
                <li>
                    <Link to="/premium-article">Premium Articles</Link>
                </li>
             }
            </>
          }
          {
            isAdmin && 
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
          }
        </>
    )

  return (
    <div className="navbar md:text-black shadow-lg max-w-screen-xl">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52  font-semibold">
         {item}
        </ul>
      </div>
      <Link to='/'><a className="btn btn-ghost normal-case md:text-xl font-racing"><GiNewspaper /><span className="text-red-600">The Daily Insight</span></a></Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1 font-semibold">
        {item}
      </ul>
    </div>
    <div className="navbar-end">
    {
        user ? 
          <div className="flex items-center">
           
           <div className="avatar online">
              <div className="w-8 md:w-12 rounded-full">
                <Link to='/profile'><img src={user?.photoURL}/></Link>
              </div>
            </div>
          
            
            <h1 className="btn btn-sm normal-case btn-neutral ml-2 mr-5 text-base font-semibold" onClick={handleLogOut}>LogOut</h1>
            
          </div>
         : 
          <>
          <Link to="/login">LogIn</Link>
          <Link to="/register" className='m-5'>Register</Link>
          </>
        
    }
    </div>
  </div>
  );
};

export default Navbar;
