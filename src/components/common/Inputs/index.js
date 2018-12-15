import React, { Component } from 'react';
import './style.css';
import AddImage from './AddImage';
import AddFieldComponent from './AddFieldComponent';
import SearchInput from './SearchInput'
import TextAreaInput from './TextAreaInput'
import EditableTagGroup from './EditableTagGroup'
import DatePicker from 'antd/lib/date-picker';

export class InputRow extends Component {
  static Label = ({ notes, error, className, ...props }) => (
    <div className={'input-label-container ' + className}>
      <span className='input-label '>{props.children}</span>
      {error && <span className="label-validation-error">*{error}</span>}
      <span className='input-label-note'>{notes}</span>
    </div>
  )

  static NormalInput = ({ onChange, value, disabled, name, error, ...props }) => (
    <input
      onChange={onChange}
      name={name}
      defaultValue={value}
      disabled={disabled}
      className={'input-field ' + (error && 'invalid-field')}
      placeholder={props.children}
    />
  )

  static SmallInput = ({
    type = 'text', name, disabled, autoComplete = 'on', onChange, value, classes = [], error, ...props
  }) => (
      <input
        defaultValue={value}
        onChange={onChange}
        autoComplete={autoComplete}
        name={name}
        disabled={disabled}
        type={type}
        className={'input-field small-input ' + (error ? ' invalid-field ' : ' ') + classes.join(' ') }
        placeholder={props.children}
      />
    )

  static CustomInput = ({
    width, onChange, name, value, disabled, type = 'text', placeholder, classes = [], ...props
  }) => (
      <input onChange={onChange}
        type={type}
        disabled={disabled}
        name={name}
        defaultValue={value}
        className={'input-field custom-input-field ' + classes.join(' ')}
        placeholder={props.children || placeholder}
      />
    )

  static UrlSuffixInput = ({ onChange, name, subdomain, value, error, ...props }) => (
    <div className='url-suffix-input'>
      <span className='suffix-value'>https://{subdomain}.leadcart.io/products/</span>
      <input onChange={onChange}
        name={name}
        className={'url-suffix-input-field ' + (error && 'invalid-field')}
        defaultValue={value}
        placeholder={props.children}
      />
    </div>
  )

  static TextAreaInput = TextAreaInput
  //  ({ onChange, name, disabled, value, error, ...props }) => (
  //   <div className='text-area-container'>
  //     <textarea
  //       onChange={onChange}
  //       name={name}
  //       value={value}
  //       disabled={disabled}
  //       className={'textarea-input-field ' + (error && 'invalid-field')}
  //     />
  //     <span className='text-area-small-note'>27/260</span>
  //   </div>
  // )

  static AddImage = AddImage

  static AddComponentField = AddFieldComponent

  static SearchInput = SearchInput
  static DatePicker = DatePicker
  static EditableTagGroup = EditableTagGroup

  static SelectOption = ({
    options = [], onChange, name, value, leftLabel, ...props
  }) => (
      <React.Fragment>
        {leftLabel && <span className="input-left-label">{leftLabel}</span>}
        <select onClick={onChange} defaultValue={value} name={name} className='select-input-field'>
          {options.map(({ label, value }, id) => <option key={id} className='select-option' value={value}>{label}</option>)}
        </select>
      </React.Fragment>
    )

  static PriceField = ({
    children, onChange, name, type, disabled, classes = [], value, ...props
  }) => (
      <div className={'price-input-holder ' + classes.join(' ')}>
        <span className='currancy-type'>{type || '$'}</span>
        <input
          onChange={onChange}
          defaultValue={value}
          name={name}
          className='price-input-field'
          disabled={disabled}
          placeholder={children} />
      </div>
    )

  static UrlInput = ({ onChange, name, disabled, prefix = 'https://', value, ...props }) => (
    <input
      onChange={onChange}
      defaultValue={value}
      name={name}
      className='input-field'
      disabled={disabled}
      placeholder={prefix}
    />
  )

  static CheckBox = ({
    children, description, checked, disabled, onChange, name, classes = [], ...props
  }) => (
      <label className={'check-box-container ' + classes.join(' ')}>
        {description
          && <span className='check-box-description'>{description}</span>}
        <input
          onChange={onChange} name={name} className='check-box' type='radio'
          name='product-type' checked={checked} disabled={disabled}
        />
        <div className='check-box-indicator'>{children}</div>
      </label>
    )

  static ColorInlinePicker = (props) => (
    <div className='inline-color-picker'>
      <span className='color-label color-default'>default</span>
      <span className='color-label color-monochrome'>MONOCHROME</span>
      <span className='color-label color-blues-earthy'>BLUES EARTHY</span>
      <span className='color-label color-crison'>CRIMSON</span>
      <span className='color-label color-forest'>FOREST</span>
    </div>
  )

  static SwitchInput = ({ onChange, name, value, preValue, onToggle, ...props }) => (
    <label className='switch-slider-input '>
      <input onChange={onToggle} name={name} type='checkbox' defaultChecked={value} checked={preValue} {...props} />
      <span className='slider-input slider-round' />
    </label>
  )

  static CodeInputArea = ({ value, onChange, name, ...props }) => (
    <div className='code-area-container'>
      <textarea onChange={onChange} name={name} defaultValue={value} className='codearea-input-field' placeholder={props.children} />
    </div>
  )

  static FlatSelect = ({ note, onSelect, value, ...props }) => (
    <div className='charging-method-picker'>
      <input id='charge-method-el-1' type='radio' name='chargeMethod' className='charge-method-radio-input hiden-element' />
      <label
        onClick={() => onSelect('Percent')}
        htmlFor='charge-method-el-1'
        className='charging-method-item'
        checked={value === 'Percent'}
      >%</label>
      <input
        checked id='charge-method-el-2' type='radio' name='chargeMethod'
        className='charge-method-radio-input hiden-element'
      />
      <label
        onClick={() => onSelect('Flat')}
        htmlFor='charge-method-el-2'
        className='charging-method-item'
        checked={value === 'Flat'}
      >$</label>
      {note && <span className='charging-method-picker-notes'>{note}</span>}
    </div>
  )

  static Note = ({ content, children, ...props }) => (
    <div className='note-element'>
      <span className='note-content'>{content}</span>
      {children}
    </div>
  )

  render() {
    const { margin = 12, className } = this.props;
    return (
      <div style={{ margin: `${margin}px 0px` }} className={'input-row ' + className}>
        {this.props.children}
      </div>
    );
  }
}

