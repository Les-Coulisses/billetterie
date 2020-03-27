import React, { useState, useEffect } from 'react';
import logo from '../images/white-logo.png';

const styles = {
  navbar: {
    height: 77,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: "'Source Sans Pro', sans-serif",
    fontWeight: 300,
    color: 'white',
    position: 'absolute',
    top: 0,
    userSelect: 'none'
  },
  divider: {
    flexGrow: 1,
    height: 3,
    borderTop: 'solid 1px rgba(192, 192, 192, 0.35)',
    borderBottom: 'solid 1px rgba(192, 192, 192, 0.35)'
  },
  verticalDivider: {
    height: '20%',
    borderRight: 'solid 1px rgba(192, 192, 192, 0.35)'
  },
  items: {
    width: 1000,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  logo: { maxHeight: '80%' }
};

const Navbar = () => (
  <div style={styles.navbar}>
    <div style={styles.divider} />
    <div style={styles.verticalDivider} />
    <div style={styles.items}>
      <a>A propos</a>
      <a>Blog</a>
      <img style={styles.logo} src={logo} />
      <a>Contact</a>
      <a>Réserver</a>
    </div>
    <div style={styles.verticalDivider} />
    <div style={styles.divider} />
  </div>
);

const Menu = () => null;

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

const SizeChecker = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width } = windowDimensions;

  if (width < 768) return <Menu />;
  return <Navbar />;
};

export default SizeChecker;
