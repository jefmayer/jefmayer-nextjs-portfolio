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

class AmplifyIt extends Component {
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
        .fromTo(`${triggerElement} .tablet-sampler-wrapper`, 1, { visibility: 'hidden', y: '106%' }, { visibility: 'visible', y: '0%' }, 0.25) // 200 (height: 188)
        .fromTo(`${triggerElement} .tablet-sampler-shadow`, 1, { y: '-35%' }, { y: '0%' }, 0.25) // -50 (height: 220)
        .fromTo(`${triggerElement} .mixing-board-wrapper`, 1, { visibility: 'hidden', y: '234%' }, { visibility: 'visible', y: '0%' }, 0.25) // 300 (height: 128)
        .fromTo(`${triggerElement} .mixing-board-shadow`, 1, { y: -10 }, { y: 0 }, 0.25) // -10
        .fromTo(`${triggerElement} .beats-headphones-wrapper`, 1, { visibility: 'hidden', y: '120%' }, { visibility: 'visible', y: '0%' }, 0.25) // 400 (height: 153)
        .to(`${triggerElement} .beats-headphones-shadow`, 1, { scale: 1, y: 0, opacity: 1 }, 0.5),
      videoGrid: new TimelineLite()
        .to(`${triggerElement} .video-grid-t-l`, 1, { visibility: 'visible', scale: 1 }, 0)
        .to(`${triggerElement} .video-grid-t-m`, 1, { visibility: 'visible', scale: 1 }, 0.25)
        .to(`${triggerElement} .video-grid-t-r`, 1, { visibility: 'visible', scale: 1 }, 0.5)
        .to(`${triggerElement} .video-grid-m-l`, 1, { visibility: 'visible', scale: 1 }, 0.75)
        .to(`${triggerElement} .video-grid-m-m`, 1, { visibility: 'visible', scale: 1 }, 1)
        .to(`${triggerElement} .video-grid-m-r`, 1, { visibility: 'visible', scale: 1 }, 1.25)
        .to(`${triggerElement} .video-grid-b-l`, 1, { visibility: 'visible', scale: 1 }, 1.5)
        .to(`${triggerElement} .video-grid-b-m`, 1, { visibility: 'visible', scale: 1 }, 1.75)
        .to(`${triggerElement} .video-grid-b-r`, 1, { visibility: 'visible', scale: 1 }, 2)
        .fromTo(`${triggerElement} .video-grid`, 3, { rotateX: '0deg' }, { rotateX: '-20deg' }, 0.5),
    };

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1500,
    }).setClassToggle(triggerElement, 'in-focus')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 600,
      triggerHook: 0,
    }).setPin(`${triggerElement} .section-content`)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 300,
    }).setTween(timelines.videoGrid)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 800,
    }).setTween(timelines.elements)
      .addTo(controller);
  }

  render() {
    const { data} = this.props;
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
              <div className="video-grid-wrapper">
                <div className="video-grid">
                  <SiteImage
                    data={getImageDataById('video-grid-t-l', data)}
                  />
                  <SiteImage
                    data={getImageDataById('video-grid-t-m', data)}
                  />
                  <SiteImage
                    data={getImageDataById('video-grid-t-r', data)}
                  />
                  <SiteImage
                    data={getImageDataById('video-grid-m-l', data)}
                  />
                  <SiteImage
                    data={getImageDataById('video-grid-m-m', data)}
                  />
                  <SiteImage
                    data={getImageDataById('video-grid-m-r', data)}
                  />
                  <SiteImage
                    data={getImageDataById('video-grid-b-l', data)}
                  />
                  <SiteImage
                    data={getImageDataById('video-grid-b-m', data)}
                  />
                  <SiteImage
                    data={getImageDataById('video-grid-b-r', data)}
                  />
                </div>
              </div>
              <div className="tablet-sampler-wrapper">
                <SiteImage
                  data={getImageDataById('tablet-sampler', data)}
                />
                <SiteImage
                  data={getImageDataById('tablet-sampler-shadow', data)}
                />
              </div>
              <div className="mixing-board-wrapper">
                <SiteImage
                  data={getImageDataById('mixing-board', data)}
                />
                <SiteImage
                  data={getImageDataById('mixing-board-shadow', data)}
                />
              </div>
              <div className="beats-headphones-wrapper">
                <div>
                  <SiteImage
                    data={getImageDataById('beats-headphones', data)}
                  />
                  <SiteImage
                    data={getImageDataById('beats-headphones-shadow', data)}
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

AmplifyIt.propTypes = {
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

export default AmplifyIt;
