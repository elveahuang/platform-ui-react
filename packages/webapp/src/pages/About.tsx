import React, { FC } from 'react';
//
import './About.scss';
import { SketchPicker } from 'react-color';

const About: FC = () => {
    return (
        <div className="text-center">
            <SketchPicker />
            <div className="text-center">About Us</div>;
        </div>
    );
};

export default About;
