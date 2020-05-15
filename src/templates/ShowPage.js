import React from 'react';

const ShowPage = ({ pageContext }) => {
  const { slug } = pageContext;
  return (
    <div
      style={{
        height: '100vh',
        width: '100eh',
        display: 'flex',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {slug}
    </div>
  );
};

export default ShowPage;
