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
    static SmallInput = props => (
        <input className='input-field small-input' placeholder={props.children} />
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
    static AddComponentField = ({ style = 'primary-color', children, notes, description, ...props }) => (
        <div onClick={alert}
            className='add-elements-container'>
            <span className={'add-element-circle ' + style}>
                <i class="fas fa-plus"></i>
            </span>
            <span className='add-input-field' >{children}</span>
            <span className='add-element-notes'>{notes}</span>
            <span className='add-element-description'>{description}</span>
        </div>
    )
    static SelectOption = props => (
        <select className='select-input-field'>
            {/*<span className='select-arrow-down'>1</span>*/}
            <option className='select-option' value='1'>One Time Price</option>
            <option className='select-option' value='2'>Monthly subscription</option>
            <option className='select-option' value='3'>Yearly subscription</option>
        </select>
    )
    static PriceField = props => (
        <div className='price-input-holder'>
            <span className='currancy-type'>$</span>
            <input className='price-input-field' />
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
        <label class="switch-slider-input">
            <input type="checkbox" />
            <span class="slider-input slider-round"></span>
        </label>
    )

    static CodeInputArea = props => (
        <div className='code-area-container'>
            <textarea className='codearea-input-field' />
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

