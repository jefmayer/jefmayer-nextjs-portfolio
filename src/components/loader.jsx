import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setAssetLoadComplete,
  setAssetLoadPercentage,
  setAssetPreloadComplete,
  setAssetPreloadPercentage,
} from '../actions';
import {
  getMainAssetData,
  getPreloadAssetData,
  initLoaderData,
} from '../modules/asset-loader/loader-data';
import { imageWorker, loadAssetSets } from '../modules/asset-loader/concurrent-asset-loader';


class Loader extends Component {
  constructor(props) {
    super(props);
    this.progressBarRef = React.createRef();
    this.bgLoaderRef = React.createRef();
  }

  componentDidMount() {
    const { data, dispatch } = this.props;
    initLoaderData(data);
    const loader = loadAssetSets({
      preloadAssetData: getPreloadAssetData(),
      mainAssetData: getMainAssetData(),
      worker: imageWorker,
      onPreloadComplete: () => {
        dispatch(setAssetPreloadComplete());
      },
      onMainLoadComplete: () => {
        this.bgLoaderRef.current.classList.remove('show');
        dispatch(setAssetLoadComplete());
      },
      onMainLoadUpdate: (data) => {
        const { percent } = data;
        dispatch(setAssetLoadPercentage(percent));
      },
      onPreloadUpdate: (data) => {
        const { percent } = data;
        dispatch(setAssetPreloadPercentage(percent));
      },
    });
    loader.run();
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
  assetLoadComplete: PropTypes.bool.isRequired,
  assetLoadPercentage: PropTypes.number.isRequired,
  assetPreloadComplete: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()),
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  setAssetLoadComplete,
  setAssetLoadPercentage,
  setAssetPreloadComplete,
  setAssetPreloadPercentage,
});

export default connect(
  null,
  mapDispatchToProps,
)(Loader);
