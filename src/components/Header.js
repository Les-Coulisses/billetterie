import React from 'react';

import header from '../images/header.jpg';

const styles = {
  image: {
    position: 'fixed',
    // maxHeight: '100vh',
    height: '120%',
    overflow: 'hidden',
    zIndex: -1
  }
};

const Header = () => <img style={styles.image} src={header} />;

export default Header;
