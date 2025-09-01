'use client';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';
import { getImageDataById } from '../../utils/section-utils';
import { getScrollMagicController } from '../../utils/scroll-magic';
import { getScrollObserver } from '../../utils/browser-scroll';
import ProjectDetails from './project-details';
import SiteImage from '../site-image';

class Graber extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.animationRef = React.createRef();
    this.initAnimate = false;
    this.ScrollMagic = null;
  }

  componentDidMount() {
    const observer = getScrollObserver();
    const el = this.animationRef.current;
    observer.observe(el);
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
        .fromTo(`${triggerElement} .devices`, 1, { y: '100%' }, { y: '0%' })
        .fromTo(`${triggerElement} .tablet-wrapper`, 1, { y: '40%' }, { y: '0%' }, 0)
        .fromTo(`${triggerElement} .tablet-shadow`, 1, { opacity: 0, scale: 0.5 }, { opacity: 0.5, scale: 1 }, 0.25),
      screenContent: new TimelineLite()
        .fromTo(`${triggerElement} .laptop-wrapper .screen-content`, 1.5, { y: '0%' }, { y: '-70%' })
        .fromTo(`${triggerElement} .tablet-wrapper .screen-content`, 2, { y: '0%' }, { y: '-70%' }, 0),
    };

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1300,
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
      duration: 800,
    }).setTween(timelines.elements)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      offset: 350,
      duration: 1200,
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
    if (assetPreloadComplete && !this.initAnimate && this.ScrollMagic !== null) {
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
                <div className="laptop-wrapper">
                  <div className="laptop-frame">
                    <SiteImage
                      data={getImageDataById('laptop', data)}
                    />
                    <div className="screen-content-wrapper">
                      <div className="screen-content-wrapper-inner">
                        <SiteImage
                          data={getImageDataById('laptop-screen-content', data)}
                        />
                      </div>
                    </div>
                  </div>
                  <SiteImage
                    data={getImageDataById('laptop-shadow', data)}
                  />
                </div>
                <div className="tablet-wrapper">
                  <div className="tablet-frame">
                    <SiteImage
                      data={getImageDataById('tablet', data)}
                    />
                    <div className="tablet-content-wrapper">
                      <div className="tablet-content-wrapper-inner">
                        <SiteImage
                          data={getImageDataById('tablet-screen-content', data)}
                        />
                      </div>
                    </div>
                  </div>
                  <SiteImage
                    data={getImageDataById('tablet-shadow', data)}
                  />
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

Graber.propTypes = {
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

export default Graber;
