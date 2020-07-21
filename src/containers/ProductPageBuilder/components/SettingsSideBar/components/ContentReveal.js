import React, { useEffect, useState } from 'react';
import ids from 'shortid';
import { MdAddCircleOutline } from 'react-icons/md';
import Select from 'react-select';
import {
  FaAngleDown, FaAngleUp,
  FaArrowRight,
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

import common from 'components/common';
import { useContext } from '../../../actions';

const { Tabs, InputRow, FlexBox, Tab, MiniTwitterPicker } = common;
const { Label, AddImage } = InputRow;

const newItem = { content: 'Content Reveal', title: 'Title Reveal' };

const ContentRevealSettings = () => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const { styles = {}, content: { list = [] } = {} } = sectionSetting;
  const { bulletColor, toggleIcon, customOpenIcon = '', customCloseIcon = '' } = styles;

  const onChange = ({ target }) => {
    return actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };

  const onAddNewItem = () => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'content.list',
        value: [...list, { ...newItem, id: ids.generate() }]
      }
    });
  };

  const handleChange = (selectedOption) => {
    const { value } = selectedOption;
    actions.onSectionSettingChange({
      section: sectionSetting,
      fields: [
        { name: 'styles.toggleIcon', value },
        { name: 'styles.customBullet', value: false }
      ]
    });
  };

  const iconLabel = (OpenIcon = FaPlusCircle, CloseIcon = FaMinusCircle) => (
    <div className='contentReveal-settings-icons'>
      <OpenIcon />
      <FaArrowRight />
      <CloseIcon />
    </div>
  );

  const [customIcons, setCustomIcons] = useState({});
  useEffect(() => {
    if (Object.keys(customIcons).length === 2) {
      actions.onSectionSettingChange({
        section: sectionSetting,
        fields: [
          { name: 'styles.customOpenIcon', value: customIcons.customOpenIcon },
          { name: 'styles.customCloseIcon', value: customIcons.customCloseIcon },
          { name: 'styles.customBullet', value: true }
        ]
      });
    }
  }, [customIcons]);

  const onOpenIconChange = (img) => {
    setCustomIcons({ ...customIcons, customOpenIcon: img });
  };

  const onCloseIconChange = (img) => {
    setCustomIcons({ ...customIcons, customCloseIcon: img });
  };

  const options = [
    { value: 'FaPlusCircle', label: iconLabel(FaPlusCircle, FaMinusCircle) },
    { value: 'FaPlusSquare', label: iconLabel(FaPlusSquare, FaMinusSquare) },
    { value: 'FaPlus', label: iconLabel(FaPlus, FaMinus) },
    { value: 'FaCaretSquareDown', label: iconLabel(FaCaretSquareDown, FaCaretSquareUp) },
    { value: 'FaSortDown', label: iconLabel(FaSortDown, FaSortUp) },
    { value: 'FaAngleDown', label: iconLabel(FaAngleDown, FaAngleUp) },
    { value: 'FaCheckCircle', label: iconLabel(FaCheckCircle, FaTimesCircle) },
    { value: 'FaCheckSquare', label: iconLabel(FaCheckSquare, FaWindowClose) },
    { value: 'FaRegCheckCircle', label: iconLabel(FaRegCheckCircle, FaRegTimesCircle) },
    { value: 'FaRegCheckSquare', label: iconLabel(FaRegCheckSquare, FaRegWindowClose) },
    { value: 'FaCheck', label: iconLabel(FaCheck, FaTimes) },
    { value: 'FaRegThumbsDown', label: iconLabel(FaRegThumbsDown, FaRegThumbsUp) },
    { value: 'FaRegHandPointDown', label: iconLabel(FaRegHandPointDown, FaRegHandPointUp) },
    { value: 'FaEye', label: iconLabel(FaEye, FaEyeSlash) },
    { value: 'customBullets', label: 'Custom Bullets' }
  ];


  const [currentValue] = options.filter((ele) => ele.value === toggleIcon);
  const { value } = currentValue;

  return (
    <div className='contentReveal-settings'>
      <Tabs active='settings' className='padding-v-10 padding-h-10'>
        <Tab id='settings' title='settings'>
          <FlexBox column center='h-center'>

            <FlexBox center='v-center margin-v-5 padding-right-20' spaceBetween>
              <Label>Add more:</Label>
              <FlexBox center='v-center' onClick={onAddNewItem}>
                <MdAddCircleOutline className='gray-text mx-2 item-clickable' />
                <span>
                  {list.length}
                </span>
              </FlexBox>
            </FlexBox>

            <FlexBox center='v-center margin-v-5 padding-right-20' spaceBetween>
              <Label>Points Color</Label>
              <MiniTwitterPicker
                name='styles.bulletColor'
                value={bulletColor}
                onChange={onChange}
              />
            </FlexBox>

            <div className='margin-v-5'>
              <Label>Bullets Point:</Label>
              <Select
                options={options}
                onChange={handleChange}
                value={currentValue}
              />
            </div>

            {value === 'customBullets' &&
              <div>
                <FlexBox center='v-center margin-v-5'>
                  <Label>Open custom bullets</Label>
                  <AddImage
                    name='styles.customBullet'
                    onUploaded={onOpenIconChange}
                    value={customOpenIcon}
                  />
                </FlexBox>

                <FlexBox center='v-center margin-v-5'>
                  <Label>Close custom bullets</Label>
                  <AddImage
                    name='styles.customBullet'
                    onUploaded={onCloseIconChange}
                    value={customCloseIcon}
                  />
                </FlexBox>
              </div>
            }

          </FlexBox>
        </Tab>
      </Tabs>
    </div >
  );
};

export default ContentRevealSettings;
