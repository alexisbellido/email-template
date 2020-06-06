import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

import Builder from './components/Builder';
import Previewer from './components/Previewer';

const App = () => {

  // TODO start with no fields
  const [fields, setFields] = useState({
    "color": "",
    "planet": ""
  });

  // TODO array for dynamic inputs
  const [dynamicFields, setDynamicFields] = useState([
    {
      "id": "4",
      "fieldName": "animal",
      "fieldValue": "horse"
    },
    {
      "id": "6",
      "fieldName": "country",
      "fieldValue": "uruguay"
    }
  ]);

  const [parameters, setParameters] = useState({
    template: "Change me",
    sender: "",
    recipient: ""
  });

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
    // Use setFields for input starting with "field-" and
    // setParameters for template, sender and recipient.
    const re = /(field-)(.*)/
    const matches = e.target.name.match(re);
    let name;
    const value = e.target.value;
    if (matches) {
      name = matches[2];
      setFields({
        ...fields,
        [name]: value
      });
    } else {
      name = e.target.name;
      setParameters({
        ...parameters,
        [name]: value
      });
    }
  };

  const sendEmail = e => {
    console.log('sending email from App');
    console.log('parameters');
    console.log(parameters);
    console.log('fields');
    console.log(fields);

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

  // TODO make dynamicFields a component
  return (
    <div className="App">
      <h1>Simon Templar</h1>
      {dynamicFields.map(field => {
        return (
          <div key={field.id}>
            <span>{field.id}</span>
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
          </div>
        );
      })}
      <Builder
        handleChange={handleChange}
        sendEmail={sendEmail}
        parameters={parameters}
        fields={fields} />
      <Previewer
        template={parameters.template}
        fields={fields} />
    </div>
  );
}

export default App;
