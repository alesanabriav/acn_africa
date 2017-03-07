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
          src={`//acninternational.org/wp-content/themes/acn_int/public/img/cards/Visa.png`}
        />
        <img
          className={this.cardType('master-card')}
          src={`//acninternational.org/wp-content/themes/acn_int/public/img/cards/MasterCard.png`}
        />
        <img
          className={this.cardType('diners-club')}
          src={`//acninternational.org/wp-content/themes/acn_int/public/img/cards/DinersClub.png`}
        />
        <img
          className={this.cardType('american-express')}
          src={`//acninternational.org/wp-content/themes/acn_int/public/img/cards/AmericanExpress.png`}
        />
        <img
          className={this.cardType('discover')}
          src={`//acninternational.org/wp-content/themes/acn_int/public/img/cards/Discover.png`}
        />
      </div>
    );
  }
});

export default Cards;
