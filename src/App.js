import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';

class App extends Component{
  // state={
  //   show: true
  // }

  // componentDidMount (){
  //   setTimeout(()=>{
  //     this.setState({show:false})
  //   },5000)
  // }
  // TO SEE THE UNMOUNT FUNCTION WORKING IN ERRORHANDLING

  render(){
    return(
      <div>
        <Layout>
           {/* {this.state.show? <BurgerBuilder /> : null }  */}
           {/* <BurgerBuilder />
           <Checkout /> */}
           <Switch>
           <Route path="/checkout" component={Checkout} />
           <Route path="/" exact component={BurgerBuilder} />
           </Switch>
           
           
        </Layout>

      </div>
    );
  }
}

export default App;