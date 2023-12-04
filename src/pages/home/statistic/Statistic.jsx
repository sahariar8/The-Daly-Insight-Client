import  { useState } from 'react';
import SectionTitle from '../../shared/SectionTitle';
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../assets/hook/useAxiosSecure';
import useSubscription from '../../../assets/hook/useSubscription';
import useAxiosPublic from '../../../assets/hook/useAxiosPublic';

const Statistic = () => {

  const axiosSecure = useAxiosSecure();
  const [subscriber] = useSubscription();
  const normalUser = subscriber.filter(item=>item.subscription == 'no');
  const premiumUser = subscriber.filter(item=>item.subscription == 'yes');
  
   const [countrOn,setCounterOn] = useState(false);
   const { data } = useQuery({
     queryKey:['data',axiosSecure],
     queryFn:async()=>{
      const res = await axiosSecure.get('/admin/stats');
     
      return res.data;
     }
   })
    return (
      <div className="py-10">
        <SectionTitle title="Statistic"></SectionTitle>
        <div className="grid md:grid-cols-3 gap-10 py-10">
       <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
         
            <div className="card bg-neutral text-neutral-content"data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
              <div className="card-body items-center text-center">
                <h2 className="card-title font-bold text-5xl">
                    {
                        countrOn && <CountUp start={0} end={data?.totalUser} duration={3} delay={0}>
                                +
                        </CountUp>
                    }
                </h2>
                 <h1 className='text-2xl text-emerald-500 font-bold'>Total Users</h1>
              </div>
            </div>
            </ScrollTrigger>
       <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
         
            <div className="card bg-neutral text-neutral-content" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
              <div className="card-body items-center text-center">
                <h2 className="card-title font-bold text-4xl">
                    {
                        countrOn && <CountUp start={0} end={normalUser?.length?normalUser?.length : 5} duration={3} delay={0}>
                                +
                        </CountUp>
                    }
                </h2>
                 <h1 className='text-2xl text-emerald-500 font-bold'>Normal Users</h1>
              </div>
            </div>
            </ScrollTrigger>
       <ScrollTrigger onEnter={()=>setCounterOn(true)} onExit={()=>setCounterOn(false)}>
         
            <div className="card bg-neutral text-neutral-content" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
              <div className="card-body items-center text-center">
                <h2 className="card-title font-bold text-4xl">
                    {
                        countrOn && <CountUp start={0} end={premiumUser?.length? premiumUser?.length : 3} duration={2} delay={0}>
                                +
                        </CountUp>
                    }
                </h2>
                 <h1 className='text-2xl text-emerald-500 font-bold'>Premium Users</h1>
              </div>
            </div>
            </ScrollTrigger>
          </div>
         
      </div>
    );
};

export default Statistic;