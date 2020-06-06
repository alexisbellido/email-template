import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Handlebars from "handlebars";

import './App.css';

import ParametersBuilder from './components/ParametersBuilder';
import FieldsBuilder from './components/FieldsBuilder';
import Previewer from './components/Previewer';

const App = () => {

  const [parameters, setParameters] = useState({
    template: "Hi {{contact_first_name}},\nGood news! You can get {{discount_rate}} off your next pair of shoes by using this discount code:\n{{discount_code}}\n\nEnjoy!\nSincerely,\nMarketer",
    sender: "",
    recipient: ""
  });

  const [renderedTemplate, setRenderedTemplate] = useState('');
  const [notifications, setNotifications] = useState([]);

  // initialize dynamic fields with an example
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
      // don't render if there's a parsing error
    }
  };

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
    );
  };

  const handleChange = (e) => {
    // set the parameters: template, sender and recipient.
    setParameters({
      ...parameters,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const sendEmail = e => {
    e.preventDefault();
    let notifications = [];
    if (!validateEmail(parameters.sender)) {
      notifications.push("Please enter a valid sender email address.");
    }
    if (!validateEmail(parameters.recipient)) {
      notifications.push("Please enter a valid recipient email address.");
    }
    if (!parameters.template) {
      notifications.push("Template empty. Please add one.");
    }
    if (notifications.length) {
      // invalid parameters, notify
      setNotifications(notifications);
    } else {
      // call API to send email

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
      // console.log('payload', payload);
      
      axios
        .post(url, payload)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log("There was a problem sending your email.", error);
        });

        // axios
        // .post(url, payload, {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // })
        // .then(response => {
        //   console.log(response);
        // })
        // .catch(error => {
        //   console.log("There was a problem sending your email.", error);
        // });

      notifications.push("Success! I've sent your message.");
      setNotifications(notifications);
    }


  };

  return (
    <div className="app">
      <h1>Simon Templar</h1>
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
