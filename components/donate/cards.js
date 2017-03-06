import React from 'react';

const Cards = React.createClass({
  cardType(type) {
    return this.props.stripe.card_type == type
      ? 'card-type card-type--active'
      : 'card-type';
  },
  
  render() {
    const {texts} = this.props;

    return (
      <div className="form-group donate_landing__cards">
        <img
          className={this.cardType('visa')}
          src={`//d9hhrg4mnvzow.cloudfront.net/africa.acninternational.org/usa/dc5a1ddd-visa.png`}
        />
        <img
          className={this.cardType('master-card')}
          src={`//d9hhrg4mnvzow.cloudfront.net/africa.acninternational.org/usa/b59fb4ec-mastercard.png`}
        />
        <img
          className={this.cardType('diners-club')}
          src={`//d9hhrg4mnvzow.cloudfront.net/africa.acninternational.org/usa/ab753fb2-dinersclub.png`}
        />
        <img
          className={this.cardType('american-express')}
          src={`//d9hhrg4mnvzow.cloudfront.net/africa.acninternational.org/usa/74b4d19c-americanexpress.png`}
        />
        <img
          className={this.cardType('discover')}
          src={`//d9hhrg4mnvzow.cloudfront.net/africa.acninternational.org/usa/92a282bd-discover.png`}
        />
      </div>
    );
  }
});

export default Cards;
