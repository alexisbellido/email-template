import React from 'react';
import './Previewer.css';
import Handlebars from "handlebars";

// TODO use Handlebars to get template and fields from state and process
// with Handlebars and display
const Previewer = () => {
    const template = Handlebars.compile("Hello, I am {{name}}");
    const rendered_template = template({name: "Mickey"});
    console.log(rendered_template);
    return (
        <div className="previewer">
            <p>Click the preview button below to see how your template will render with the values provided.</p>
            <button>Preview</button>
            <p>This is what the email message will look like.</p>
            <div>{rendered_template}</div>
        </div>
    );
    }

export default Previewer;