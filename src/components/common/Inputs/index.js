import React, { Component } from 'react';
import './style.css';
import AddFieldComponent from './AddFieldComponent';


export class InputRow extends Component {
  static Label = ({ notes, error, ...props }) => (
    <div className='input-label-container'>
      <span className='input-label '>{props.children}</span>
      {error && <span className="label-validation-error">*{error}</span>}
      <span className='input-label-note'>{notes}</span>
    </div>
  )

  static NormalInput = ({ onChange, value, name, error, ...props }) => (
    <input onChange={onChange} name={name} defaultValue={value} className={'input-field ' + (error && 'invalid-field')} placeholder={props.children} />
  )

  static SmallInput = ({
    type = 'text', name, onChange, value,classes=[], ...props
  }) => (
      <input
        onChange={onChange} name={name} type={type} defaultValue={value} className={'input-field small-input '+classes.join(' ')}
        placeholder={props.children}
      />
    )

  static CustomInput = ({
    width, onChange, name, value,placeholder,classes=[], ...props
  }) => (
      <input onChange={onChange} name={name} defaultValue={value} className={'input-field custom-input-field '+classes.join(' ')} placeholder={props.children || placeholder} />
    )

  static UrlSuffixInput = ({ onChange, name, subdomain, value, error, ...props }) => (
    <div className='url-suffix-input'>
      <span className='suffix-value'>https://{subdomain}.leadcart.com/products/</span>
      <input onChange={onChange} name={name} className={'url-suffix-input-field ' + (error && 'invalid-field')} defaultValue={value} placeholder={props.children} />
    </div>
  )

  static TextAreaInput = ({ onChange, name, value, error, ...props }) => (
    <div className='text-area-container'>
      <textarea onChange={onChange} name={name} defaultValue={value} className={'textarea-input-field ' + (error && 'invalid-field')} />
      <span className='text-area-small-note'>27/260</span>
    </div>
  )

  static AddComponentField = AddFieldComponent

  static SelectOption = ({
    options = [], onChange, name, value, leftLabel, ...props
  }) => (
      <React.Fragment>
        {leftLabel && <span className="input-left-label">{leftLabel}</span>}
        <select onClick={onChange} defaultValue={value} name={name} className='select-input-field'>
          {options.map(({ label, value }) => <option className='select-option' value={value}>{label}</option>)}
        </select>
      </React.Fragment>
    )

  static PriceField = ({
    children, onChange, name,classes=[], value, ...props
  }) => (
      <div className={'price-input-holder '+classes.join(' ')}>
        <span className='currancy-type'>$</span>
        <input onChange={onChange} defaultValue={value} name={name} className='price-input-field' placeholder={children} />
      </div>
    )

  static UrlInput = ({ onChange, name, value, ...props }) => (
    <input onChange={onChange} defaultValue={value} name={name} className='input-field' placeholder='http://' />
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

  static SwitchInput = ({ onChange, name, value, onToggle, ...props }) => (
    <label className='switch-slider-input '>
      <input onChange={onToggle} name={name} type='checkbox' checked={value} />
      <span className='slider-input slider-round' />
    </label>
  )

  static CodeInputArea = ({ value, ...props }) => (
    <div className='code-area-container'>
      <textarea defaultValue={value} className='codearea-input-field' placeholder={props.children} />
    </div>
  )

  static FlatSelect = ({ note, ...props }) => (
    <div className='charging-method-picker'>
      <input id='charge-method-el-1' type='radio' name='chargeMethod' className='charge-method-radio-input hiden-element' />
      <label htmlFor='charge-method-el-1' className='charging-method-item'>%</label>
      <input
        checked id='charge-method-el-2' type='radio' name='chargeMethod'
        className='charge-method-radio-input hiden-element'
      />
      <label htmlFor='charge-method-el-2' className='charging-method-item'>$</label>
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
    const margin = this.props.margin || 12;
    return (
      <div style={{ margin: `${margin}px 0px` }} className='input-row'>
        {this.props.children}
      </div>
    );
  }
}

