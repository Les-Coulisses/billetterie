import React from 'react';

import '../scss/normalize.scss';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import ReactHelmet from '../components/ReactHelmet';

const styles = {
  layout: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const IndexPage = () => (
  <div style={styles.layout}>
    <ReactHelmet />
    <Navbar />
    <Header />
  </div>
);

export default IndexPage;
