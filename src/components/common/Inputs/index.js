import React, { Component } from 'react';
import './style.css';
import AddImage from './AddImage';
import AddFieldComponent from './AddFieldComponent';
import SearchInput from './SearchInput'
import TextAreaInput from './TextAreaInput'
import EditableTagGroup from './EditableTagGroup'
import DatePicker from 'antd/lib/date-picker';
import ids from 'shortid'
export class InputRow extends Component {
  static Label = ({ notes, error, className, ...props }) => (
    <div className={'input-label-container ' + className}>
      <span className='input-label '>{props.children}</span>
      {error && <span className="label-validation-error">*{error}</span>}
      <span className='input-label-note'>{notes}</span>
    </div>
  )

  static NormalInput = ({ onChange, value, className = '', disabled, name, error, ...props }) => (
    <input
      onChange={onChange}
      name={name}
      defaultValue={value}
      disabled={disabled}
      className={`input-field ${className} ${error ? 'invalid-field' : ''}`}
      placeholder={props.children}
    />
  )

  static SmallInput = ({
    type = 'text', name, disabled, autoComplete = 'on', onChange, value, className, error, ...props
  }) => (
      <input
        defaultValue={value}
        onChange={onChange}
        autoComplete={autoComplete}
        name={name}
        disabled={disabled}
        type={type}
        className={`input-field small-input ${className ? className : ''} ${error ? 'invalid-field' : ''}`}
        placeholder={props.children}
      />
    )

  static CustomInput = ({
    width, onChange, name, autoComplete, value, disabled, type = 'text', placeholder, className = '', ...props
  }) => (
      <input onChange={onChange}
        type={type}
        disabled={disabled}
        autoComplete={autoComplete ? '' : 'off'}
        name={name}
        defaultValue={value}
        className={`input-field custom-input-field ${className}`}
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
    options = [], onChange, className, name, value, leftLabel, ...props
  }) => (
      <React.Fragment>
        {leftLabel && <span className="input-left-label">{leftLabel}</span>}
        <select onChange={onChange} value={value} name={name} className={`select-input-field ${className ? className : ''}`}>
          {options.map(({ label, value: v }) => <option key={ids.generate()} className='select-option' value={v}>{label}</option>)}
        </select>
      </React.Fragment>
    )

  static PriceField = ({
    children, onChange, name, error, type, disabled, className, value, ...props
  }) => (
      <div className={`price-input-holder ${className ? className : ''}`}>
        <span className='currancy-type'>{type || '$'}</span>
        <input
          onChange={onChange}
          defaultValue={value}
          type={type || "number"}
          name={name}
          className={`price-input-field ${error ? 'invalid-field' : ''}`}
          disabled={disabled}
          placeholder={children} />
      </div>
    )

  static UrlInput = ({ onChange, name, disabled, error, prefix = 'https://', value, ...props }) => (
    <input
      onChange={onChange}
      defaultValue={value}
      name={name}
      className={`input-field ${error ? 'invalid-field' : ''}`}
      disabled={disabled}
      placeholder={prefix}
    />
  )

  static CheckBox = ({
    children, description, checked, disabled, onChange, name, className = '', ...props
  }) => (
      <label onChange={onChange}
        className={`check-box-container ${className}`}>
        {description
          && <span className='check-box-description'>{description}</span>}
        <input

          name={name || 'checkbox'}
          className='check-box'
          type='radio'
          defaultChecked={checked}
          disabled={disabled}
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

  static CodeInputArea = ({ value, onChange, name, disabled, ...props }) => (
    <div className='code-area-container'>
      <textarea
        onChange={onChange}
        name={name}
        disabled={disabled}
        defaultValue={value}
        className='codearea-input-field'
        placeholder={props.children}
      />
    </div>
  )

  static FlatSelect = ({ note, onSelect, value = 'Percent', ...props }) => {
    return (
      <div className='charging-method-picker'>
        <input id='charge-method-el-1'
          type='radio'
          defaultChecked={value === 'Percent'}
          name='chargeMethod'
          className='charge-method-radio-input hiden-element' />
        <label
          onClick={() => onSelect('Percent')}
          htmlFor='charge-method-el-1'
          className='charging-method-item'
        >%</label>
        <input
          id='charge-method-el-2'
          type='radio'
          name='chargeMethod'
          className='charge-method-radio-input hiden-element'
          defaultChecked={value === 'Flat'}
        />
        <label
          onClick={() => onSelect('Flat')}
          htmlFor='charge-method-el-2'
          className='charging-method-item'

        >$</label>
        {note && <span className='charging-method-picker-notes'>{note}</span>}
      </div>
    )
  }

  static Note = ({ content, children, ...props }) => (
    <div className='note-element'>
      <span className='note-content'>{content}</span>
      {children}
    </div>
  )

  render() {
    const { margin, className = '' } = this.props;
    const style = margin ? { margin: `${margin}px 0px` } : {}
    return (
      <div style={style} className={'input-row ' + className}>
        {this.props.children}
      </div>
    );
  }
}

export const CodeInputArea = ({ value, flixable, onChange, name, disabled, ...props }) => (
  <div className={`code-area-container ${flixable ? "flixable-code-area-container" : ""}`}>
    <textarea
      onChange={onChange}
      name={name}
      disabled={disabled}
      defaultValue={value}
      className={`codearea-input-field  ${flixable ? "flixable-codearea-input-field" : ""}`}
      placeholder={props.children}
    />
  </div>
)


export const SelectBox = ({ checked, onChange, ...props }) => {
  const id = ids.generate()

  return (
    <label htmlFor={`CustomCheckBoxInput_${id}`} >
      <input
        onChange={onChange}
        id={`CustomCheckBoxInput_${id}`}
        checked={checked}
        type="checkbox"
        className='custom-checkbox-input-field'
      />
      <span className="custom-checkbox-input-mask" />
    </label>
  )
}

export { default as EditableInputField } from './EditableInputField'
export { default as EditableTextField } from './EditableTextField'

