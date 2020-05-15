import React from 'react';

import '../scss/normalize.scss';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import ReactHelmet from '../components/ReactHelmet';
import ModalOrder from '../components/ModalOrder';

const styles = {
  layout: {
    width: '100vw',
    height: '100vh'
  }
};

const IndexPage = () => (
  <div style={styles.layout}>
    <ReactHelmet />
    <Navbar />
    <ModalOrder />
    <Header />
  </div>
);

export default IndexPage;
