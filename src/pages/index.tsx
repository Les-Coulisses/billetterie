import React from 'react';
import '../scss/normalize.scss';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import ReactHelmet from '../components/ReactHelmet';

const styles = {
  layout: {
    width: 'vw',
    height: 'vh'
  }
};

const IndexPage = () => (
  <div style={styles.layout}>
    <ReactHelmet />
    <NavBar />
    <Header />
  </div>
);

export default IndexPage;
