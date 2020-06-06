import React from 'react';
import './ParametersBuilder.css';

const ParametersBuilder = (props) => {

    const handleChange = e => {
        props.handleChange(e);
    }

    return (
        <form className="parameters-builder">
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
        </form>
    );
}

export default ParametersBuilder;