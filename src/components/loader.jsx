import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setAssetLoadComplete,
  setAssetLoadPercentage,
  setAssetPreloadComplete,
  setAssetPreloadPercentage,
} from '../actions';
import { initLoaderData } from '../modules/asset-loader/loader-data';
import { initAssetPreloader } from '../modules/asset-loader/asset-preloader';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.progressBarRef = React.createRef();
    this.bgLoaderRef = React.createRef();
  }

  componentDidMount() {
    const { data, dispatch } = this.props;
    initLoaderData(data);
    initAssetPreloader({
      onPreloadComplete: () => {
        dispatch(setAssetPreloadComplete());
      },
      onLoadComplete: () => {
        this.bgLoaderRef.current.classList.remove('show');
        dispatch(setAssetLoadComplete());
      },
      onLoadUpdate: (value) => {
        dispatch(setAssetLoadPercentage(value));
      },
      onPreloadUpdate: (value) => {
        dispatch(setAssetPreloadPercentage(value));
      },
    });
  }

  render() {
    const {
      assetLoadComplete,
      assetLoadPercentage,
      assetPreloadComplete,
    } = this.props;
    if (this.progressBarRef.current) {
      this.progressBarRef.current.style.transform = `scaleX(${assetLoadPercentage})`;
    }
    return (
      <>
        <div className={`background-loader-wrapper ${assetPreloadComplete && !assetLoadComplete ? 'show' : ''}`} ref={this.bgLoaderRef}>
          <div className="background-loader-progress-bar" ref={this.progressBarRef} />
        </div>
        <div className="section-loader-wrapper">
          <div className="section-loader-animation-wrapper">
            <div className="section-loader-animation">
              <div className="center-fill" />
              <div className="asset-loader" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

Loader.propTypes = {
  // activeSectionId: PropTypes.string,
  assetLoadComplete: PropTypes.bool.isRequired,
  assetLoadPercentage: PropTypes.number.isRequired,
  assetPreloadComplete: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators({
    setAssetLoadComplete,
    setAssetLoadPercentage,
    setAssetPreloadComplete,
    setAssetPreloadPercentage,
  }, dispatch),
});

export default connect(mapDispatchToProps)(Loader);
