import React, { useState } from 'react';
import './Previewer.css';
import Handlebars from "handlebars";

const Previewer = (props) => {
    const [renderedTemplate, setRenderedTemplate] = useState('');

    const preview = (e) => {
        e.preventDefault();
        let context = {};
        props.dynamicFields.forEach(field => {
            context[field.fieldName] = field.fieldValue;
        });
        const template = Handlebars.compile(props.template);
        setRenderedTemplate(template(context));
    };

    return (
        <div className="previewer">
            <h2>Preview</h2>
            <div className="rendered-template">{renderedTemplate}</div>
            <div>
                <button onClick={preview}>Preview</button>
                <p className="hidden notification">Show preview issues here</p>
            </div>

        </div>
    );
}

export default Previewer;