/* eslint-disable indent */
import React from 'react';

import {
  FaAngleDown, FaAngleUp,
  FaCaretSquareDown, FaCaretSquareUp,
  FaCheck, FaCheckCircle,
  FaCheckSquare, FaEye,
  FaEyeSlash, FaMinus,
  FaMinusCircle, FaMinusSquare,
  FaPlus, FaPlusCircle,
  FaPlusSquare, FaRegCheckCircle,
  FaRegCheckSquare,
  FaRegHandPointDown, FaRegHandPointUp,
  FaRegThumbsDown, FaRegThumbsUp,
  FaRegTimesCircle,
  FaRegWindowClose, FaSortDown,
  FaSortUp, FaTimes,
  FaTimesCircle, FaWindowClose
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
