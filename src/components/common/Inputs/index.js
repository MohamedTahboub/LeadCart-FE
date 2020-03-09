import React, { Component, useState } from 'react';
import './style.css';
import DatePicker from 'antd/lib/date-picker';
import Checkbox from 'antd/lib/checkbox';
import ids from 'shortid';
import AddImage from './AddImage';
import AddFieldComponent from './AddFieldComponent';
import SearchInput from './SearchInput';
import TextField from './TextField';
import TextAreaInput from './TextAreaInput';
import EditableTagGroup from './EditableTagGroup';
import Slider from './Slider';

export class InputRow extends Component {
  static Label = ({
    notes, error, className = '', ...props
  }) => (
    <div className={`input-label-container ${className}`}>
      <span className='input-label '>{props.children}</span>
      {error && (
        <span className='label-validation-error'>
          *
          {error}
        </span>
      )}
      <span className='input-label-note'>{notes}</span>
    </div>
  )

  static NormalInput = ({
    onChange,
    value,
    className = '',
    disabled,
    onBlur,
    name,
    error,
    ...props
  }) => (
    <input
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      defaultValue={value}
      disabled={disabled}
      className={`input-field ${className} ${error ? 'invalid-field' : ''}`}
      placeholder={props.children}
    />
  )

  static SmallInput = ({
    type = 'text',
    onBlur,
    name,
    disabled,
    autoComplete = 'on',
    onChange,
    value,
    // Value,
    className = '',
    error,
    ...props
  }) => (
    <input
      defaultValue={value}
      // value={Value}
      onChange={onChange}
      onBlur={onBlur}
      autoComplete={autoComplete}
      name={name}
      disabled={disabled}
      type={type}
      className={`input-field small-input ${className} ${error ? 'invalid-field' : ''}`}
      placeholder={props.children}
    />
  )

  static CustomInput = ({
    width,
    onBlur,
    onChange,
    name,
    autoComplete,
    value,
    error,
    disabled,
    type = 'text',
    placeholder,
    className = '',
    ...props
  }) => (
    <input
      onChange={onChange}
      onBlur={onBlur}
      type={type}
      disabled={disabled}
      autoComplete={autoComplete ? '' : 'off'}
      name={name}
      defaultValue={value}
      className={`input-field custom-input-field ${className} ${error ? 'invalid-field' : ''}`}
      placeholder={props.children || placeholder}
    />
  )

  static UrlSuffixInput = ({
    onChange, name, subdomain, value, error, ...props
  }) => (
    <div className='url-suffix-input'>
      <span className='suffix-value'>
          https://
        {subdomain}
          .leadcart.io/
      </span>
      <input
        onChange={onChange}
        name={name}
        className={`url-suffix-input-field ${error && 'invalid-field'}`}
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

  static TextField = TextField

  static Slider = Slider

  static Checkbox = Checkbox

  static SelectOption = ({
    options = [],
    onChange,
    className,
    name,
    value,
    leftLabel,
    ...props
  }) => (
    <React.Fragment>
      {leftLabel && <span className='input-left-label'>{leftLabel}</span>}
      <select onChange={onChange} value={value} name={name} className={`select-input-field ${className || ''}`}>
        {options.map(({ label, value: v }) => <option key={ids.generate()} className='select-option' value={v}>{label}</option>)}
      </select>
    </React.Fragment>
  )

  static PriceField = ({
    children,
    onChange,
    onBlur,
    name,
    error,
    type = 'number',
    currency = '$',
    disabled,
    className,
    value,
    ...props
  }) => (
    <div className={`price-input-holder ${className || ''}`}>
      <span className='currancy-type'>{currency}</span>
      <input
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={value}
        type={type || 'number'}
        name={name}
        className={`price-input-field ${error ? 'invalid-field' : ''}`}
        disabled={disabled}
        placeholder={children}
      />
    </div>
  )

  static UrlInput = ({
    onChange,
    onBlur,
    name,
    disabled,
    error,
    prefix = 'https://',
    value,
    ...props
  }) => (
    <input
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={value}
      name={name}
      className={`input-field ${error ? 'invalid-field' : ''}`}
      disabled={disabled}
      placeholder={prefix}
    />
  )

  static CheckBox = ({
    children,
    description,
    checked,
    disabled,
    onChange,
    name,
    className = '',
    ...props
  }) => (
    <label
      onChange={onChange}
      className={`check-box-container ${className}`}
    >
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

  static SwitchInput = ({
    onChange,
    className = '',
    name,
    value,
    preValue,
    defaultChecked,
    onToggle,
    ...props
  }) => (
    <label className={`switch-slider-input ${className}`}>
      <input
        onChange={onToggle}
        name={name}
        type='checkbox'
        defaultChecked={defaultChecked}
        checked={value}
        {...props}
      />
      <span className='slider-input slider-round' />
    </label>
  )

  static CodeInputArea = ({
    value,
    onChange,
    error,
    className = '',
    onBlur,
    name,
    disabled,
    ...props
  }) => (
    <div className={`code-area-container ${className}`}>
      <textarea
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        disabled={disabled}
        defaultValue={value}
        className={`codearea-input-field ${error ? 'invalid-field' : ''}`}
        placeholder={props.children}
      />
    </div>
  )

  static FlatSelect = ({
    note, onSelect, value = 'Percent', ...props
  }) => (
    <div className='charging-method-picker'>
      <input
        id='charge-method-el-1'
        type='radio'
        defaultChecked={value === 'Percent'}
        name='chargeMethod'
        className='charge-method-radio-input hiden-element'
      />
      <label
        onClick={() => onSelect('Percent')}
        htmlFor='charge-method-el-1'
        className='charging-method-item'
      >
%

      </label>
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

      >
$

      </label>
      {note && <span className='charging-method-picker-notes'>{note}</span>}
    </div>
  )

  static Note = ({ content, children, ...props }) => (
    <div className='note-element'>
      <span className='note-content'>{content}</span>
      {children}
    </div>
  )

  render () {
    const { margin, className = '' } = this.props;
    const style = margin ? { margin: `${margin}px 0px` } : {};
    return (
      <div style={style} className={`input-row ${className}`}>
        {this.props.children}
      </div>
    );
  }
}

export const CodeInputArea = ({
  value, flixable, onChange, onBlur, name, disabled, ...props
}) => (
  <div className={`code-area-container ${flixable ? 'flixable-code-area-container' : ''}`}>
    <textarea
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      disabled={disabled}
      defaultValue={value}
      className={`codearea-input-field  ${flixable ? 'flixable-codearea-input-field' : ''}`}
      placeholder={props.children}
    />
  </div>
);


export const SelectBox = ({
  checked,
  onChange,
  className = '',
  label,
  ...props
}) => {
  const id = ids.generate();

  return (
    <label
      className={className}
      htmlFor={`CustomCheckBoxInput_${id}`}
    >
      <input
        onChange={onChange}
        id={`CustomCheckBoxInput_${id}`}
        checked={checked}
        type='checkbox'
        className='custom-checkbox-input-field'
      />
      <span className='custom-checkbox-input-mask' />
      {label && <span className='checkbox-label'>{label}</span>}
    </label>
  );
};

export const CheckoutInput = ({
  className = '', disabled, name, type = 'text', label
}) => (
  <div className='checkout-input-field-container'>
    <input
      className='checkout-input-field'
      disabled={disabled}
      name={name}
      type={type}
    />
    <label
      className='checkout-input-label'
    >
      {label}
    </label>
  </div>
);


export const EditableField = ({
  className = '',
  value: val,
  color,
  backgroundColor,
  children,
  onChange,
  type = 'text',
  name,
  defaultValue = 'edit text',
  textarea,
  error,
  childElement
}) => {
  const value = val || children || defaultValue;
  const [editable, setEditable] = useState(false);

  const onEditable = () => {
    setEditable(true);
  };
  const onEditableDisabled = (e = window.event) => {
    if ((e.shiftKey || e.ctrlKey) && e.keyCode === 13 && textarea) return;

    if (e.target && !e.target.value) e.target.value = defaultValue;

    e.target.value = e.target.value.trim();
    onChange && onChange(e);
    setEditable(false);
  };
  const onEnterKey = (e) => {
    if (e.key === 'Enter') onEditableDisabled(e);
  };

  const Element = (props) => (textarea ? <textarea {...props} /> : <input {...props} />);
  const style = { color, backgroundColor };
  return (
    <div style={style} onClick={onEditable} className={`editable-field ${className}`}>
      {
        editable
          ? (
            <Element
              className={`editable-field-input ${textarea ? 'editable-field-textarea' : ''}`}
              type={type}
              name={name}
              autoFocus
              onBlur={onEditableDisabled}
              onKeyDown={onEnterKey}
              defaultValue={value}
            />
          )
          : (
            <div className={`editable-field-text ${textarea ? 'editable-field-textarea' : ''}`}>
              {value}
            </div>
          )
      }
      {error && (
        <span
          tooltip={error}
          className='editable-field-error'
        >
          <i className='fas fa-info-circle' />
        </span>
      )}
      {childElement && childElement}
    </div>
  );
};


export { default as EditableInputField } from './EditableInputField';
export { default as EditableTextField } from './EditableTextField';
export { default as InputGroup } from './InputGroup';

