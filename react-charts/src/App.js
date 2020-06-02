// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Graphs from './Graphs'
// import { Avatar} from '@material-ui/core';

// function App() {
//   return (
//     <div className="App"> 
//         <Avatar  alt="logo" src={logo} style={{height:70, width:70}}/>
//         <Graphs username="wesbos"></Graphs>
//     </div>
//   );
// }

// export default App;
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Graphs from './Graphs'

class ReactElement extends HTMLElement {
  username = '';
  constructor() {
    super();
    this.observer = new MutationObserver(() => this.update());
    this.observer.observe(this, { attributes: true });
  }

  connectedCallback() {
    this._innerHTML = this.innerHTML;
    this.username = this.getAttribute("username");
    const propTypes = Graphs.propTypes ? Graphs.propTypes : {};
    const props = {
      ...this.getProps(this.attributes, propTypes),
    };
    render(<Graphs {...props} />, this);
    this.mount();
  }

  disconnectedCallback() {
    this.unmount();
    this.observer.disconnect();
  }

  update() {
    this.unmount();
    this.mount();
  }

  mount() {
    const propTypes = Graphs.propTypes ? Graphs.propTypes : {};
    const props = {
      ...this.getProps(this.attributes, propTypes),
    };
    render(<Graphs {...props} />, this);
  }

  unmount() {
    unmountComponentAtNode(this);
  }

  getProps(attributes, propTypes) {
    propTypes = propTypes|| {};
    let arr  =  [ ...attributes ]         
      .filter(attr => attr.name !== 'style')         
      .map(attr => this.convert(propTypes, attr.name, attr.value))
      .reduce((props, prop) => 
        ({ ...props, [prop.name]: prop.value }), {});
    return arr 
  }

  convert(propTypes, attrName, attrValue) {
    const propName = Object.keys(propTypes)
      .find(key => key.toLowerCase() == attrName);
    let value = attrValue;
    if (attrValue === 'true' || attrValue === 'false') 
      value = attrValue == 'true';      
    else if (!isNaN(attrValue) && attrValue !== '') 
      value = +attrValue;      
    else if (/^{.*}/.exec(attrValue)) 
      value = JSON.parse(attrValue);
    return {         
      name: propName ? propName : attrName,         
      value: value      
    };
  }
}

customElements.define('react-el', ReactElement);





