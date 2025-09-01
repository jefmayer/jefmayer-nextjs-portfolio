import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import ScrollMagic from 'scrollmagic';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { TimelineLite } from 'gsap';
import {
  getSceneOffsetPos,
  getScrollObserver,
  scrollToPosition,
} from '../../utils/browser-scroll';
import { getScrollMagicController } from '../../utils/scroll-magic';
import {
  hideMenu,
  setActiveSection,
} from '../../actions';
import getSectionComponentMap from './section-manifest';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.onAssetPreloadComplete = this.onAssetPreloadComplete.bind(this);
    this.loaderAnimate = this.loaderAnimate.bind(this);
    this.animate = this.animate.bind(this);
    this.onSeeMoreClick = this.onSeeMoreClick.bind(this);
    this.triggerElement = '.project-animation-intro';
    this.animationRef = React.createRef();
    this.initAnimate = false;
    this.scrollIndicatorSelector = '';
    this.introBordersStyle = {};
    this.ScrollMagic = null;
    document.body.classList.add('site-loading');
  }

  componentDidMount() {
    const observer = getScrollObserver();
    const el = this.animationRef.current;
    observer.observe(el);
    if (typeof window === 'undefined') return;
    (async () => {
      const mod = await import('scrollmagic');
      this.ScrollMagic = mod.default ?? mod;
      this.loaderAnimate();
    })();
  }

  onAssetPreloadComplete() {
    // Update DOM, run once
    setTimeout(() => {
      this.introBordersStyle = {};
      document.body.classList.remove('site-loading');
      document.body.classList.add('site-loaded');
      this.scrollIndicatorSelector = 'animate-in';
      this.forceUpdate();
    }, 1000);
    setTimeout(() => {
      document.body.classList.remove('site-loaded');
      this.scrollIndicatorSelector = 'animate-in animate-loop';
      this.forceUpdate();
      this.animate();
    }, 2000);
  }

  onSeeMoreClick() {
    const { dispatch } = this.props;
    const [section1] = getSectionComponentMap();
    const { id } = section1;
    const pos = getSceneOffsetPos(id);
    scrollToPosition(pos);
    dispatch(setActiveSection(id));
  }

  loaderAnimate() {
    const { ScrollMagic, triggerElement } = this;
    const controller = getScrollMagicController();
    new ScrollMagic.Scene({
      triggerElement,
      duration: 1000,
    }).setClassToggle(triggerElement, 'in-focus')
      .setPin(`${triggerElement} .section-content`)
      .addTo(controller);
  }

  animate() {
    const { dispatch } = this.props;
    const { ScrollMagic, triggerElement } = this;
    const controller = getScrollMagicController();
    const timelines = {
      introRotate: new TimelineLite()
        .fromTo(`${triggerElement} .intro-borders`, 1, { rotation: 106, scaleX: 0.75 }, { rotation: 180, scaleX: 1 })
        .fromTo(`${triggerElement} .scroll-indicator-animation`, { scale: 1, opacity: 1 }, { scale: 0, opacity: 0 }, 0.1),
      introOutro: new TimelineLite()
        .to(`${triggerElement} .intro-border-top`, 1, { y: '-50%' })
        .to(`${triggerElement} .intro-border-bottom`, 1, { y: '50%' }, 0)
        .to(`${triggerElement} .intro-inner-content`, 1, { scale: 0.75, opacity: 0 }, 0)
        .to(`${triggerElement} .intro-borders`, 0.5, { scaleX: 0 }, 1)
        .call(() => {
          dispatch(hideMenu());
        }, null, null, 2)
        .to('.header', 1, { y: 0 }),
    };

    new ScrollMagic.Scene({
      triggerElement,
      duration: 300,
      triggerHook: 0,
    }).setTween(timelines.introRotate)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 300,
      offset: 800,
    }).setTween(timelines.introOutro)
      .addTo(controller);
  }

  render() {
    const {
      assetPreloadComplete,
      assetPreloadPercentage,
    } = this.props;

    if (assetPreloadPercentage < 1) {
      this.introBordersStyle = { transform: `rotate(0) scaleX(${assetPreloadPercentage})` };
    }
    if (assetPreloadComplete && !this.initAnimate && this.ScrollMagic !== null) {
      this.initAnimate = true;
      this.onAssetPreloadComplete();
    }
    return (
      <section className="project-animation project-animation-intro" ref={this.animationRef}>
        <div className="fixed-bg" />
        <div className="section-top-indicator" />
        <div className="section-content">
          <div className="content-wrapper">
            <div className="intro-borders" style={this.introBordersStyle}>
              <div className="intro-border-top" />
              <div className="intro-border-bottom" />
            </div>
            <div className="intro-content">
              <div className="intro-inner-content">
                <div>
                  <div className="jef-logo" />
                  <h1 className="intro-statement">
                    <span className="highlight"> 👋 &nbsp;I create innovative solutions elevated by great design. </span>
                    I&rsquo;ve collaborated with talented, multi-disciplined teams to develop engaging interactive experiences.
                  </h1>
                  <div className="scroll-indicator-animation-wrapper">
                    <button
                      type="button"
                      className={`scroll-indicator-animation scene-navigation-btn ${this.scrollIndicatorSelector}`}
                      aria-label="Scroll to see my work!"
                      onClick={this.onSeeMoreClick}
                    >
                      <div className="center-fill" />
                      <div className="indicator-arrow">
                        <div className="center-line" />
                        <div className="caret">
                          <div className="bottom-left-line" />
                          <div className="bottom-right-line" />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Intro.propTypes = {
  assetPreloadComplete: PropTypes.bool.isRequired,
  assetPreloadPercentage: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators({
    hideMenu,
  }, dispatch),
});

export default connect(mapDispatchToProps)(Intro);
