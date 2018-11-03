import React, { Component } from 'react';
import './style.css';
import AddFieldComponent from './AddFieldComponent';


export class InputRow extends Component {
  static Label = ({ notes, ...props }) => (
    <div className='input-label-container'>
      <span className='input-label '>{props.children}</span>
      <span className='input-label-note'>{notes}</span>
    </div>
  )

  static NormalInput = ({ onChange, name, ...props }) => (
    <input onChange={onChange} name={name} className='input-field' placeholder={props.children} />
  )

  static SmallInput = ({
    type = 'text', name, onChange, ...props
  }) => (
      <input
        onChange={onChange} name={name} type={type} className='input-field small-input'
        placeholder={props.children}
      />
    )

  static CustomInput = ({
    width, onChange, name, ...props
  }) => (
      <input onChange={onChange} name={name} className='input-field custom-input-field' placeholder={props.children} />
    )

  static UrlSuffixInput = ({ onChange, name, ...props }) => (
    <div className='url-suffix-input'>
      <span className='suffix-value'>http://tonyhack.leadcart.com/products/</span>
      <input onChange={onChange} name={name} className='url-suffix-input-field' placeholder={props.children} />
    </div>
  )

  static TextAreaInput = ({ onChange, name, ...props }) => (
    <div className='text-area-container'>
      <textarea onChange={onChange} name={name} className='textarea-input-field' />
      <span className='text-area-small-note'>27/260</span>
    </div>
  )

  static AddComponentField = AddFieldComponent

  static SelectOption = ({
    options = [], onChange, name,leftLabel, ...props
  }) => (
      <React.Fragment>
      {leftLabel && <span className="input-left-label">{leftLabel}</span> }
      <select onClick={onChange} name={name} className='select-input-field'>
      {options.map(({ label, value }) => <option className='select-option' value={value}>{label}</option>)}
      </select>
      </React.Fragment>
    )

  static PriceField = ({
    children, onChange, name, ...props
  }) => (
      <div className='price-input-holder'>
        <span className='currancy-type'>$</span>
        <input onChange={onChange} name={name} className='price-input-field' placeholder={children} />
      </div>
    )

  static UrlInput = ({ onChange, name, ...props }) => (
    <input onChange={onChange} name={name} className='input-field' placeholder='http://' />
  )

  static CheckBox = ({
    children, description, checked, disabled, onChange, name, ...props
  }) => (
      <label className='check-box-container'>
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

  static SwitchInput = ({ onChange, name, ...props }) => (
    <label className='switch-slider-input '>
      <input onChange={onChange} name={name} type='checkbox' />
      <span className='slider-input slider-round' />
    </label>
  )

  static CodeInputArea = (props) => (
    <div className='code-area-container'>
      <textarea className='codearea-input-field' placeholder={props.children} />
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

