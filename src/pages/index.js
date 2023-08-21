/* eslint-disable react/function-component-definition */
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchSiteData,
  setActiveSection,
} from '../actions';
import {
  getSectionById,
  getSectionIdFromClassNames,
} from '../utils/section-utils';
import getSectionComponentMap from '../components/sections/section-manifest';
import { initScrollObserver } from '../utils/browser-scroll';
import { initScrollMagicController } from '../utils/scroll-magic';
import { isBrowser } from '../utils/browser-utils';
import Footer from '../components/footer';
import Header from '../components/header';
import Intro from '../components/sections/intro';
import Loader from '../components/loader';
import Layout from '../components/layout';

class IndexPage extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    initScrollMagicController();
    initScrollObserver({
      onUpdate: (classNames, isIntersecting) => {
        const id = getSectionIdFromClassNames(classNames);
        if (isIntersecting) {
          dispatch(setActiveSection(id));
        }
      },
    });
    // Reset window to top
    setTimeout(() => {
      if (isBrowser()) {
        window.scroll(0, 0);
      }
    }, 250);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchSiteData('portfolio-data.json'));
  }

  render() {
    const {
      activeSectionId,
      assetLoadComplete,
      assetLoadPercentage,
      assetPreloadComplete,
      assetPreloadPercentage,
      data,
      isMenuOpen,
    } = this.props;
    const isDataLoaded = data.length > 0;
    return (
      <>
        <Head>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <title>Jef Mayer</title>
          <meta name="description" content="Jef Mayer is a Tucson-based creative and digital technology consultant focusing on website development and designing interactive experiences" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Jef Mayer" />
          <meta property="og:title" content="Jef Mayer" />
          <meta property="og:description" content="Jef Mayer is a Tucson-based creative and digital technology consultant focusing on website development and designing interactive experiences" />
          <meta property="og:url" content="https://www.jefmayer.com/" />
          <meta property="og:image" content="https://www.jefmayer.com/images/poster-image.gif" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="Jef Mayer" />
          <meta name="twitter:image:alt" content="Jef Mayer is a Tucson-based creative and digital technology consultant focusing on website development and designing interactive experiences" />
          <meta property="og:type" content="website" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="canonical" href="https://www.jefmayer.com/" />
        </Head>
        <Layout>
          {isDataLoaded
          && (
            <>
              <Loader
                activeSectionId={activeSectionId}
                assetLoadComplete={assetLoadComplete}
                assetLoadPercentage={assetLoadPercentage}
                assetPreloadComplete={assetPreloadComplete}
                data={data}
              />
              <Header
                activeSectionId={activeSectionId}
                data={data}
                isMenuOpen={isMenuOpen}
                onMenuClick={this.onMenuClick}
                onNavClick={this.onNavClick}
              />
              <Intro
                assetLoadComplete={assetLoadComplete}
                assetPreloadComplete={assetPreloadComplete}
                assetPreloadPercentage={assetPreloadPercentage}
              />
              {getSectionComponentMap().map((section) => {
                const {
                  id,
                  SectionComponent,
                } = section;
                return (
                  <SectionComponent
                    assetLoadComplete={assetLoadComplete}
                    assetPreloadComplete={assetPreloadComplete}
                    data={getSectionById(id, data)}
                    key={id}
                  />
                );
              })}
              <Footer />
            </>
          )}
        </Layout>
      </>
    );
  }
}

IndexPage.propTypes = {
  assetLoadComplete: PropTypes.bool.isRequired,
  assetLoadPercentage: PropTypes.number.isRequired,
  assetPreloadComplete: PropTypes.bool.isRequired,
  assetPreloadPercentage: PropTypes.number.isRequired,
  activeSectionId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const {
    activeSection,
    assetLoadStatus,
    menu,
    siteData,
  } = state;
  const {
    id: activeSectionId,
  } = activeSection;
  const {
    assetLoadComplete,
    assetLoadPercentage,
    assetPreloadComplete,
    assetPreloadPercentage,
  } = assetLoadStatus;
  const {
    isOpen: isMenuOpen,
  } = menu;
  const {
    items: data,
  } = siteData;
  return {
    activeSectionId,
    assetLoadComplete,
    assetLoadPercentage,
    assetPreloadComplete,
    assetPreloadPercentage,
    data,
    isMenuOpen,
  };
};

export default connect(mapStateToProps)(IndexPage);
/* eslint-enable react/function-component-definition */
