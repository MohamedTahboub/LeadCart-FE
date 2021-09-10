import { isFunction } from 'libs/checks';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const SAME_TYPE = 'SAME';

const checkIsOverMidWay = ({ dragIndex, hoverIndex, ref, monitor }) => {
  const hoverBoundingRect = ref.current?.getBoundingClientRect();
  const hoverMiddleY =
    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const clientOffset = monitor.getClientOffset();
  const hoverClientY = clientOffset.y - hoverBoundingRect.top;

  if (
    // Dragging downwards
    (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
    // Dragging upwards
    (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
  ) return false;

  return true;
};

const DragDropItem = ({ children, id, onOrderChange, index, style, cardType, ...props }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: cardType,
    item: { id, index, type: cardType },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  const [{ handlerId }, drop] = useDrop({
    accept: cardType,
    collect (monitor) {
      return { handlerId: monitor.getHandlerId(), isHover: monitor.canDrop() };
    },
    hover (item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // check if the dragend item over the item middle
      const isMidWay = checkIsOverMidWay({ dragIndex, hoverIndex, ref, monitor });

      if (!isMidWay) return;

      if (isFunction(onOrderChange)) onOrderChange(dragIndex, hoverIndex);
      // data mutated for performance reasons
      item.index = hoverIndex;
    }
  });


  const opacity = isDragging ? 0 : 1;
  const localStyle = {
    ...style,
    opacity
  };

  drag(drop(ref));
  return (
    <div style={localStyle} data-handler-id={handlerId} {...props} ref={ref}>
      {children}
    </div>
  );
};
DragDropItem.defaultProps = { cardType: SAME_TYPE };

export default DragDropItem;
