import React from 'react';
import AmountBtns from './amount_btns';
import {onlyNum} from '../../lib/clean_inputs';

const amount = React.createClass({
  getDefaultProps() {
    return {texts: {}, amount: 30};
  },
  changeAmount(amount, e) {
    if (e) e.preventDefault();
    let el = this.amountInput;
    if (amount == 5) el.focus();
    this.props.onChange({amount});
  },
  handleAmount(e) {
    let val = e.currentTarget.value;
    let amount = onlyNum(val);
    this.props.onChange({amount});
  },
  changeType(donation_type, e) {
    if (e) e.preventDefault();
    this.props.onChange({donation_type});
  },
  render() {
    const {texts, donation_type, amount} = this.props;

    return (
      <div style={{width: this.props.width, float: 'left', padding: '1px'}}>
        <AmountBtns texts={texts} changeAmount={this.changeAmount} />
        <div className="row">
          <div className="form-group form-group--addon col-7-l">
            <span className="form-group__addon">
              USD
            </span>
            <input
              ref={amountInput => this.amountInput = amountInput}
              className="form-control"
              type="text"
              onChange={this.handleAmount}
              value={amount}
            />
          </div>
          <div className="form-group col-5-l">
            <a
              href="#"
              onClick={this.changeType.bind(null, 'monthly')}
              className={
                donation_type == 'monthly'
                  ? 'donate_react__type donate_react__type--active'
                  : 'donate_react__type '
              }
            >
              {texts.monthly}
            </a>
            <a
              href="#"
              onClick={this.changeType.bind(null, 'once')}
              className={
                donation_type == 'once'
                  ? 'donate_react__type donate_react__type--active'
                  : 'donate_react__type '
              }
            >
              {texts.once}
            </a>
          </div>
        </div>
      </div>
    );
  }
});

export default amount;
