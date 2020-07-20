import React from 'react';

import common from 'components/common';
import { useContext } from '../../../actions';
import { ImageOption } from './common';
import { Slider } from 'rsuite';

const { Tabs, InputRow, MiniTwitterPicker, FlexBox, Tab } = common;
const { TextField, SelectOption, Toggle, AddImage } = InputRow;

const layouts = [
  {
    src: 'https://imgur.com/k07SZuu.png',
    layout: 'standalone'
  }, {
    src: 'https://imgur.com/wNo3iSF.png',
    layout: 'withTextLeft'
  }, {
    src: 'https://imgur.com/HEt82ji.png',
    layout: 'withTextRight'
  }, {
    src: 'https://imgur.com/3TZJITW.png',
    layout: 'withImageLeft'
  }, {
    src: 'https://imgur.com/HLH9mfq.png',
    layout: 'withImageRight'
  }
];

const ButtonSection = () => {
  const {
    state: { modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();

  const { styles = {}, content = {}, borderSymmetry } = sectionSetting;
  const onChange = ({ target }) => {
    if (target.name === 'borderSymmetry') {
      actions.onSectionSettingChange({
        section: sectionSetting,
        fields: [
          target,
          {
            name: 'content.borderTopLeftRadius',
            value: sectionSetting.content.borderTopRightRadius || 10
          }, {
            name: 'content.borderTopRightRadius',
            value: sectionSetting.content.borderTopRightRadius || 10
          }, {
            name: 'content.borderBottomLeftRadius',
            value: sectionSetting.content.borderTopRightRadius || 10
          }, {
            name: 'content.borderBottomRightRadius',
            value: sectionSetting.content.borderTopRightRadius || 10
          }
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
        name: 'content.layout',
        value: layout
      }
    });
  };

  const onSliderChange = (radius, name) => {
    if (
      [
        'borderTopLeftRadius',
        'borderTopRightRadius',
        'borderBottomLeftRadius',
        'borderBottomRightRadius'
      ].includes(name) && borderSymmetry
    ) {
      actions.onSectionSettingChange({
        section: sectionSetting,
        fields: [
          {
            name: 'content.borderTopLeftRadius',
            value: radius
          }, {
            name: 'content.borderTopRightRadius',
            value: radius
          }, {
            name: 'content.borderBottomLeftRadius',
            value: radius
          }, {
            name: 'content.borderBottomRightRadius',
            value: radius
          }
        ]
      });
    } else {
      actions.onSectionSettingChange({
        section: sectionSetting,
        field: {
          name: `content.${name}`,
          value: radius
        }
      });
    }
  };

  const onImageChange = (image) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: 'content.icon',
        value: image
      }
    });
  };

  return (
    <Tabs active='styles' className='padding-v-10 padding-h-10'>
      <Tab id='layout' title='layout'>
        <FlexBox column center='h-center' spaceBetween>
          {
            layouts.map(({ src, layout }) => (
              <ImageOption
                value={src}
                key={layout}
                onClick={() => onLayoutChange(layout)}
                active={layout === styles.layout}
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
        <FlexBox column center='margin-v-5' spaceBetween>
          <span>Border Radius</span>
          <span className='gray-text'>Symmetric</span>
          <Toggle value={borderSymmetry} onToggle={(target) => onChange({ target })} name='borderSymmetry'/>
          <span>TR</span>
          <Slider
            max={50}
            min={0}
            defaultValue={5}
            onChange={(radius) => onSliderChange(radius, 'borderTopRightRadius')}
            value={content.borderTopRightRadius || 0}
          />
          <span>TL</span>
          <Slider
            max={50}
            min={0}
            defaultValue={5}
            onChange={(radius) => onSliderChange(radius, 'borderTopLeftRadius')}
            value={content.borderTopLeftRadius || 0}
          />
          <span>BR</span>
          <Slider
            max={50}
            min={0}
            defaultValue={5}
            onChange={(radius) => onSliderChange(radius, 'borderBottomRightRadius')}
            value={content.borderBottomRightRadius || 0}
          />
          <span>BL</span>
          <Slider
            max={50}
            min={0}
            defaultValue={5}
            onChange={(radius) => onSliderChange(radius, 'borderBottomLeftRadius')}
            value={content.borderBottomLeftRadius || 0}
          />
          <FlexBox center='v-center' spaceBetween>
            <span className='gray-text'>Border style</span>
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
          <FlexBox center='v-center' spaceBetween>
            <span className='gray-text'>Border Color</span>
            <MiniTwitterPicker
              name='styles.borderColor'
              value={styles.borderColor || '#FFF'}
              onChange={onChange}
            />
          </FlexBox>
          <span>Shadow</span>
          <Toggle value={content.hasShadow} onToggle={(target) => onChange({ target })} name='content.hasShadow'/>
          <span className='gray-text'>Offset-X</span>
          <Slider
            max={20}
            min={0}
            defaultValue={5}
            onChange={(offsetX) => onSliderChange(offsetX, 'boxShadowOffsetX')}
            value={content.boxShadowOffsetX || 0}
            disabled={!content.hasShadow}
          />
          <span className='gray-text'>Offset-Y</span>
          <Slider
            max={20}
            min={0}
            defaultValue={5}
            onChange={(offsetY) => onSliderChange(offsetY, 'boxShadowOffsetY')}
            value={content.boxShadowOffsetY || 0}
            disabled={!content.hasShadow}
          />
          <span className='gray-text'>Blur</span>
          <Slider
            max={20}
            min={0}
            defaultValue={5}
            onChange={(blur) => onSliderChange(blur, 'boxShadowBlur')}
            value={content.boxShadowBlur || 0}
            disabled={!content.hasShadow}
          />
          <FlexBox center='v-center' spaceBetween>
            <span className='gray-text'>Shadow Color</span>
            <MiniTwitterPicker
              name='styles.shadowColor'
              value={styles.shadowColor || '#FFF'}
              onChange={onChange}
              disabled={!content.hasShadow}
            />
          </FlexBox>
          <FlexBox column>
            <span>Button Icon</span>
            <span className='gray-text'>Placement</span>
            <SelectOption
              name='content.iconPlacement'
              value={content.iconPlacement || 'none'}
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
              name='content.buttonIcon'
              value={content.buttonIcon}
              onUploaded={onImageChange}
            />
            <span className='gray-text'>Icon Border Radius</span>
            <Slider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(blur) => onSliderChange(blur, 'iconBorderRadius')}
              value={content.iconBorderRadius || 0}
            />
            <FlexBox center='v-center' spaceBetween>
              <span className='gray-text'>Icon Background</span>
              <MiniTwitterPicker
                name='styles.iconBackgroundColor'
                value={styles.iconBackgroundColor || '#FFF'}
                onChange={onChange}
              />
            </FlexBox>
          </FlexBox>
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
              { label: 'Payment Form', value: 'paymentForm' },
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
            When this Button clicked it will take the customer to the payment form section
          </span>
        ))}
      </Tab>
    </Tabs>
  );
};

export default ButtonSection;
