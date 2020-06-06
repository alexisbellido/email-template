import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

import ParametersBuilder from './components/ParametersBuilder';
import FieldsBuilder from './components/FieldsBuilder';
import Previewer from './components/Previewer';

const App = () => {

  const [parameters, setParameters] = useState({
    template: "Change me",
    sender: "",
    recipient: ""
  });

  // initialize dynamic fields with an example
  const [dynamicFields, setDynamicFields] = useState([
    {
      id: "1",
      fieldName: "color",
      fieldValue: "red"
    }
  ]);

  const addField = () => {
    // Add a field to array of dynamic fields.
    // Use milliseconds elapsed since the UNIX epoch to generate a unique ID.
    // We could use another way of generating unique IDs but keeping it simple for this demonstration.
    setDynamicFields(prevDynamicFields => [
      ...prevDynamicFields,
      {
        id: Date.now(),
        fieldName: "",
        fieldValue: ""
      }
    ]);
  };

  const removeField = (field) => {
    // Go over all the dynamic fields and filter out the one we need to remove.
    setDynamicFields(prevDynamicFields =>
      prevDynamicFields.filter(currentField => currentField.id !== field.id)
    );
  };

  const handleFieldChange = (field, e) => {
    const name = e.target.name;
    const value = e.target.value;
    // Pass a function to setDynamicFields that will loop over the previous state
    // of the dynamicFields array and determine which element to update based on ID.
    setDynamicFields(prevDynamicFields =>
      prevDynamicFields.map(currentField => {
        // Use an if block instead of the ternary operator to make it clear that we are
        // matching and updating a particular element in the array.
        if (currentField.id === field.id) {
          return {
            ...currentField,
            [name]: value
          };
        } else {
          return currentField;
        }
      })
    )
  };

  const handleChange = (e) => {
    // set the parameters: template, sender and recipient.
    setParameters({
      ...parameters,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = e => {
    e.preventDefault();
    console.log('sending email from App');
    console.log('parameters');
    console.log(parameters);
    console.log('dynamicFields');
    console.log(dynamicFields);

    // TODO import Axios and post JSON like this to http://localhost:8000/sender/
    // {
    //   "template": "Hello, I like the color {{color}} and I'm from planet {{planet}}. My favorite animal is {{animal}}",
    //   "sender": "from@example.com",
    //   "recipient": "a@zinibu.com",
    //   "fields": {
    //     "color": "blue",
    //     "planet": "pluto"
    //   }
    // }

    console.log(axios);
    // let url = `//example.com:8000/sender/`;
    // let payload = {
    //   template: template,
    // };
    // axios
    //   .post(url, payload, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .catch(error => {
    //     console.log("sendEmail", error);
    //   });
  };

  return (
    <div className="app">
      <h1>Simon Templar</h1>
      <ParametersBuilder
        handleChange={handleChange}
        parameters={parameters}
      />
      <FieldsBuilder
        addField={addField}
        removeField={removeField}
        handleFieldChange={handleFieldChange}
        dynamicFields={dynamicFields}
      />
      <Previewer
        template={parameters.template}
        dynamicFields={dynamicFields}
      />
      <div>
        <button onClick={sendEmail}>Send Email</button>
        <p className="hidden notification">Your message was sent</p>
      </div>
    </div>
  );
}

export default App;
