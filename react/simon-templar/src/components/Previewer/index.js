import React from 'react';
import './Previewer.css';
import Handlebars from "handlebars";

// TODO use Handlebars to get template and fields from state and process
// with Handlebars and display
const Previewer = (props) => {
    // const template = Handlebars.compile(props.template);
    // const rendered_template = template({name: "Mickey"});
    // console.log(rendered_template);
    let rendered_template = '';
    return (
        <div className="previewer">
            <h2>Preview</h2>
            <div>{rendered_template}</div>
        </div>
    );
}

export default Previewer;