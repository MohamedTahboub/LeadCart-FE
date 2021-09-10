import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import useEventListener from '@use-it/event-listener';
import './style.css';
import { nodeHasChildElement } from 'libs';

export { SketchPicker };
const COLOR_PICKER_ID = 'color-picker';

export const MiniColorPicker = ({
  value,
  onChange,
  name
}) => {
  const [show, setShow] = useState(false);


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


  const style = { background: value };
  const onClose = () => {
    if (show) setShow(false);
  };
  return (
    <div className='color-picker-modal' >
      <div
        onClick={() => setShow(!show)}
        style={style}
        className='color-presentation-holder'
        role='presentation'
      />
      {show && (
        <PickerPopUp
          color={value}
          onChange={onColorChange}
          onClose={onClose}
        />
      )}
    </div>
  );
};

const PickerPopUp = ({
  color,
  onChange,
  onClose
}) => {

  const onKeyDown = (e) => {
    const parentElement = document.getElementById(COLOR_PICKER_ID);
    if (!parentElement) return;
    const isIgnored = nodeHasChildElement(parentElement, e.target);

    if (!isIgnored)
      onClose();
  };

  useEventListener('click', onKeyDown);

  return (
    <div className='twitter-picker-holder' id={COLOR_PICKER_ID}>
      <SketchPicker
        display
        width='210px'
        triangle='top-right'
        color={color}
        onChange={onChange}
      />
    </div>
  );
};

