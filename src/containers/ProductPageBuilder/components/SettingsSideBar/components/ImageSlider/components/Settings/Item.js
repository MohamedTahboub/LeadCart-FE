import React, { useRef } from 'react';
import ids from 'shortid';
import { useDrag, useDrop } from 'react-dnd';
import { MdDelete, MdDragHandle } from 'react-icons/md';

import common from 'components/common';
import Image from './Image';

import './style.css';

const { FlexBox } = common;
// this line was declared in the Item function component, and it was a bug doing that,
// since the Symbol will be deferent for each render and the dnd will never accept the dropped item
const dropTypes = { sliderContentController: Symbol('SLIDER_CONTENT_CONTROLLER') };
const Item = ({ onDelete, onImageChange, img, index, moveCard, id, ele }) => {

  const [{ isOver }, drop] = useDrop({
    accept: dropTypes.sliderContentController,
    drop: (item) => {
      // ignore if its dragged over itself
      if (index === item.index)
        return;
      moveCard(item.index, index);
    },
    // hover (item) {
    //   if (!ref.current)
    //     return;

    //   const dragIndex = item.index;
    //   const hoverIndex = index;

    //   moveCard(dragIndex, hoverIndex);
    //   item.index = hoverIndex;
    // },
    collect: (monitor) => ({ isOver: monitor.isOver() })
  });


  const [{ isDragging }, drag] = useDrag({
    item: { type: dropTypes.sliderContentController, ele, id, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  const style = { opacity: isOver ? 0.6 : isDragging ? 0 : 1 };

  return (
    <FlexBox className='image-slider-add-one-item v-center mb-2' style={style} elementRef={(ref) => ref && drop(ref)}>
      <div ref={drag}>
        <MdDragHandle className='image-slider-add-item-move' size={24} />
      </div>
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
