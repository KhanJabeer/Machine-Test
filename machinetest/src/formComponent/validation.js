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

          return { msg: "Email is invalid", state: false };//validation occurs break the loop & throw the error
        }
      } else if (validatorsArray[valid].name === 'minLength') {
        if (textValue.length > parseInt(validatorsArray[valid].params)) {
          return { msg: "Length should not exceed " + validatorsArray[valid].params + " characters", state: false };//validation occurs break the loop & throw the error
        }
      } else if (validatorsArray[valid].name === 'custommaxLength') {
        if (textValue.length > parseInt(validatorsArray[valid].params)) {
          return { msg: "Length should not exceed " + validatorsArray[valid].params + " characters", state: false };//validation occurs break the loop & throw the error
        }
      } else if (validatorsArray[valid].name === 'mobile') {
        var re = /^([0-9][0-9]{9,14})$/;
        if (re.test(textValue) === false) {
          return { msg: "Please Enter 10 to 15 digit Mobile Number", state: false };
        }
      }
      else if (validatorsArray[valid].name === 'mobile_india') {
        var re = /^([0-9][0-9]{9})$/;
        if (re.test(textValue) === false) {
          return { msg: "Please Enter 10 digit Mobile Number", state: false };
        }
      }

      else if (validatorsArray[valid].name === 'leave') {
        var re = /^(0|[1-9][0-9]{0,1})$/;
        if (re.test(textValue) === false) {
          return { msg: "2 digits only allowed", state: false };
        }
      }
      else if (validatorsArray[valid].name === 'mark') {
        var re = /^([0-9][0-9]{0,2})$/;
        if (re.test(textValue) === false) {
          return { msg: "Please Enter 3 digits Only", state: false };
        }
      }
       else if (validatorsArray[valid].name === 'regex') {
        if (new RegExp(validatorsArray[valid].params).test(textValue) === false) {
          return { msg: validatorsArray[valid].msg, state: false };
        }
      }
      else if (validatorsArray[valid].name === 'webUrl') {
        var re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
        if (re.test(textValue) === false) {
          return { msg: "Url is invalid", state: false };
        }
      }
      else if (validatorsArray[valid].name === 'address') {
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