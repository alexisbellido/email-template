import React, { useState } from 'react';

import './App.css';

import Builder from './components/Builder';
import Previewer from './components/Previewer';

const App = () => {

  // TODO start with no fields
  const [fields, setFields] = useState({
    "color": "",
    "planet": ""
  });

  const [parameters, setParameters] = useState({
    template: "Change me",
    sender: "",
    recipient: ""
  });

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
  };

  return (
    <div className="App">
      <h1>Simon Templar</h1>
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
