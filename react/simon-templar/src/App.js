import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Handlebars from "handlebars";

import './App.css';

import ParametersBuilder from './components/ParametersBuilder';
import FieldsBuilder from './components/FieldsBuilder';
import Previewer from './components/Previewer';

const App = () => {

  // initialize template parameter with an example
  const [parameters, setParameters] = useState({
    template: "Hi {{contact_first_name}},\nGood news! You can get {{discount_rate}} off your next pair of shoes by using this discount code:\n{{discount_code}}\n\nEnjoy!\nSincerely,\nMarketer",
    sender: "",
    recipient: ""
  });

  const [renderedTemplate, setRenderedTemplate] = useState('');
  const [notifications, setNotifications] = useState([]);

  // initialize dynamic fields with a few examples
  const [dynamicFields, setDynamicFields] = useState([
    {
      id: "1",
      fieldName: "contact_first_name",
      fieldValue: "Simon"
    },
    {
      id: "2",
      fieldName: "discount_rate",
      fieldValue: "15%"
    },
    {
      id: "3",
      fieldName: "discount_code",
      fieldValue: "SHOES2020"
    }
  ]);

  useEffect(() => {
    preview();
  });

  const preview = () => {
    let context = {};
    dynamicFields.forEach(field => {
        context[field.fieldName] = field.fieldValue;
    });
    try {
      const template = Handlebars.compile(parameters.template);
      setRenderedTemplate(template(context));
    } catch(error) {
      // don't render if Handlebars reports a parsing error
    }
  };

  const addField = () => {
    // Add a field to the array of dynamic fields.
    // Use Date.now() to keep it simple and generate a unique ID.
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
    // Loop over all dynamic fields and filter out the one we want to remove.
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
        // matching and updating a particular element in the array of dynamic fields.
        if (currentField.id === field.id) {
          return {
            ...currentField,
            [name]: value
          };
        } else {
          return currentField;
        }
      })
    );
  };

  const handleChange = (e) => {
    // set the parameters: template, sender and recipient.
    setParameters({
      ...parameters,
      [e.target.name]: e.target.value
    });
  };

  const isValidEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const isValidPayload = () => {
    let notifications = [];
    if (!isValidEmail(parameters.sender)) {
      notifications.push("Please enter a valid sender email address.");
    }
    if (!isValidEmail(parameters.recipient)) {
      notifications.push("Please enter a valid recipient email address.");
    }
    if (!parameters.template) {
      notifications.push("Template empty. Please add one.");
    }
    setNotifications(notifications);
    return !notifications.length;
  }

  const sendEmail = e => {
    e.preventDefault();
    if (isValidPayload()) {
      let notifications = [];
      let fields = {};
      dynamicFields.forEach(field => {
          fields[field.fieldName] = field.fieldValue;
      });
      
      const payload = {
        sender: parameters.sender,
        recipient: parameters.recipient,
        template: parameters.template,
        fields
      };
      let url = `//localhost:8000/sender/`;
      axios
        .post(url, payload)
        .then(response => {
          if (response.status === 200) {
            notifications.push("Success! I've sent your message.");
            setNotifications(notifications);
          }
        })
        .catch(error => {
          console.log("There was a problem sending your email.", error);
        });
    }
  };

  return (
    <div className="app">
      <h1>Simon Templar</h1>
      <p>Enter the email addresses to use as the sender and the recipient; customize the template using <em>&#123;&#123;field&#125;&#125;</em> where you want to insert your fields; and add or remove fields and their corresponding values.</p>
      <p>Verify the result on the preview panel to the right and once you are ready click <em>Send Email</em> at the bottom.</p>
      <section className="content">
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
        <div>
          <button onClick={sendEmail}>Send Email</button>
        </div>
        <ul className="notifications">
          {notifications.map((notification, index) => 
            <li key={index.toString()}>{notification}</li>
          )}
        </ul>
      </section>
      <section className="preview">
        <Previewer
          preview={preview}
          renderedTemplate={renderedTemplate}
        />
      </section>
    </div>
  );
}

export default App;
