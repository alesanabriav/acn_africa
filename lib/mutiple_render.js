import React from 'react';
import {render} from 'react-dom';

export default function multipleRender(selector, component) {
  if (document.querySelectorAll(selector).length >= 1) {
    let forms = [...document.querySelectorAll(selector)];

    forms.forEach(el => {
      let props = el.getAttribute('data-props')
        ? JSON.parse(el.getAttribute('data-props'))
        : {};

      render(React.createElement(component, {...props}), el);
    });
  }
}
