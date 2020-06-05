import React from 'react';
import './Builder.css';

const Builder = (props) => {

    const handleButton = (e) => {
        e.preventDefault();
        props.handleButton();
    };
    
    return (
        <form className="builder">
            <div>
                <label>Sender</label>
                <input type="text" name="sender" />
            </div>
            <div>
                <label>Recipient</label>
                <input type="text" name="recipient" />
            </div>
            <div>
                <label>Template</label>
                <textarea value="" onChange={() => false} />
            </div>
            <h2>Fields</h2>
            <div>
                <label>Color</label>
                <input type="text" name="color" />
            </div>
            <div>
                <label>Planet</label>
                <input type="text" name="planet" />
            </div>
            <div>
                <button onClick={(e) => handleButton(e)}>Test Button with handler</button>
            </div>
            <div>
                <button>Send Email</button>
                <p className="hidden notification">Your message was sent</p>
            </div>
        </form>
    );
}

export default Builder;