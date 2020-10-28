import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import useEventListener from '@use-it/event-listener';
import './style.css';

export { SketchPicker };
const COLOR_PICKER_ID = 'color-picker';
const onKeyDown = (event, setShow, show) => {
  console.log({ event });
  console.log(event.key, event.target);

  if (event.target?.id !== COLOR_PICKER_ID && show)
    setShow(false);

};

export const MiniColorPicker = ({
  value,
  onChange,
  name
}) => {
  const [show, setShow] = useState(false);

  useEventListener('keydown', console.log);

  const onColorChange = (color = {}) => {
    const { rgb = {} } = color;
    const { r, g, b, a } = rgb;
    onChange({
      target: {
        name,
        value: `rgba(${r},${g},${b},${a})`
      }
    });
  };

  // useEffect(() => {

  //   return () => {
  //     if (show)
  //       setShow(false);
  //   };
  // }, []);


  const style = { background: value };
  return (
    <div className='color-picker-modal' id={COLOR_PICKER_ID}>
      <div
        onClick={() => setShow(!show)}
        style={style}
        className='color-presentation-holder'
        role='presentation'
      />
      {show && (
        <div className='twitter-picker-holder'>
          <SketchPicker
            display={show}
            width='210px'
            triangle='top-right'
            color={value}
            onChange={onColorChange}
          />
        </div>
      )}
    </div>
  );
};

