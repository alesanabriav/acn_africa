import React from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';

const Contact = React.createClass({
  getDefaultProps() {
    return {contact: {}, countries: [], errors: {contact: {}}, texts: {}};
  },

  validate(field, val = '') {
    let valid = !isEmpty(val);
    if (field == 'email') valid = isEmail(val);
    let contact = {...this.props.errors.contact, [field]: valid};
    return {...this.props.errors, contact};
  },

  handleChange(field, e) {
    if(e.keyCode == 9) {
      e.preventDefault();
    }
    let val = e.currentTarget.value;
    let errors = this.validate(field, val);

    this.props.onChange({
      contact: {...this.props.contact, [field]: val},
      errors
    });
  },

  showErr(field) {
    return this.props.errors.contact[field] == false
      ? 'form-group__error'
      : 'hidden';
  },

  inputErrStyle(field) {
    return this.props.errors.contact[field] == false ? 'form-group--error' : '';
  },
  
  validateAll() {
    let {contact, texts} = this.props;
    let name = this.validate('name', contact.name);
    let email = this.validate('email', contact.email);
    let country = contact.country || texts.country;
    let countryValidation = this.validate('country', country);

    let errors = {
      ...this.props.errors,
      contact: {...name.contact, ...email.contact, ...countryValidation.contact}
    };

    this.props.onChange({errors});
    return errors;
  },
  render() {
    const {texts, contact} = this.props;

    return (
      <div style={{width: this.props.width, float: 'left', padding: '1px'}}>
        <div className="row">
          <div className="form-group col-12-l">
            <input
              type="text"
              className={`form-control ${this.inputErrStyle('name')}`}
              placeholder={texts.placeholder_name}
              onChange={this.handleChange.bind(null, 'name')}
              value={contact.name}
              autoComplete="off"
            />
            <span className={this.showErr('name')}>
              {texts.validation_name}
            </span>
          </div>
          <div className="form-group col-12-l">
            <input
              type="text"
              className={`form-control ${this.inputErrStyle('email')}`}
              placeholder={texts.placeholder_email}
              onChange={this.handleChange.bind(null, 'email')}
              value={contact.email}
              autoComplete="off"
            />
            <span className={this.showErr('email')}>
              {texts.validation_email}
            </span>
          </div>
          <div className="form-group col-12-l">
            <select
              type="text"
              className="form-control"
              placeholder={texts.placeholder_country}
              onChange={this.handleChange.bind(null, 'country')}
              value={contact.country || texts.country}
            >
            <option>{texts.select_country}</option>
              {this.props.countries.map((country, i) => {
                return <option key={i} value={country}>{country}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
});

export default Contact;
