import React from "react";
import { Route } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { variables } from '../theme';

export const RouteWithProps = ({ path, exact, strict, component: Component, location, ...rest }) => {
  const subTitle = capitalizeFirstLetter(path.split("/")[1]);
  return (
    <DocumentTitle title={(subTitle ? subTitle : 'Home') + ` | ${variables.appTitle}`}>
      <Route
        path={path}
        exact={exact}
        strict={strict}
        location={location}
        render={props => <Component {...props} {...rest} />}
      />
    </DocumentTitle>
  );
};

export function generateRandom(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export const checkValidity = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};
