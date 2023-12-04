import { Link } from 'react-router-dom';
import banner from '../../assets/banner/subs.webp'
import useAuth from '../../assets/hook/useAuth';
import SectionTitle from '../shared/SectionTitle';



import Select from 'react-select';
//modal

import { useState } from 'react'
import SubscriptionModal from './subscriptionModal';
import { useQuery } from '@tanstack/react-query';
import useSubscription from '../../assets/hook/useSubscription';

const options = [
  { value: '5', label: '1 minute for $5' },
  { value: '10', label: '5 days for $10' },
  { value: '15', label: '10 days for $15' },
];

const Subscription = () => {
  
    const { user } = useAuth();
    const subscriber = useSubscription();
    // console.log(subscriber[0]);
    const findUser = subscriber[0].filter(item=>item.email === user.email);

    // console.log(findUser[0]);
    let [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);

    const value = selectedOption?.value;
    // console.log(value);
    const savePrice = localStorage.setItem('price',value);
    // console.log(savePrice);

  

    const handleSubscription = (email) =>{
            // console.log(email);
            setIsOpen(true);
           
          
    }
    const [subscriptionInfo,setSubscriptionInfo ] = useState({
      name:user?.displayName,
      email:user?.email,
      userId:findUser[0]?._id,
    })

  //  console.log(subscriptionInfo);
  
    const closeModal =()=>{
        setIsOpen(false);
    }
    return (
      <div className="py-10">
        <SectionTitle title={"Subscribe Your Plans"}></SectionTitle>
        <div data-aos="flip-right">
          <img className="rounded w-full" src={banner} alt="" />
        </div>
        <div className="py-10">
          <h1 className="font-slobo text-emerald-400 text-center font-bold text-3xl md:text-5xl">
            Hurry Up, <span className="text-yellow-600">Time is Too Short</span>
          </h1>
          <h1 className="font-slobo text-rose-700 text-center font-bold text-5xl">
            Subscribe Now
          </h1>
        </div>
        <div className="md:w-1/2 mx-auto flex items-center">
          <Select
            className="w-3/4 py-2"
            name='plan'
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
          <Link>
            <input
              className="btn block btn-secondary hover:text-pink-900 ml-2"
              type="submit"
              disabled={!selectedOption}
              value={"Subscribe"}
              onClick={()=>handleSubscription(user?.email)}
            />
          </Link>
        </div>
       <SubscriptionModal closeModal={closeModal} isOpen={isOpen} subscriptionInfo={subscriptionInfo}></SubscriptionModal>
      

      </div>
    );
};

export default Subscription;