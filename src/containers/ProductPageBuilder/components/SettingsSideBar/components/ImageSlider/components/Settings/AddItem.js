import React from 'react';
import ids from 'shortid';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';


import common from 'components/common';
import defaultDropImage from 'assets/images/upload-image.png';
import { useContext } from '../../../../../../actions';
import Item from './Item';

import './style.css';

const { FlexBox, Button } = common;

const ImageSliderSettings = ({ moveCard }) => {

  const {
    state:
     { modals: { sectionSetting = {} } = {} }
     = {},
    actions = {}
  } = useContext();

  const { content = {} } = sectionSetting;
  const { list } = content;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };


  const onAddNewItem = () => {
    const target = { name: 'content.list', value: [...content.list, { img: defaultDropImage, id: ids.generate() }] };
    onChange({ target });
  };


  const onImageChange = (selectedIndex) => ({ value: newImage, name }) => {
    const newList = list.map((ele, index) => {
      if (selectedIndex === index)
        return { ...ele, img: newImage };
      else
        return ele;
    });

    actions.onSectionSettingChange({
      section: sectionSetting,
      field: { name, value: newList }
    });
  };


  const onDeleteItem = (selectedIndex) => () => {
    const newList = list.filter((ele, index) => selectedIndex !== index);

    actions.onSectionSettingChange({
      section: sectionSetting,
      field: { name: 'content.list', value: newList }
    });
  };

  return (
    <FlexBox className='image-slider-add-item-container mt-2' column>
      <Button className='mb-3 light-btn' onClick={onAddNewItem}>
         Add New Item
      </Button>

      <FlexBox className='image-slider-add-item-content v-center' column>
        <DndProvider backend={Backend}>
          {
            list.map((ele, index) => {
              return (
                <Item
                  img={ele?.img}
                  onImageChange={onImageChange(index)}
                  onDelete={onDeleteItem(index)}
                  index={index}
                  moveCard={moveCard}
                  id={ele.id}
                  ele={ele}
                />
              );
            })
          }
        </DndProvider>
      </FlexBox>
    </FlexBox>
  );
};

export default ImageSliderSettings;
