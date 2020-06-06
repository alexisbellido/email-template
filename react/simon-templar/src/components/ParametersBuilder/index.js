import React from 'react';
import './ParametersBuilder.css';

const ParametersBuilder = (props) => {

    const handleChange = e => {
        props.handleChange(e);
    }

    return (
        <form className="parameters-builder">
            <h2>Parameters</h2>
            <div>
                <label>Sender</label>
                <input type="email" name="sender" placeholder="from@example.com" value={props.parameters.sender} onChange={handleChange} />
            </div>
            <div>
                <label>Recipient</label>
                <input type="email" name="recipient" placeholder="to@example.com" value={props.parameters.recipient} onChange={handleChange} />
            </div>
            <div>
                <label>Template</label>
                <textarea name="template" value={props.parameters.template} onChange={handleChange}/>
            </div>
        </form>
    );
}

export default ParametersBuilder;