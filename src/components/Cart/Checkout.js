import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  
  const confirmHandler = (event) => {
    event.preventDefault();

    const nameValue = nameInputRef.current.value;
    const streetValue = streetInputRef.current.value;
    const postalValue = postalInputRef.current.value;
    const cityValue = cityInputRef.current.value;

    const nameValueIsValid = !isEmpty(nameValue);
    const streetValueIsValid = !isEmpty(streetValue);
    const postalValueIsValid = !isEmpty(postalValue);
    const cityValueIsValid = isFiveChars(cityValue);

    setFormInputsValidity({
      name: nameValueIsValid,
      street: streetValueIsValid,
      postalCode: postalValueIsValid,
      city: cityValueIsValid
    });

    const formIsValid = 
      nameValueIsValid && 
      streetValueIsValid && 
      postalValueIsValid && 
      cityValueIsValid;

    if (!formIsValid) {
      return;
    }
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please enter a valid street address</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal-code'>Postal Code</label>
        <input type='text' id='postal-code' ref={postalInputRef}/>
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code (5 characters long)</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;