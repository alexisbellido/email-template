import React from 'react';
import './FieldsBuilder.css';

const FieldsBuilder = (props) => {

    const addField = (e) => {
        e.preventDefault();
        props.addField();
    };

    const removeField = (field, e) => {
        e.preventDefault();
        props.removeField(field);
    };

    const handleFieldChange = (field, e) => {
        props.handleFieldChange(field, e);
    };

    return (
        <form className="fields-builder">
            <h2>Fields</h2>
            <div>
                <button onClick={addField}>Add field</button>
            </div>
            {props.dynamicFields.map(field => {
                return (
                <div key={field.id}>
                    <input
                        type="text"
                        value={field.fieldName}
                        name="fieldName"
                        placeholder="field name"
                        onChange={(e) => handleFieldChange(field, e)}
                    />
                    <input
                        type="text"
                        value={field.fieldValue}
                        name="fieldValue"
                        placeholder="field value"
                        onChange={(e) => handleFieldChange(field, e)}
                    />
                    <button onClick={(e) => removeField(field, e)}>x</button>
                </div>
                );
            })}
        </form>
    );
};

export default FieldsBuilder;