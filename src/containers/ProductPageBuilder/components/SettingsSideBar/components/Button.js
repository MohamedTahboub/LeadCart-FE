import React, { useState } from 'react';

import common from 'components/common';
import { useContext } from '../../../actions';
import { ImageOption } from './common';
import Slider from 'rc-slider';
import Collapse from 'components/Collapsible';
import { buttonTemplates } from 'data/templates';

const { Tabs, InputRow, MiniTwitterPicker, FlexBox, Tab } = common;
const { TextField, SelectOption, Toggle, AddImage } = InputRow;

const layouts = [
  {
    src: 'https://imgur.com/jZFW66Q.png',
    layout: 'standalone'
  }, {
    src: 'https://imgur.com/JkCcP5m.png',
    layout: 'withTextLeft'
  }, {
    src: 'https://imgur.com/J4C316K.png',
    layout: 'withTextRight'
  }, {
    src: 'https://imgur.com/IzSFWum.png',
    layout: 'withImageLeft'
  }, {
    src: 'https://imgur.com/eu5xfhe.png',
    layout: 'withImageRight'
  }
];

const borderCornerNames = [
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius'
];

const getCornerTitle = (corner) => {
  switch (corner) {
    case 'borderTopLeftRadius': return 'Top Left';
    case 'borderTopRightRadius': return 'Top Right';
    case 'borderBottomLeftRadius': return 'Bottom Left';
    case 'borderBottomRightRadius': return 'Bottom Right';
    default: return '';
  }
};

const ButtonSection = () => {
  const {
    state: { modals: { sectionSetting = {} } = {}, product: { category = '' } = {} },
    actions
  } = useContext();


  const isOptIn = category === 'opt-in';

  const [openCollapse, setOpenCollapse] = useState(null);

  const { styles = {}, content = {} } = sectionSetting;
  const { borderSymmetry } = styles;

  const onChange = ({ target }) => {
    if (target.name === 'styles.borderSymmetry') {
      actions.onSectionSettingChange({
        section: sectionSetting,
        fields: [
          target,
          ...borderCornerNames.map((corner) => ({
            name: `styles.${corner}`,
            value: sectionSetting.styles.borderTopRightRadius || 10
          }))
        ]
      });
    } else {
      actions.onSectionSettingChange({
        section: sectionSetting,
        field: target
      });
    }
  };

  const onLayoutChange = (layout) => () => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles.layout',
        value: layout
      }
    });
  };

  const onSliderChange = (radius, name) => {
    if (
      borderCornerNames.includes(name) && borderSymmetry
    ) {
      actions.onSectionSettingChange({
        section: sectionSetting,
        fields: borderCornerNames.map((corner) => ({
          name: `styles.${corner}`,
          value: radius
        }))
      });
    } else {
      actions.onSectionSettingChange({
        section: sectionSetting,
        field: {
          name: `styles.${name}`,
          value: radius
        }
      });
    }
  };

  const onImageChange = (image) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'styles.icon',
        value: image
      }
    });
  };

  const onBulkChange = ({ styles }) => () => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      fields: [
        ...Object.keys(styles).map((key) => {
          return {
            name: `styles.${key}`,
            value: styles[key]
          };
        })
      ]
    });
  };

  return (
    <Tabs active='layout' className='padding-v-10 padding-h-10'>
      <Tab id='layout' title='layouts'>
        <FlexBox column center='h-center' spaceBetween>
          {
            layouts.map(({ src, layout }) => (
              <ImageOption
                value={src}
                key={layout}
                onClick={() => onLayoutChange(layout)}
                active={layout === styles.layout}
                className='button-layout-image'
                name='styles.layout'
              />
            ))}
        </FlexBox>
      </Tab>
      <Tab id='buttons' title='buttons'>
        <FlexBox column center='h-center' spaceBetween>
          {
            buttonTemplates.map(({ src, styles }) => (
              <ImageOption
                value={src}
                key={src}
                onClick={() => onBulkChange({ styles })}
                className='button-layout-image'
              />
            ))}
        </FlexBox>
      </Tab>
      <Tab id='styles' title='styles'>
        <FlexBox center='v-center' spaceBetween>
          <span className='gray-text'>Position</span>
          <SelectOption
            name='styles.position'
            value={styles.position}
            onChange={onChange}
            options={[
              { label: 'Left', value: 'left' },
              { label: 'Center', value: 'center' },
              { label: 'Right', value: 'right' },
              { label: 'Justified', value: 'justified' }
            ]}
          />
        </FlexBox>
        <FlexBox center='v-center margin-v-5' spaceBetween>
          <span className='gray-text'>Button Background</span>
          <MiniTwitterPicker
            name='styles.backgroundColor'
            value={styles.backgroundColor}
            onChange={onChange}
          />
        </FlexBox>
        <FlexBox center='v-center margin-v-5' spaceBetween>
          <span className='gray-text'>Button Text</span>
          <MiniTwitterPicker
            name='styles.foregroundColor'
            value={styles.foregroundColor || '#FFF'}
            onChange={onChange}
          />
        </FlexBox>
        <FlexBox column center='margin-v-5 fluid' spaceBetween>
          <Collapse defaultOpen={openCollapse === 'Borders'} title='Borders' toggle={setOpenCollapse}>
            <div>Border Radius</div>
            <span className='gray-text'>Symmetric</span>
            <Toggle value={styles.borderSymmetry} onToggle={(target) => onChange({ target })} name='styles.borderSymmetry' />
            {
              borderCornerNames.map((corner) => (
                <>
                  <div className='mb-2'>{getCornerTitle(corner)}</div>
                  <Slider
                    max={50}
                    min={0}
                    defaultValue={5}
                    onChange={(radius) => onSliderChange(radius, corner)}
                    value={styles[corner] || 0}
                  />
                </>
              ))
            }
            <FlexBox center='v-center' spaceBetween className='mb-2'>
              <div className='gray-text mb-2'>Border style</div>
              <SelectOption
                name='styles.borderStyle'
                value={styles.borderStyle || 'hidden'}
                onChange={onChange}
                options={[
                  { label: 'Solid', value: 'solid' },
                  { label: 'Dashed', value: 'dashed' },
                  { label: 'Dotted', value: 'dotted' },
                  { label: 'None', value: 'hidden' }
                ]}
              />
            </FlexBox>
            <FlexBox center='v-center' className='pb-140px' spaceBetween>
              <span className='gray-text'>Border Color</span>
              <MiniTwitterPicker
                name='styles.borderColor'
                value={styles.borderColor || '#FFF'}
                onChange={onChange}
              />
            </FlexBox>
          </Collapse>
          <Collapse defaultOpen={openCollapse === 'Shadows'} title='Shadows' toggle={setOpenCollapse}>
            <span>Shadow</span>
            <Toggle value={styles.hasShadow} onToggle={(target) => onChange({ target })} name='styles.hasShadow' />
            <span className='gray-text'>Offset-X</span>
            <Slider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(offsetX) => onSliderChange(offsetX, 'boxShadowOffsetX')}
              value={styles.boxShadowOffsetX || 0}
              disabled={!styles.hasShadow}
            />
            <span className='gray-text'>Offset-Y</span>
            <Slider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(offsetY) => onSliderChange(offsetY, 'boxShadowOffsetY')}
              value={styles.boxShadowOffsetY || 0}
              disabled={!styles.hasShadow}
            />
            <span className='gray-text'>Blur</span>
            <Slider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(blur) => onSliderChange(blur, 'boxShadowBlur')}
              value={styles.boxShadowBlur || 0}
              disabled={!styles.hasShadow}
            />
            <FlexBox center='v-center' spaceBetween className='pb-140px mt-2'>
              <span className='gray-text'>Shadow Color</span>
              <MiniTwitterPicker
                name='styles.shadowColor'
                value={styles.shadowColor || '#FFF'}
                onChange={onChange}
                disabled={!styles.hasShadow}
              />
            </FlexBox>
          </Collapse>
          <Collapse defaultOpen={openCollapse === 'Icon'} title='Icon' toggle={setOpenCollapse}>
            <FlexBox column>
              <span>Button Icon</span>
              <span className='gray-text'>Placement</span>
              <SelectOption
                name='styles.iconPlacement'
                value={styles.iconPlacement || 'none'}
                onChange={onChange}
                options={[
                  { label: 'Included Left', value: 'left' },
                  { label: 'Included Right', value: 'right' },
                  { label: 'Snapped Left', value: 'snapped-left' },
                  { label: 'Snapped Right', value: 'snapped-right' },
                  { label: 'None', value: 'none' }
                ]}
              />
              <span className='gray-text'>Add icon</span>
              <AddImage
                name='styles.icon'
                value={styles.icon}
                onUploaded={onImageChange}
              />
              <span className='gray-text'>Icon Border Radius</span>
              <Slider
                max={20}
                min={0}
                defaultValue={5}
                onChange={(blur) => onSliderChange(blur, 'iconBorderRadius')}
                value={styles.iconBorderRadius || 0}
                disabled={['snapped-left', 'snapped-right'].includes(styles.iconPlacement) || !styles.icon}
              />
              <FlexBox center='v-center' spaceBetween className='pb-140px'>
                <span className='gray-text'>Icon Background</span>
                <MiniTwitterPicker
                  name='styles.iconBackgroundColor'
                  value={styles.iconBackgroundColor || '#FFF'}
                  onChange={onChange}
                />
              </FlexBox>
            </FlexBox>
          </Collapse>
        </FlexBox>
      </Tab>

      <Tab id='actions' title='actions'>
        <FlexBox center='v-center px-2' spaceBetween>
          <span className='gray-text bold-text'>Go To:</span>
          <SelectOption
            name='content.type'
            value={content.type}
            onChange={onChange}
            options={[
              { label: isOptIn ? 'Complete Order' : 'Payment Form', value: isOptIn ? 'Complete Order' : 'Payment Form' },
              { label: 'External Link', value: 'external' }
            ]}
          />
        </FlexBox>
        {content.type === 'external' ? (
          <div className='px-2'>
            <span className='gray-text bold-text mb-2'>On Click Open:</span>
            <div className='padding-left-20'>
              <TextField
                name='content.link'
                value={content.link}
                onChange={onChange}
              />
            </div>
          </div>
        ) : ((
          <span className='gray-text aligned-center mt-3'>
            {isOptIn ?
              'When this Button clicked it will take the customer to the Complete Order section'
              :
              'When this Button clicked it will take the customer to the payment form section'
            }
          </span>
        ))}
      </Tab>
    </Tabs>
  );
};

export default ButtonSection;
