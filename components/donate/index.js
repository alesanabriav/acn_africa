import 'babel-polyfill';
import React from 'react';
import qs from 'qs';
import request from 'axios';
import Amount from './amount';
import CreditCard from './credit_card';
import Contact from './contact';
import multipleRender from '../../lib/mutiple_render';
import '../../scss/donate.scss';
import Progress from './progress';

const Donate = React.createClass({
  getInitialState() {
    return {
      section: 0,
      left: 0,
      loading: false,
      donation_type: 'monthly',
      amount: 30,
      currency: 'usd',
      countries: [],
      contact: {name: '', email: '', country: ''},
      stripe: {
        card_type: '',
        number: '',
        exp_month: '',
        exp_year: '',
        cvc: '',
        token: ''
      },
      errors: {stripe: {}, contact: {}}
    };
  },

  getDefaultProps() {
    return {texts: {}, redirect: {}};
  },

  fetchCountries() {
    const data = qs.stringify({action: 'countries'});

    return request.post('https://acninternational.org/wp-admin/admin-ajax.php', data)
    .then(res => {
      this.setState({countries: res.data});
      return res.data;
    });
  },
  
  componentDidMount() {
    if(this.donateForm) {
      this.donateForm.addEventListener('keydown', (e) => {
        if(e.keyCode == 9) {
          e.preventDefault();
          return;
        }
      });
    }
  },

  componentWillMount() {
    this.fetchCountries();
  },

  handleChange(field) {
    this.setState({...this.state, ...field});
  },

  handleSubmit(e) {
    e.preventDefault();
    this.nextSection();
  },

  stripeToken() {
    let data = qs.stringify({action: 'stripe_token', data: this.state.stripe});

    return request.post('https://acninternational.org/wp-admin/admin-ajax.php', data)
      .then(res => {
        const stripe = {...this.state.stripe, token: res.data.id};
        this.setState({loading: false, stripe});
      });
  },

  stripeCharge() {
    const {
      contact,
      currency,
      amount,
      donation_type,
      stripe: {token}
    } = this.state;

    const data = {
      ...contact,
      currency,
      amount,
      donation_type,
      stripe_token: token
    };

    const dataAjax = qs.stringify({action: 'stripe_charge', data});

    return request.post('https://acninternational.org/wp-admin/admin-ajax.php', dataAjax);
  },

  completeTransaction(stripeResponse = {}) {
    const {amount, donation_type} = this.state;
    const base = this.props.redirect[donation_type];
    const {customer, id} = stripeResponse;

    if (typeof ga !== 'undefined') {
      ga('ecommerce:addTransaction', {
        id: `${this.contact.email}-${id}`,
        affiliation: 'ACN International',
        revenue: amount,
        currency: 'USD'
      });

      ga('ecommerce:send');
    }

    let url = `${base}?customer_id=${customer}-${id}&order_revenue=${amount}&order_id=${id}`;
    window.location = url;
  },

  creditCardIsValid() {
    let errs = this.creditCard.allValidations();
    return Object.keys(errs.stripe).every(key => errs.stripe[key] == true);
  },

  contactIsValid() {
    let errs = this.contact.validateAll();
    return Object.keys(errs.contact).every(key => errs.contact[key] == true);
  },

  nextSection() {
    let section = this.state.section < 2 ? this.state.section + 1 : 2;
    this.setState({loading: true});

    if (this.state.section == 1) {
      if (!this.creditCardIsValid()) {
        this.setState({loading: false});
        return false;
      };
      this.stripeToken();
    }

    if (this.state.section == 2) {
      if (!this.contactIsValid()) {
         this.setState({loading: false});
        return false
      };
      this.stripeCharge().then(res => this.completeTransaction(res.data));
    }

    let left = `-${section * 100}%`;
    this.setState({section, left, loading: false});
  },

  prevSection(e) {
    e.preventDefault();
    let section = this.state.section >= 0 ? this.state.section - 1 : 0;
    let left = `-${section * 100}%`;
    this.setState({section, left});
  },

  render() {
    let sectionWidth = `${100 / 3}%`;
    let viewPortStyle = {width: '300%', left: this.state.left};
    let donationTypeStyle = {
      display: 'inline',
      marginLeft: '15px',
      color: '#fff'
    };

    let backBtnStyle = {
      float: 'right',
      background: 'transparent',
      border: 'none',
      fontSize: '20px',
      color: '#fff',
      fontWeight: 'bold'
    };

    return (
      <form 
        onSubmit={this.handleSubmit} 
        className="donate_react" 
        ref={donateForm => this.donateForm = donateForm} 
      > 
        <div className="donate_react__viewport" style={viewPortStyle}>
          <Amount
            {...this.state}
            {...this.props}
            width={sectionWidth}
            onChange={this.handleChange}
          />
          <CreditCard
            ref={creditCard => this.creditCard = creditCard}
            {...this.state}
            {...this.props}
            width={sectionWidth}
            onChange={this.handleChange}
          />
          <Contact
            ref={contact => this.contact = contact}
            {...this.state}
            {...this.props}
            width={sectionWidth}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <button
            className="donate_react__submit pull-left"
            onClick={this.handleSubmit}
            disabled={this.state.loading}
          >
            {
              this.state.section == 1
                ? this.props.texts.next
                : this.props.texts.donate
            }
            {this.state.loading ? '...' : ''}
          </button>
          <span style={donationTypeStyle}>
            {
              `${this.state.amount} USD ${this.props.texts[this.state.donation_type]}`
            }
          </span>
          {
            this.state.section > 0
              ? <button style={backBtnStyle} onClick={this.prevSection}>
                {this.props.texts.back}
              </button>
              : ''
          }
        </div>
        <Progress section={this.state.section} />
      </form>
    );
  }
});


multipleRender('.bs-donate', Donate);

