'use client';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TimelineLite } from 'gsap';
import { getScrollMagicController } from '@utils/scroll-magic';
import { getScrollObserver } from '@utils/browser-scroll';
import GoogleMap from '@modules/map';
import ProjectDetails from './project-details';

class BrtPointsApp extends Component {
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


  addTweens() {
    const { data } = this.props;
    const { id } = data;
    const triggerElement = `.project-animation-${id}`;
    const selector = `${triggerElement} .map-marker`;
    const markers = document.querySelectorAll(selector);
    const timeline = new TimelineLite();
    [].map.call(markers, (marker) => {
      timeline.fromTo(marker, .25, { scale: 0 }, { scale: 1 });
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
      .add('markerAnimations'),
    };
    const { elements } = timelines;
    elements.add(this.addTweens(), 'markerAnimations+=1', 'sequence', -0.5);

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

  isMapAdded() {
    const mapElement = document.querySelector('.map-wrapper .gm-style');
    return mapElement !== null;
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
    // Need to wait until map is loaded as well
    if (!this.initAnimate && this.ScrollMagic !== null && this.isMapAdded()) {
      this.initAnimate = true;
      this.animate();
    }
    return (
      <>
        <section className={`project-animation project-animation-${id}`} ref={this.animationRef}>
          <GoogleMap />
          <div className="fixed-bg" />
          <div className="section-top-indicator" />
          <div className="section-content">
            <div className="content-wrapper" />
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

BrtPointsApp.propTypes = {
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

export default BrtPointsApp;
