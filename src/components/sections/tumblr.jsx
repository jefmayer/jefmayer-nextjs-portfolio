import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';
import { commaFormattedNumber } from '../../utils/formatting-utils';
import { getCollectionWeight } from '../../api/discogs';
import { getImageDataById } from '../../utils/section-utils';
import {
  getInterval,
  getTimeBetweenDates,
} from '../../utils/date-utils';
import { getScrollMagicController } from '../../utils/scroll-magic';
import { getScrollObserver } from '../../utils/browser-scroll';
import { getTeamWinTotalSinceYear } from '../../api/mlb';
import ProjectDetails from './project-details';
import SiteImage from '../site-image';

class Tumblr extends Component {
  constructor(props) {
    super(props);
    this.animate = this.animate.bind(this);
    this.animationRef = React.createRef();
    this.initAnimate = false;
    const today = new Date();
    this.meaningfulContentCardTotal = getTimeBetweenDates(today, new Date('2000-09-01'), getInterval('days'));
    this.beezCardTotal = getTimeBetweenDates(new Date('2023-06-13'), new Date('2012-04-17'), getInterval('days'));
    this.dogeCardTotal = getTimeBetweenDates(today, new Date('2013-12-28'), getInterval('days'));
    this.cxCardTotal = getTimeBetweenDates(today, new Date('2015-08-23'), getInterval('years'));
    this.twitterCardTotal = getTimeBetweenDates(today, new Date('2014-08-05'), getInterval('days'));
    this.soxCardTotal = 0;
    this.fantasyCardTotal = getTimeBetweenDates(today, new Date('2014-04-01'), getInterval('years'));
    this.vinylCardTotal = 0;
    this.saxCardTotal = getTimeBetweenDates(today, new Date('2009-04-01'), getInterval('years'));
    this.primeCardTotal = 37;
  }

  componentDidMount() {
    const observer = getScrollObserver();
    const el = this.animationRef.current;
    observer.observe(el);
    // Populate Card Values
    getTeamWinTotalSinceYear({
      callback: (result) => {
        this.soxCardTotal = result;
      },
      divisionId: 202,
      teamId: 145,
      year: 2012,
    });
    getCollectionWeight({
      callback: (result) => {
        this.vinylCardTotal = result;
      },
    });
  }

  addTweens() {
    const { data } = this.props;
    const { id } = data;
    const triggerElement = `.project-animation-${id}`;
    const cards = document.querySelectorAll(`${triggerElement} .info-card`);
    const interval = 0.125;
    let offset = 0;
    // Add tweens
    return [].map.call(cards, (card) => {
      const timeline = new TimelineLite();
      const cardDiv = card.querySelector('.info-card-inner');
      const contentDiv = card.querySelector('.content-wrapper');
      timeline.fromTo(cardDiv, 0.5, { visibility: 'hidden', rotateX: '90deg' }, { visibility: 'visible', rotateX: '0deg' }, offset);
      timeline.fromTo(contentDiv, 0.5, { opacity: 0 }, { opacity: 1 }, offset + interval);
      offset += interval;
      return timeline;
    });
  }

  animate() {
    const { data } = this.props;
    const { id } = data;
    const triggerElement = `.project-animation-${id}`;
    const controller = getScrollMagicController();
    const timelines = {
      elements: new TimelineLite()
        .fromTo(`${triggerElement} .info-card-wrapper`, 0.5, { visibility: 'hidden', y: '40%' }, { visibility: 'visible', y: '0%' })
        .add('cardAnimations'),
    };

    const { elements } = timelines;
    elements.add(this.addTweens(), 'cardAnimations-=0', 'sequence', 0);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 3000, // Make duration extremely long for last project, so that bg stays fixed as footer appears
    }).setClassToggle(triggerElement, 'in-focus')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 3000,
    }).setClassToggle('body', 'project-tumblr')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 700,
      triggerHook: 0,
    }).setPin(`${triggerElement} .section-content`)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 600,
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
              <div className="info-card-wrapper">
                <div className="info-card info-card-internet">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('meaningful-content-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.meaningfulContentCardTotal) }</span>
                        <span className="card-interval">Days Spent</span>
                        <span className="card-desc">creating meaningful content on the internet</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info-card info-card-beez">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('beez-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.beezCardTotal) }</span>
                        <span className="card-interval">Days Spent</span>
                        <span className="card-desc">doing the damn thing with @annicka</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info-card info-card-doge">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('doge-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.dogeCardTotal) }</span>
                        <span className="card-interval">Days Spent</span>
                        <span className="card-desc">convincing friends, family, and myself greyhounds are real dogs</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info-card info-card-cx">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('cx-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.cxCardTotal) }</span>
                        <span className="card-interval">Years Spent</span>
                        <span className="card-desc">racing bikes in a semi-serious, devil-may-care manner</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info-card info-card-twitter">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('twitter-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.twitterCardTotal) }</span>
                        <span className="card-interval">Days Since</span>
                        <span className="card-desc">letting my Twitter account fall into the shitter</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info-card info-card-sox">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('sox-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.soxCardTotal) }</span>
                        <span className="card-interval">Wins</span>
                        <span className="card-desc">from the White Sox during a decade (plus) of suffering fandom</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info-card info-card-fantasy">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('fantasy-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.fantasyCardTotal) }</span>
                        <span className="card-interval">Years Spent</span>
                        <span className="card-desc">letting fantasy baseball rosters lapse</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info-card info-card-vinyl">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('vinyl-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.vinylCardTotal) }</span>
                        <span className="card-interval">Pounds of</span>
                        <span className="card-desc">vinyl sitting on Ikea shelves</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info-card info-card-sax">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('sax-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.saxCardTotal) }</span>
                        <span className="card-interval">Years Since</span>
                        <span className="card-desc">walking onstage with a saxophone</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="info-card info-card-prime">
                  <div className="info-card-inner">
                    <div className="content-wrapper">
                      <SiteImage
                        data={getImageDataById('prime-graphic', data)}
                      />
                      <p className="card-content">
                        <span className="card-total">{ commaFormattedNumber(this.primeCardTotal) }</span>
                        <span className="card-interval">Pieces of</span>
                        <span className="card-desc">plastic nostalgia saved from a landfill</span>
                      </p>
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

Tumblr.propTypes = {
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

export default Tumblr;
