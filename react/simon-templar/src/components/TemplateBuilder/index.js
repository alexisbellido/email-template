import React from 'react';
import './TemplateBuilder.css';

const TemplateBuilder = () => {
    return (
        <form className="template-builder">
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
                <textarea value=""  onChange={() => false} />
            </div>
            <div>
                <button>Send Email</button>
                <p className="hidden notification">Your message was sent</p>
            </div>
        </form>
    );
}

export default TemplateBuilder;