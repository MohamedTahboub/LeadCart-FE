/* eslint-disable indent */
import React from 'react';
import common from 'components/common';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsArrowLeft, BsArrowLeftShort, BsArrowRight, BsArrowRightShort } from 'react-icons/bs';
import { FiArrowLeft, FiArrowLeftCircle, FiArrowRight, FiArrowRightCircle } from 'react-icons/fi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { RiArrowLeftCircleFill, RiArrowLeftCircleLine, RiArrowLeftFill, RiArrowLeftSFill, RiArrowRightCircleFill, RiArrowRightCircleLine, RiArrowRightFill, RiArrowRightSFill } from 'react-icons/ri';
import { TiArrowLeft, TiArrowLeftOutline, TiArrowLeftThick, TiArrowRight, TiArrowRightOutline, TiArrowRightThick } from 'react-icons/ti';
import { CgArrowLeftR, CgArrowRightR } from 'react-icons/cg';
const { FlexBox } = common;


export const getIcon = (iconName) => {
  switch (iconName) {
    case 'AiOutlineArrowLeft':
      return { PrevArrow: AiOutlineArrowLeft, NextArrow: AiOutlineArrowRight };
    case 'BsArrowLeftShort':
      return { PrevArrow: BsArrowLeftShort, NextArrow: BsArrowRightShort };
    case 'BsArrowLeft':
      return { PrevArrow: BsArrowLeft, NextArrow: BsArrowRight };
    case 'FiArrowLeftCircle':
      return { PrevArrow: FiArrowLeftCircle, NextArrow: FiArrowRightCircle };
    case 'FiArrowLeft':
      return { PrevArrow: FiArrowLeft, NextArrow: FiArrowRight };
    case 'FaArrowLeft':
      return { PrevArrow: FaArrowLeft, NextArrow: FaArrowRight };
    case 'GoArrowLeft':
      return { PrevArrow: GoArrowLeft, NextArrow: GoArrowRight };
    case 'ImArrowLeft':
      return { PrevArrow: ImArrowLeft, NextArrow: ImArrowRight };
    case 'MdKeyboardArrowLeft':
      return { PrevArrow: MdKeyboardArrowLeft, NextArrow: MdKeyboardArrowRight };
    case 'RiArrowLeftCircleLine':
      return { PrevArrow: RiArrowLeftCircleLine, NextArrow: RiArrowRightCircleLine };
    case 'RiArrowLeftCircleFill':
      return { PrevArrow: RiArrowLeftCircleFill, NextArrow: RiArrowRightCircleFill };
    case 'RiArrowLeftFill':
      return { PrevArrow: RiArrowLeftFill, NextArrow: RiArrowRightFill };
    case 'RiArrowLeftSFill':
      return { PrevArrow: RiArrowLeftSFill, NextArrow: RiArrowRightSFill };
    case 'TiArrowLeftOutline':
      return { PrevArrow: TiArrowLeftOutline, NextArrow: TiArrowRightOutline };
   case 'TiArrowLeftThick':
      return { PrevArrow: TiArrowLeftThick, NextArrow: TiArrowRightThick };
   case 'TiArrowLeft':
      return { PrevArrow: TiArrowLeft, NextArrow: TiArrowRight };
   case 'CgArrowLeftR':
      return { PrevArrow: CgArrowLeftR, NextArrow: CgArrowRightR };

    default:
      return { PrevArrow: AiOutlineArrowLeft, NextArrow: AiOutlineArrowRight };
  }
};

 const getIconLabel = (iconName) => {
  const { PrevArrow, NextArrow } = getIcon(iconName);
  return (
  <FlexBox className='v-center image-slider-arrows-options' spaceBetween >
    <PrevArrow size={16} />
    <NextArrow size={16} />
  </FlexBox>
  );

};

export const options = [
  { value: 'AiOutlineArrowLeft', label: getIconLabel('AiOutlineArrowLeft') },
  { value: 'BsArrowLeftShort', label: getIconLabel('BsArrowLeftShort') },
  { value: 'BsArrowLeft', label: getIconLabel('BsArrowLeft') },
  { value: 'FiArrowLeftCircle', label: getIconLabel('FiArrowLeftCircle') },
  { value: 'FiArrowLeft', label: getIconLabel('FiArrowLeft') },
  { value: 'FaArrowLeft', label: getIconLabel('FaArrowLeft') },
  { value: 'GoArrowLeft', label: getIconLabel('GoArrowLeft') },
  { value: 'ImArrowLeft', label: getIconLabel('ImArrowLeft') },
  { value: 'MdKeyboardArrowLeft', label: getIconLabel('MdKeyboardArrowLeft') },
  { value: 'RiArrowLeftCircleLine', label: getIconLabel('RiArrowLeftCircleLine') },
  { value: 'RiArrowLeftCircleFill', label: getIconLabel('RiArrowLeftCircleFill') },
  { value: 'RiArrowLeftFill', label: getIconLabel('RiArrowLeftFill') },
  { value: 'RiArrowLeftSFill', label: getIconLabel('RiArrowLeftSFill') },
  { value: 'TiArrowLeftOutline', label: getIconLabel('TiArrowLeftOutline') },
  { value: 'TiArrowLeftThick', label: getIconLabel('TiArrowLeftThick') },
  { value: 'TiArrowLeft', label: getIconLabel('TiArrowLeft') },
  { value: 'CgArrowLeftR', label: getIconLabel('CgArrowLeftR') },
  { value: true, label: 'Custom Bullets' }
];
