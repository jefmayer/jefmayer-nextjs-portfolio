import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';
import { getImageDataById } from '../../utils/section-utils';
import { getScrollMagicController } from '../../utils/scroll-magic';
import { getScrollObserver } from '../../utils/browser-scroll';
import ProjectDetails from './project-details';
import SiteImage from '../site-image';

class SwfCorp extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.animationRef = React.createRef();
    this.initAnimate = false;
  }

  componentDidMount() {
    const observer = getScrollObserver();
    const el = this.animationRef.current;
    observer.observe(el);
  }

  animate() {
    const { data } = this.props;
    const { id } = data;
    const triggerElement = `.project-animation-${id}`;
    const controller = getScrollMagicController();
    const timelines = {
      elements: new TimelineLite()
        .fromTo(`${triggerElement} .monitor-left-wrapper`, 0.5, { visibility: 'hidden', x: '-10%' }, { visibility: 'visible', x: '0%' })
        .fromTo(`${triggerElement} .monitor-right-wrapper`, 0.5, { visibility: 'hidden', x: '10%' }, { visibility: 'visible', x: '0%' }, 0)
        .fromTo(`${triggerElement} .device-base`, 0.5, { visibility: 'hidden' }, { visibility: 'visible' }, 0),
      screenContent: new TimelineLite()
        .fromTo(`${triggerElement} .monitor-left-wrapper .screen-content`, 2, { y: '0%' }, { y: '-30%' })
        .fromTo(`${triggerElement} .monitor-right-wrapper .screen-content`, 2.5, { y: '0%' }, { y: '-65%' }, 0),
    };

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1400,
    }).setClassToggle(triggerElement, 'in-focus')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 250,
      triggerHook: 0,
    }).setPin(`${triggerElement} .section-content`)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 500,
    }).setTween(timelines.elements)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      offset: 300,
      duration: 1400,
    }).setTween(timelines.screenContent)
      .addTo(controller);
  }

  render() {
    const {
      assetPreloadComplete,
      data,
    } = this.props;
    const {
      id,
      invertText,
      overview,
      projectLink,
      projectTitlePart1,
      projectTitlePart2,
      solution,
    } = data;
    if (assetPreloadComplete && !this.initAnimate) {
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
              <div className="devices">
                <div className="monitor-left-wrapper">
                  <div className="perspective-content">
                    <div className="device-frame" />
                    <div className="device-frame-bottom" />
                    <div className="screen-content-wrapper">
                      <div className="screen-content-wrapper-inner">
                        <div className="screen-content">
                          <SiteImage
                            data={getImageDataById('screen-content-home', data)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <SiteImage
                    data={getImageDataById('device-base-left', data)}
                  />
                </div>
                <div className="monitor-right-wrapper">
                  <div className="perspective-content">
                    <div className="device-frame" />
                    <div className="device-frame-bottom" />
                    <div className="screen-content-wrapper">
                      <div className="screen-content-wrapper-inner">
                        <SiteImage
                          data={getImageDataById('screen-content-products', data)}
                        />
                      </div>
                    </div>
                  </div>
                  <SiteImage
                    data={getImageDataById('device-base-right', data)}
                  />
                </div>
              </div>
              <div className="shelf-wrapper">
                <div className="shelf-inner" />
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

SwfCorp.propTypes = {
  assetPreloadComplete: PropTypes.bool.isRequired,
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

export default SwfCorp;
