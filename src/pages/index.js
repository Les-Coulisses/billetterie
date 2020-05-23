import React from 'react';
import '../scss/normalize.scss';
import Navbar from '../components/NavBar';
import Header from '../components/Header';
import ReactHelmet from '../components/ReactHelmet';
import ModalOrder from '../components/ModalOrder';

const styles = {
  layout: {
    width: 'vw',
    height: 'vh'
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
