import React, { useState } from 'react';
import './Builder.css';

const Builder = (props) => {

    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [template, setTemplate] = useState('');

    // TODO make additional fields dynamic and in their own component
    const [color, setColor] = useState('');
    const [planet, setPlanet] = useState('');

    const handleButton = e => {
        e.preventDefault();
        props.handleButton();
    };

    const sendEmail = e => {
        e.preventDefault();
        console.log('sending email');
        console.log(`sender ${sender}`)
        console.log(`color ${color}`)
    };

    return (
        <form className="builder">
            <div>
                <label>Sender</label>
                <input type="text" name="sender" value={sender} onChange={e => setSender(e.target.value)}/>
            </div>
            <div>
                <label>Recipient</label>
                <input type="text" name="recipient" value={recipient} onChange={e => setRecipient(e.target.value)} />
            </div>
            <div>
                <label>Template</label>
                <textarea name="template" value={template} onChange={e => setTemplate(e.target.value)}/>
            </div>
            <h2>Fields</h2>
            <div>
                <label>Color</label>
                <input type="text" name="color" value={color} onChange={e => setColor(e.target.value)} />
            </div>
            <div>
                <label>Planet</label>
                <input type="text" name="planet" value={planet}  onChange={e => setPlanet(e.target.value)} />
            </div>
            <div>
                <button onClick={handleButton}>Test Button</button>
            </div>
            <div>
                <button onClick={sendEmail}>Send Email</button>
                <p className="hidden notification">Your message was sent</p>
            </div>
        </form>
    );
}

export default Builder;