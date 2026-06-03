'use client';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { getScrollMagicController } from '@utils/scroll-magic';
import { getScrollObserver } from '@utils/browser-scroll';
import Chart from '@modules/chart';
import ProjectDetails from './project-details';

class PetHealthTracker extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.animationRef = React.createRef();
    this.chartRef = React.createRef();
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

  addTweens() {
    const { data } = this.props;
    const { id } = data;
    const triggerElement = `.project-animation-${id}`;
    const selector = `${triggerElement} svg .o-line`;
    const itemList = document.querySelectorAll(selector);
    const timeline = new TimelineLite();
    [].map.call(itemList, (item) => {
      timeline.to(item, .25, { 'stroke-dashoffset' : 0 });
    });
    return timeline;
  }

  animate() {
    const { data } = this.props;
    const { id } = data;
    const { ScrollMagic } = this;
    const triggerElement = `.project-animation-${id}`;
    const controller = getScrollMagicController();
    const timelines = {
      elements: new TimelineLite()
        .fromTo(`${triggerElement} .progress-chart`, .2, { visibility: 'hidden', opacity: 0 }, { visibility: 'visible', opacity: 1 })
        .to(`${triggerElement} .progress-chart .o-line--mobility`, .4, { 'stroke-dashoffset': 0 }, .25)
        .to(`${triggerElement} .progress-chart .o-line--activity`, .4, { 'stroke-dashoffset': 0 }, .26)
        .to(`${triggerElement} .progress-chart .o-line--appetite`, .4, { 'stroke-dashoffset': 0 }, .27)
        .to(`${triggerElement} .progress-chart .o-line--pain`, .4, { 'stroke-dashoffset': 0 }, .28)
        .to(`${triggerElement} .progress-chart .o-line--stress`, .4, { 'stroke-dashoffset': 0 }, .29)
    };
    const { elements } = timelines;

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1300,
    }).setClassToggle(triggerElement, 'in-focus')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1300,
    }).setClassToggle('body', `project-${id}`)
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
              <Chart />
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

PetHealthTracker.propTypes = {
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

export default PetHealthTracker;
