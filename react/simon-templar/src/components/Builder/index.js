import React from 'react';
import './Builder.css';

const Builder = (props) => {

    const sendEmail = e => {
        e.preventDefault();
        props.sendEmail();
    };

    const handleChange = e => {
        props.handleChange(e);
    }

    return (
        <form className="builder">
            <div>
                <label>Sender</label>
                <input type="text" name="sender" value={props.parameters.sender} onChange={handleChange} />
            </div>
            <div>
                <label>Recipient</label>
                <input type="text" name="recipient" value={props.parameters.recipient} onChange={handleChange} />
            </div>
            <div>
                <label>Template</label>
                <textarea name="template" value={props.parameters.template} onChange={handleChange}/>
            </div>
            <h2>Fields</h2>
            <div>
                <label>Color</label>
                <input type="text" name="field-color" value={props.fields.color} onChange={handleChange} />
            </div>
            <div>
                <label>Planet</label>
                <input type="text" name="field-planet" value={props.fields.planet}  onChange={handleChange} />
            </div>
            <div>
                <button onClick={sendEmail}>Send Email</button>
                <p className="hidden notification">Your message was sent</p>
            </div>
        </form>
    );
}

export default Builder;