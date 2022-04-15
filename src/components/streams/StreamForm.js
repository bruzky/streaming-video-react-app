import React from "react";
import { Form, Field } from 'react-final-form';
// import { Field, reduxForm } from 'redux-form';

const StreamForm = (props) => {
  const renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    };
  }

  // * deconstruct formProps to supply all props to element
  const renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input { ...input } autoComplete='off'/>
        {renderError(meta)}
      </div>
    )
    // return <input 
    //           onChange={formProps.input.onChange}
    //           value={formProps.input.value}
    //         />
  }

  const onSubmit = (formValues) => {
    // * onSubmit handler in element is called with the Redux Form method handleSubmit, which is passed our own onSubmit helper function to run. handleSubmit recieves the event directly so we don't have to pass it in. handleSubmit also automatically calls e.preventDefault, so we don't have to call that. Likewise we don't need e.target.value. Instead we pass in the formValues that are inputted and have access to that as an object of values. 

    props.onSubmit(formValues);
  }

  const validate = (formValues) => {
    const errors = {};
  
    if (!formValues.title) errors.title = 'You must enter a title';
    if (!formValues.description) errors.description = 'You must enter a description';
  
    return errors;
  }

  return (
    <Form 
      initialValues={props.initialValues}
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form 
          onSubmit={handleSubmit} 
          className="ui form error">
          <Field 
            name='title' 
            component={renderInput} 
            label='Enter Title'/>
          <Field 
            name='description' 
            component={renderInput} 
            label='Enter Description'/>
          <button className="ui button primary">Submit</button>
        </form>
      )}
    />
  )
};

export default StreamForm;
