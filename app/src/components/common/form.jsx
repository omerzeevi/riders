import React, { Component } from 'react';
import Input from './input'

class Form extends Component {
    renderInput(name, label, error, type = "text") { 
        return <Input name={name} label={label} error={error} type={type} />;
    }
    renderButton(label) {
        return <button className="btn btn-success">{label}</button>
    }
}
 
export default Form;