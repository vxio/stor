/* VALIDATORS */
export const required = value => (value ? undefined : "Required");
export const onlyNumbers = value => (isNaN(value) ? "Must be a number" : undefined);
export const onlyLetters = value => (/^[a-zA-Z\s]*$/.test(value) ? undefined : "Must only contain letters");

export const checkDigits = (digits, label) => value =>
  !isNaN(value) && value.length === digits ? undefined : `Enter a ${digits} digit ${label}`;
export const validEmail = value => {
  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  return pattern.test(value) ? undefined : "Enter a valid email address";
};

export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);


