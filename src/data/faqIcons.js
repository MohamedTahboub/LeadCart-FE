/* eslint-disable indent */
import React from 'react';

import {
  FaAngleDown, FaAngleUp,
  FaArrowRight, FaCaretSquareDown,
  FaCaretSquareUp, FaCheck,
  FaCheckCircle, FaCheckSquare,
  FaEye, FaEyeSlash,
  FaMinus, FaMinusCircle,
  FaMinusSquare, FaPlus,
  FaPlusCircle, FaPlusSquare,
  FaRegCheckCircle,
  FaRegCheckSquare, FaRegHandPointDown,
  FaRegHandPointUp, FaRegThumbsDown,
  FaRegThumbsUp,
  FaRegTimesCircle, FaRegWindowClose,
  FaSortDown, FaSortUp,
  FaTimes, FaTimesCircle,
  FaWindowClose
} from 'react-icons/fa';


export const getIcon = (iconName) => {
  switch (iconName) {
    case 'FaPlusCircle':
      return { OpenIcon: FaPlusCircle, CloseIcon: FaMinusCircle };
    case 'FaPlusSquare':
      return { OpenIcon: FaPlusSquare, CloseIcon: FaMinusSquare };
    case 'FaPlus':
      return { OpenIcon: FaPlus, CloseIcon: FaMinus };
    case 'FaCaretSquareDown':
      return { OpenIcon: FaCaretSquareDown, CloseIcon: FaCaretSquareUp };
    case 'FaSortDown':
      return { OpenIcon: FaSortDown, CloseIcon: FaSortUp };
    case 'FaAngleDown':
      return { OpenIcon: FaAngleDown, CloseIcon: FaAngleUp };
    case 'FaCheckCircle':
      return { OpenIcon: FaCheckCircle, CloseIcon: FaTimesCircle };
    case 'FaCheckSquare':
      return { OpenIcon: FaCheckSquare, CloseIcon: FaWindowClose };
    case 'FaRegCheckCircle':
      return { OpenIcon: FaRegCheckCircle, CloseIcon: FaRegTimesCircle };
    case 'FaRegCheckSquare':
      return { OpenIcon: FaRegCheckSquare, CloseIcon: FaRegWindowClose };
    case 'FaCheck':
      return { OpenIcon: FaCheck, CloseIcon: FaTimes };
    case 'FaRegThumbsDown':
      return { OpenIcon: FaRegThumbsDown, CloseIcon: FaRegThumbsUp };
    case 'FaRegHandPointDown':
      return { OpenIcon: FaRegHandPointDown, CloseIcon: FaRegHandPointUp };
    case 'FaEye':
      return { OpenIcon: FaEye, CloseIcon: FaEyeSlash };
    default:
      return { OpenIcon: FaPlusCircle, CloseIcon: FaMinusCircle };
  }
};

export const getIconLabel = (iconName) => {
  const { OpenIcon, CloseIcon } = getIcon(iconName);
  return (<div className='faq-settings-icons'>
    <OpenIcon />
    <FaArrowRight />
    <CloseIcon />
  </div>);

};

export const options = [
  { value: 'FaRegCheckCircle', label: getIconLabel('FaRegCheckCircle') },
  { value: 'FaPlusCircle', label: getIconLabel('FaPlusCircle') },
  { value: 'FaCheckCircle', label: getIconLabel('FaCheckCircle') },
  { value: 'FaPlusSquare', label: getIconLabel('FaPlusSquare') },
  { value: 'FaCheckSquare', label: getIconLabel('FaCheckSquare') },
  { value: 'FaRegCheckSquare', label: getIconLabel('FaRegCheckSquare') },
  { value: 'FaCaretSquareDown', label: getIconLabel('FaCaretSquareDown') },
  { value: 'FaSortDown', label: getIconLabel('FaSortDown') },
  { value: 'FaAngleDown', label: getIconLabel('FaAngleDown') },
  { value: 'FaRegThumbsDown', label: getIconLabel('FaRegThumbsDown') },
  { value: 'FaRegHandPointDown', label: getIconLabel('FaRegHandPointDown') },
  { value: 'FaPlus', label: getIconLabel('FaPlus') },
  { value: 'FaCheck', label: getIconLabel('FaCheck') },
  { value: 'FaEye', label: getIconLabel('FaEye') },
  { value: true, label: 'Custom Bullets' }
];
