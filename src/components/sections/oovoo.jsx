import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';
import { getImageDataById } from '../../utils/section-utils';
import { getScrollMagicController } from '../../utils/scroll-magic';
import { getScrollObserver } from '../../utils/browser-scroll';
import { isBrowser } from '../../utils/browser-utils';
import ProjectDetails from './project-details';
import SiteImage from '../site-image';

class Oovoo extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.animationRef = React.createRef();
    this.initAnimate = false;
    this.tabletWrapperRef = React.createRef();
    this.ScrollMagic = null;
  }

  componentDidMount() {
    const observer = getScrollObserver();
    const el = this.animationRef.current;
    observer.observe(el);
    const adjustTabletHeight = () => {
      this.tabletWrapperRef.current.style.height = `${this.tabletWrapperRef.current.offsetWidth * 0.7494}px`;
    };
    if (isBrowser()) {
      window.addEventListener('resize', adjustTabletHeight);
    }
    adjustTabletHeight();
    if (typeof window === 'undefined') return;
    (async () => {
      const mod = await import('scrollmagic');
      this.ScrollMagic = mod.default ?? mod;
    })();
  }

  animate() {
    const { data } = this.props;
    const { id } = data;
    const { ScrollMagic } = this;
    const triggerElement = `.project-animation-${id}`;
    const controller = getScrollMagicController();
    const timelines = {
      elements: new TimelineLite()
        .fromTo(`${triggerElement} .site-bg`, 0.05, { opacity: 0 }, { opacity: 1 }, 0)
        .fromTo(`${triggerElement} .site-bg`, 1, { visibility: 'hidden', scale: 3, borderRadius: 0 }, { visibility: 'visible', scale: 1, borderRadius: 4 }, 0)
        .fromTo(`${triggerElement} .site-hand-drawn-type`, 0.05, { opacity: 0 }, { opacity: 1 }, 0.3)
        .fromTo(`${triggerElement} .site-hand-drawn-type`, 0.5, { visibility: 'hidden', scale: 5 }, { visibility: 'visible', scale: 1 }, 0.3)
        .fromTo(`${triggerElement} .screen-content-wrapper`, 0.5, { visibility: 'hidden', opacity: 0 }, { visibility: 'visible', opacity: 1 })
        .to(`${triggerElement} .site-bg`, 0.5, { opacity: 0 })
        .to(`${triggerElement} .site-hand-drawn-type`, 0.5, { opacity: 0 })
        .fromTo(`${triggerElement} .device-wrapper`, 0.5, { visibility: 'hidden', opacity: 0 }, { visibility: 'visible', opacity: 1 }, 0.3)
        .fromTo(`${triggerElement} .tablet-wrapper`, 0.5, { x: '0%' }, { x: '-30%' }, 1.5)
        .fromTo(`${triggerElement} .site-bg`, 0.5, { visibility: 'visible' }, { visibility: 'hidden' }, 1.5)
        .fromTo(`${triggerElement} .site-hand-drawn-type`, 0.5, { visibility: 'visible' }, { visibility: 'hidden' }, 1.5)
        .fromTo(`${triggerElement} .phone-wrapper`, 0.5, { visibility: 'hidden', x: '0%' }, { visibility: 'visible', x: '150%' }, 1.5),
      screenContent: new TimelineLite()
        .fromTo(`${triggerElement} .screen-content`, 1.5, { y: '0%' }, { y: '-90%' }),
    };

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1200,
    }).setClassToggle(triggerElement, 'in-focus')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 400,
      triggerHook: 0,
    }).setPin(`${triggerElement} .section-content`)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1000,
    }).setTween(timelines.elements)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      offset: 550,
      duration: 1000,
    }).setTween(timelines.screenContent)
      .addTo(controller);
  }

  render() {
    const { data } = this.props;
    const {
      id,
      invertText,
      overview,
      projectLink,
      projectTitlePart1,
      projectTitlePart2,
      solution,
    } = data;
    if (!this.initAnimate && this.ScrollMagic !== null) {
      this.initAnimate = true;
      this.animate();
    }
    return (
      <>
        <section className={`project-animation project-animation-${id}`} ref={this.animationRef}>
          <div className="fixed-bg" />
          <div className="section-top-indicator" />
          <div className="section-content">
            <div className="content-wrapper">
              <div className="phone-wrapper">
                <div className="screen-content-wrapper">
                  <div className="screen-content-wrapper-inner">
                    <SiteImage
                      data={getImageDataById('screen-content-phone', data)}
                    />
                  </div>
                </div>
                <div className="device-wrapper">
                  <SiteImage
                    data={getImageDataById('device-shadow-phone', data)}
                  />
                  <div className="device-frame" />
                  <SiteImage
                    data={getImageDataById('phone-tab', data)}
                  />
                </div>
              </div>
              <div className="tablet-wrapper" ref={this.tabletWrapperRef}>
                <div className="device-wrapper">
                  <SiteImage
                    data={getImageDataById('device-shadow-tablet', data)}
                  />
                  <div className="device-frame" />
                  <div className="device-buttons">
                    <div className="tablet-volume-button" />
                    <div className="tablet-power-button" />
                  </div>
                </div>
                <SiteImage
                  data={getImageDataById('site-bg', data)}
                />
                <div className="site-hand-drawn-type-wrapper">
                  <SiteImage
                    data={getImageDataById('site-hand-drawn-type', data)}
                  />
                </div>
                <div className="screen-content-wrapper">
                  <div className="screen-content-wrapper-inner">
                    <SiteImage
                      data={getImageDataById('screen-content-tablet', data)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProjectDetails
          id={id}
          invertText={invertText}
          overview={overview}
          projectLink={projectLink}
          projectTitlePart1={projectTitlePart1}
          projectTitlePart2={projectTitlePart2}
          solution={solution}
        />
      </>
    );
  }
}

Oovoo.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    invertText: PropTypes.bool.isRequired,
    projectLink: PropTypes.string.isRequired,
    projectTitlePart1: PropTypes.string.isRequired,
    projectTitlePart2: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    solution: PropTypes.string.isRequired,
  }),
};

export default Oovoo;
