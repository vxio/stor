import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul>
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
    <NavigationItem link="/cart">Cart</NavigationItem>
  </ul>
);

export default navigationItems;
