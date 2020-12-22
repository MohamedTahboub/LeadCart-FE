import React, { useRef } from 'react';
import ids from 'shortid';
import { useDrag, useDrop } from 'react-dnd';
import { MdDelete, MdDragHandle } from 'react-icons/md';

import common from 'components/common';
import Image from './Image';

import './style.css';

const { FlexBox } = common;

const Item = ({ onDelete, onImageChange, img, index, moveCard, id, ele }) => {
  const dropTypes = { sliderContentController: Symbol('SLIDER_CONTENT_CONTROLLER') };
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: dropTypes.sliderContentController,

    hover (item) {
      if (!ref.current)
        return;

      const dragIndex = item.index;
      const hoverIndex = index;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });


  const [{ isDragging }, drag] = useDrag({
    item: { type: dropTypes.sliderContentController, ele, id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });


  drag(drop(ref));

  return (
    <FlexBox className='image-slider-add-one-item v-center mb-2' ref={drag} >
      <MdDragHandle className='image-slider-add-item-move' />
      <Image
        img={img}
        onImageChange={onImageChange}
        name='content.list'
        className='image-slider-add-item-image mx-3'
      />
      <MdDelete className='image-slider-add-item-delete' onClick={onDelete} />
    </FlexBox>

  );
};

export default Item;
