import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';

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
           <BurgerBuilder />
        </Layout>

      </div>
    );
  }
}

export default App;