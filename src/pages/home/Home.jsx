import React from 'react';
import Banner from './Banner/Banner';
import Plans from './plans/Plans';
import Publisher from './publisher/publisher';
import Statistic from './statistic/Statistic';
import Modal from './modal/Modal';
import News from './news/News';
import Slider from './slider/Slider';
import Location from './location/location';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <News></News>
            <Slider></Slider>
            <Publisher></Publisher>
            <Modal></Modal>
            <Statistic></Statistic>
            <Plans></Plans>
            <Location></Location>
        </div>
    );
};

export default Home;