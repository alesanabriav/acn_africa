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
          src={`/publish/assets/edd88082-37fc-4e9b-80ee-5a18d577e959/dc5a1ddd-visa.png`}
        />
        <img
          className={this.cardType('master-card')}
          src={`${texts.template_uri}/public/img/cards/MasterCard.png`}
        />
        <img
          className={this.cardType('diners-club')}
          src={`${texts.template_uri}/public/img/cards/DinersClub.png`}
        />
        <img
          className={this.cardType('american-express')}
          src={`${texts.template_uri}/public/img/cards/AmericanExpress.png`}
        />
        <img
          className={this.cardType('discover')}
          src={`${texts.template_uri}/public/img/cards/Discover.png`}
        />
      </div>
    );
  }
});

export default Cards;
