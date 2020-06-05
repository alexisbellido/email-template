import React from 'react';
import './Previewer.css';
// import Handlebars from "handlebars";

// TODO use Handlebars to get template and fields from state and process
// with Handlebars and display
const Previewer = (props) => {
    // const template = Handlebars.compile("Hello, I am {{name}}");
    // const rendered_template = template({name: "Mickey"});
    // console.log(rendered_template);
    // <div>{rendered_template}</div>

    // TODO I don't think we need a preview button, just preview as fields and template change
    console.log('Previewer template', props.template);
    console.log('Previewer fields', props.fields);
    return (
        <div className="previewer">
            <p>Click the preview button below to see how your template will render with the values provided.</p>
            <button>Preview</button>
            <p className="hidden notification">Preview ready</p>
            <p>This is what the email message will look like.</p>
        </div>
    );
    }

export default Previewer;