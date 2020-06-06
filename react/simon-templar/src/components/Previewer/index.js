import React from 'react';
import './Previewer.css';

const Previewer = (props) => {

    return (
        <div className="previewer">
            <h2>Preview</h2>
            <textarea defaultValue={props.renderedTemplate} readOnly />
        </div>
    );
}

export default Previewer;