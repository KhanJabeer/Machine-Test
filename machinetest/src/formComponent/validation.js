import React, { Component } from 'react';

class ValidationLibrary extends Component {
  checkValidation(textValue, validatorsArray) {
    for (var valid in validatorsArray) {//check validations through array
      if (textValue === "") {//check value is empty
        if (validatorsArray[valid].name === 'required') {
          return { msg: "Field required", state: false };//validation occurs break the loop & throw the error
        }
      } else if (validatorsArray[valid].name === 'email') {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(textValue) === false) {

          return { msg: "Email is invalid", state: false };
        }
      } else if (validatorsArray[valid].name === 'address') {
        var re = /^[a-zA-Z0-9\s,'-.]*$/; 
        if (re.test(textValue) === false) {
          return { msg: "Invalid Address", state: false };
        }
      }
    }
    return { msg: "", state: true };//if no error throw empty message
  }
}
export default new ValidationLibrary();