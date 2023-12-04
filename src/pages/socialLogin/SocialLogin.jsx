
import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../assets/hook/useAxiosPublic";
import { AuthContext } from "../provider/ContextProvider";



const SocialLogin = () => {

    const {googleSign} = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic() ;

    const handleGoogle = () =>{
        googleSign()
        .then(result=>{
          // console.log(result.user);
          
          const userInfo = {
            name : result.user?.displayName,
            email : result.user?.email,
            image : result.user?.photoURL,
            subscription: 'no'


          }
          axiosPublic.post('/users',userInfo)
          .then(res=>{
            console.log(res.data);
          })
          
          Swal.fire({
            title: "SucessFully Login ",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
          navigate('/');
        })
        .catch(error=>{
          console.log(error);
        })
      }

    return (
        <div>
             <div className="divider">OR</div>
             <div className='py-5 px-8'>
                <button className='btn btn-accent w-full' onClick={handleGoogle}><FaGoogle className='text-white' />Google</button>
             </div>
        </div>
    );
};

export default SocialLogin;