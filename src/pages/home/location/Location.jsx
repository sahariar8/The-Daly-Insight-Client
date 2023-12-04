import React from 'react';
import SectionTitle from '../../shared/SectionTitle';

const Location = () => {
    return (
        <div className='py-10'>
           <SectionTitle title={"Location"}></SectionTitle>
           <div className='pt-5'>
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.7346711976156!2d90.36142897597394!3d23.82803228579039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c13a21730b43%3A0xb14a9c52d01c00d9!2z4Kau4Ka_4Kaw4Kaq4KeB4KawLeCnp-CnqCDgpqzgpr7gprgg4Ka44KeN4Kaf4KeN4Kav4Ka-4Kao4KeN4Kah!5e0!3m2!1sbn!2sbd!4v1699361739711!5m2!1sbn!2sbd" height="450"  loading="lazy"  className='w-screen md:w-full rounded-lg'></iframe>
           </div>
        </div>
    );
};

export default Location;