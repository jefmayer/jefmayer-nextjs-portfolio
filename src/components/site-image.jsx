import PropTypes from 'prop-types';
import React from 'react';

function SiteImage({ data }) {
  const {
    alt,
    css,
    hiresSrc,
    id,
    sectionId,
    src,
  } = data;
  return (
    <div className={`${id} ${css}`}>
      <div
        className="add-site-img"
        data-section={sectionId}
        data-hires-src={hiresSrc}
        data-src={src}
        data-alt={alt}
      />
    </div>
  );
}

SiteImage.propTypes = {
  data: PropTypes.shape(),
};

export default SiteImage;
