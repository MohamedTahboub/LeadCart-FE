import React, { Component } from 'react';

//Images
import Star from 'assets/images/star.png';
import DottedSquare from 'assets/images/dotted-square.png';
import Snake from 'assets/images/snake.png';
import Rectangle from 'assets/images/rectangle.png';
import CircularSection from 'assets/images/circular-section.png';
import SmallCircularSection from 'assets/images/small-circular-section.png';
import StripedCircle from 'assets/images/striped-circle.png';
import LeadcartSquare1 from 'assets/images/leadcart-square-1.png';
import LeadcartSquare2 from 'assets/images/leadcart-square-2.png';

export const LeadcartSquare = () => (
    <div className="absolute-images">
        <img src={LeadcartSquare1} className="leadcart-square-1" />
        <img src={LeadcartSquare2} className="leadcart-square-2" />
    </div>
);

export const BackgroundImagesPart1 = () => (
    <div className="absolute-images">
        <img src={Star} className="star star-1" />
        <img src={Snake} className="snake snake-1" />
    </div>
);

export const BackgroundImagesPart2 = () => (
    <div className="absolute-images">
        <img src={Star} className="star star-2" />
        <img src={DottedSquare} className="dotted-square" />
        <img src={Snake} className="snake snake-2" />
        <img src={Rectangle} className="rectangle" />
        <img src={CircularSection} className="circular-section" />
        <img src={SmallCircularSection} className="small-circular-section" />
        <img src={StripedCircle} className="striped-circle" />
    </div>
);