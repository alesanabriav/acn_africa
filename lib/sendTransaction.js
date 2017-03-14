
const sendTransaction = function() {
	return new Promise((resolve, reject) => {
		if (typeof ga !== 'undefined') {
			setTimeout(() => {
				  ga('ecommerce:addTransaction', {
					id: `${this.contact.email}-${id}`,
					affiliation: 'ACN International',
					revenue: amount,
					currency: 'USD'
				});

				ga('ecommerce:send');
				return resolve();
			}, 3000);
   
  	} else {
			return reject('ga isnt loaded');
		}
	})
	.catch((ex) => {
    console.log('Error sending Google analytics transaction');
    console.log(ex);
  });

}