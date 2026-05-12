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

class Sunsetter extends Component {
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
        .fromTo(`${triggerElement} .browser`, .2, { visibility: 'hidden', translateZ: -2000 }, { visibility: 'visible', translateZ: 0 })
        .fromTo(`${triggerElement} .browser-frame`, .2, { scale: 0 }, { scale: 1 })
        .fromTo(`${triggerElement} .ui-btn-1`, .01, { visibility: 'hidden', scale: 0 }, { visibility: 'visible', scale: 3}, .25)
        .fromTo(`${triggerElement} .ui-btn-1`, .02, { scale: 3 }, { scale: 1}, .26)
        .fromTo(`${triggerElement} .ui-btn-2`, .01, { visibility: 'hidden', scale: 0 }, { visibility: 'visible', scale: 3}, .26)
        .fromTo(`${triggerElement} .ui-btn-2`, .02, { scale: 3 }, { scale: 1}, .27)
        .fromTo(`${triggerElement} .ui-btn-3`, .01, { visibility: 'hidden', scale: 0 }, { visibility: 'visible', scale: 3}, .27)
        .fromTo(`${triggerElement} .ui-btn-3`, .02, { scale: 3 }, { scale: 1}, .28)
        .fromTo(`${triggerElement} .browser-ui-addressbar`, .1, { visibility: 'hidden', width: 18 }, { visibility: 'visible', width: '100%' }, .28)
        .fromTo(`${triggerElement} .browser-tab-1`, .05, { visibility: 'hidden', scale: 0 }, { visibility: 'visible', scale: 1 }, .29)
        .fromTo(`${triggerElement} .browser-tab-1 .tab-element`, .01, { translateY: '100%' }, { translateY: 0 }, .34)
        .fromTo(`${triggerElement} .browser-add-tab`, .01, { visibility: 'hidden' }, { visibility: 'visible' }, .36)
        .fromTo(`${triggerElement} .browser-add-tab .tab-element`, .01, { translate: 'calc(400% + 2px)', scale: 0 }, { translate: 'calc(400% + 2px)', scale: 1 }, .36)
        .fromTo(`${triggerElement} .browser-tab-1 .screen-content`, .05, { opacity: 0 }, { opacity: 1 }, .34)
        .to(`${triggerElement} .browser-tab-2 .screen-content`, .01, { visibility: 'hidden' }, .34)
        .to(`${triggerElement} .browser-tab-1 .screen-content`, .4, { translateY: '-55%' }, .36)
        .to(`${triggerElement} .browser`, .3, { translateX: '-15%', rotateY: '25deg', rotateZ: '4deg' }, .45)
        .fromTo(`${triggerElement} .browser-tab-2`, .01, { visibility: 'hidden' }, { visibility: 'visible' }, .5)
        .fromTo(`${triggerElement} .browser-tab-2 .tab-element`, .01, { scale: 0 }, { scale: 1 }, .5)
        .to(`${triggerElement} .browser-add-tab .tab-element`, .01, { translate: 'calc(800% + 4px)' }, .5)
        .to(`${triggerElement} .browser-tab-1 .tab-element`, .01, { opacity: .65 }, .5)
        .to(`${triggerElement} .browser-tab-1 .screen-content`, .01, { visibility: 'hidden' }, .5)
        .to(`${triggerElement} .browser-tab-2 .screen-content`, .01, { visibility: 'visible' }, .5)
        .to(`${triggerElement} .browser-tab-2 .screen-content`, .4, { translateY: '-55%' }, .52)
        .fromTo(`${triggerElement} .browser-tab-3`, .01, { visibility: 'hidden' }, { visibility: 'visible' }, .7)
        .fromTo(`${triggerElement} .browser-tab-3 .tab-element`, .01, { scale: 0 }, { scale: 1 }, .7)
        .to(`${triggerElement} .browser-add-tab .tab-element`, .01, { translate: 'calc(1200% + 6px)' }, .7)
        .to(`${triggerElement} .browser-tab-2 .tab-element`, .01, { opacity: .65 }, .7)
        .to(`${triggerElement} .browser-tab-2 .screen-content`, .01, { visibility: 'hidden' }, .7)
        .to(`${triggerElement} .browser-tab-3 .screen-content`, .4, { translateY: '-55%' }, .72)
    };

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1300,
    }).setClassToggle(triggerElement, 'in-focus')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1300,
    }).setClassToggle('body', 'project-sunsetter')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 400,
      triggerHook: 0,
    }).setPin(`${triggerElement} .section-content`)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1300,
    }).setTween(timelines.elements)
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
              <div className="browser-wrapper">
                <div className="browser">
                  <div className="browser-frame">
                    <div className="browser-ui-wrapper">
                      <div className="browser-ui-btn ui-btn-1" />
                      <div className="browser-ui-btn ui-btn-2" />
                      <div className="browser-ui-btn ui-btn-3" />
                      <div className="browser-ui-addressbar" />
                    </div>
                    <div className="browser-tabs-wrapper">
                    <div className="browser-tab browser-add-tab">
                        <div className="tab-element">
                          <div className="add-tab-icon">
                            <div className="add-tab-icon-line" />
                            <div className="add-tab-icon-line" />
                          </div>
                        </div>
                      </div>
                      <div className="browser-tab browser-tab-1">
                        <div className="tab-element" />
                        <div className="tab-content">
                          <SiteImage
                            data={getImageDataById('tab-1-content', data)}
                          />
                        </div>
                      </div>
                      <div className="browser-tab browser-tab-2">
                        <div className="tab-element" />
                        <div className="tab-content">
                          <SiteImage
                            data={getImageDataById('tab-2-content', data)}
                          />
                        </div>
                      </div>
                      <div className="browser-tab browser-tab-3">
                        <div className="tab-element" />
                        <div className="tab-content">
                          <SiteImage
                            data={getImageDataById('tab-3-content', data)}
                          />
                        </div>
                      </div>
                    </div>
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

Sunsetter.propTypes = {
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

export default Sunsetter;
