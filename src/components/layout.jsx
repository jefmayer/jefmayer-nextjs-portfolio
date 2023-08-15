/* eslint-disable react/forbid-prop-types */
import * as React from 'react';
import PropTypes from 'prop-types';

function Layout({ children }) {
  return (
    <div className="site-wrapper">{children}</div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
/* eslint-enable react/forbid-prop-types */
