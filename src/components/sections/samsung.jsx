import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';
import { getImageDataById } from '../../utils/section-utils';
import { getScrollMagicController } from '../../utils/scroll-magic';
import { getScrollObserver } from '../../utils/browser-scroll';
import ProjectDetails from './project-details';
import SiteImage from '../site-image';

class Samsung extends Component {
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
        .fromTo(`${triggerElement} .kiosks`, 1, { y: '100%' }, { y: '0%' })
        .fromTo(`${triggerElement} .kiosk-left-wrapper`, 1, { y: '10%' }, { y: '0%' }, 0)
        .fromTo(`${triggerElement} .kiosk-right-wrapper`, 1, { y: '-10%' }, { y: '0%' }, 0)
        .fromTo(`${triggerElement} .kiosk-right-wrapper .kiosk-ux-bg`, 0.5, { opacity: 0 }, { opacity: 1 }, 0.25)
        .fromTo(`${triggerElement} .kiosk-right-wrapper .kiosk-ux-ui-1`, 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.5)
        .fromTo(`${triggerElement} .kiosk-right-wrapper .kiosk-ux-ui-2`, 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.75)
        .fromTo(`${triggerElement} .kiosk-right-wrapper .kiosk-ux-ui-3`, 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 1)
        .fromTo(`${triggerElement} .kiosk-left-wrapper .kiosk-ux-bg`, 0.5, { opacity: 0 }, { opacity: 1 }, 0.5)
        .fromTo(`${triggerElement} .kiosk-left-wrapper .kiosk-ux-ui`, 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.75),
    };

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1500,
    }).setClassToggle(triggerElement, 'in-focus')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 500,
      triggerHook: 0,
    }).setPin(`${triggerElement} .section-content`)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1200,
    }).setTween(timelines.elements)
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
              <div className="kiosks">
                <div className="kiosk-left-wrapper">
                  <div className="kiosk">
                    <SiteImage
                      data={getImageDataById('kiosk-left', data)}
                    />
                    <div className="kiosk-ux-wrapper">
                      <SiteImage
                        data={getImageDataById('kiosk-left-ux-default', data)}
                      />
                      <SiteImage
                        data={getImageDataById('kiosk-left-ux-bg', data)}
                      />
                      <SiteImage
                        data={getImageDataById('kiosk-left-ux-ui', data)}
                      />
                    </div>
                  </div>
                  <SiteImage
                    data={getImageDataById('kiosk-left-shadow', data)}
                  />
                </div>
                <div className="kiosk-right-wrapper">
                  <div className="kiosk">
                    <SiteImage
                      data={getImageDataById('kiosk-right', data)}
                    />
                    <div className="kiosk-ux-wrapper">
                      <SiteImage
                        data={getImageDataById('kiosk-right-ux-default', data)}
                      />
                      <SiteImage
                        data={getImageDataById('kiosk-right-ux-bg', data)}
                      />
                      <SiteImage
                        data={getImageDataById('kiosk-right-ux-ui-1', data)}
                      />
                      <SiteImage
                        data={getImageDataById('kiosk-right-ux-ui-2', data)}
                      />
                      <SiteImage
                        data={getImageDataById('kiosk-right-ux-ui-3', data)}
                      />
                    </div>
                  </div>
                  <SiteImage
                    data={getImageDataById('kiosk-right-shadow', data)}
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

Samsung.propTypes = {
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

export default Samsung;
