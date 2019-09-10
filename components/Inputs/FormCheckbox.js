import React, { Component } from 'react';

export default class FormCheckbox extends Component {
    render(){
        const { name, checked, label, onChange } = this.props;
        return (
            <div className="form-input form-check">
                <input type="checkbox" checked={checked} name={name} onChange={onChange} />
                <label>&nbsp;{label}</label>                
            </div>
        )
    }
}