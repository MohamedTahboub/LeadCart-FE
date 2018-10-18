import React, { Component } from 'react'
import './style.css'

export class InputRow extends Component {
    static Label = ({ notes, ...props }) => (
        <div className='input-label-container'>
            <span className='input-label '>{props.children}</span>
            <span className='input-label-note'>{notes}</span>
        </div>
    )
    static NormalInput = props => (
        <input className='input-field' placeholder={props.children} />
    )
    static SmallInput = ({type='text' , ...props}) => (
        <input type={type} className='input-field small-input' placeholder={props.children} />
    )
    static CustomInput = ({ width, ...props }) => (
        <input className='input-field custom-input-field' placeholder={props.children} />
    )
    static UrlSuffixInput = props => (
        <div className='url-suffix-input'>
            <span className='suffix-value'>http://tonyhack.leadcart.com/products/</span>
            <input className='url-suffix-input-field' placeholder={props.children} />
        </div>
    )
    static TextAreaInput = props => (
        <div className='text-area-container'>
            <textarea className='textarea-input-field' />
            <span className='text-area-small-note'>27/260</span>
        </div>
    )
    static AddComponentField = ({ color = 'primary-color', onClick, suffixIcon, children, notes, description, ...props }) => (
        <div onClick={onClick}
            className='add-elements-container'>
            <span className={'add-element-circle ' + color}>
                <i class="fas fa-plus"></i>
            </span>
            <span className='add-input-field' >{children}</span>
            <span className='add-element-notes'>{notes}</span>
            <span className='add-element-description'>{description}</span>
            {suffixIcon && <span className='add-element-suffix-element'>{suffixIcon}</span>}

        </div>
    )
    static SelectOption = ({ options = [], ...props }) => (
        <select className='select-input-field'>
            {options.map(({ label, value }) => <option className='select-option' value={value}>{label}</option>)}
        </select>
    )
    static PriceField = ({ children, ...props }) => (
        <div className='price-input-holder'>
            <span className='currancy-type'>$</span>
            <input className='price-input-field' placeholder={children} />
        </div>
    )
    static UrlInput = props => (
        <input className='input-field' placeholder='http://' />
    )
    static CheckBox = ({ children, description, checked, ...props }) => (
        <label class="check-box-container">
            {description &&
                <span className='check-box-description'>{description}</span>}
            <input class='check-box' type="radio" name='product-type' checked={checked} />
            <div class="check-box-indicator">{children}</div>
        </label>
    )

    static ColorInlinePicker = props => (
        <div className='inline-color-picker'>
            <span className='color-label color-default'>default</span>
            <span className='color-label color-monochrome'>MONOCHROME</span>
            <span className='color-label color-blues-earthy'>BLUES EARTHY</span>
            <span className='color-label color-crison'>CRIMSON</span>
            <span className='color-label color-forest'>FOREST</span>
        </div>
    )

    static SwitchInput = props => (
        <label class="switch-slider-input ">
            <input type="checkbox" />
            <span class="slider-input slider-round"></span>
        </label>
    )

    static CodeInputArea = props => (
        <div className='code-area-container'>
            <textarea className='codearea-input-field' placeholder={props.children} />
        </div>
    )

    static FlatSelect = ({ note, ...props }) => (
        <div class='charging-method-picker'>
            <input id='charge-method-el-1' type='radio' name='chargeMethod' class='charge-method-radio-input hiden-element' />
            <label for='charge-method-el-1' class='charging-method-item'>%</label>
            <input checked id='charge-method-el-2' type='radio' name='chargeMethod' class='charge-method-radio-input hiden-element' />
            <label for='charge-method-el-2' class='charging-method-item'>$</label>
            {note && <span class='charging-method-picker-notes'>{note}</span>}
        </div>
    )
    static Note = ({ content, children, ...props }) => (
        <div className='note-element'>
            <span className="note-content">{content}</span>
            {children}
        </div>
    )
    render() {
        const margin = this.props.margin || 12
        console.log(margin)
        return (
            <div style={{ margin: `${margin}px 0px` }} className='input-row'>
                {this.props.children}
            </div>
        )
    }
}

