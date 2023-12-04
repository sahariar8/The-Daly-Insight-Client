import React from 'react';

const SectionTitle = ({title}) => {
    return (
        <div className='text-center font-slobo font-bold md:text-5xl text-2xl'>
            <h1 className='text-yellow-700 border-y-2 md:w-1/4 mx-auto'>{title}</h1> 
        </div>
    );
};

export default SectionTitle;