import React from 'react';
import './Previewer.css';

const Previewer = (props) => {

    return (
        <div className="previewer">
            <h2>Preview</h2>
            <div className="rendered-template">{props.renderedTemplate}</div>
        </div>
    );
}

export default Previewer;