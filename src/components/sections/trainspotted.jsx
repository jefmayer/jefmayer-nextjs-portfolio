import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ScrollMagic from 'scrollmagic';
import { TimelineLite } from 'gsap';
import { getImageDataById } from '../../utils/section-utils';
import { getScrollMagicController } from '../../utils/scroll-magic';
import { getScrollObserver } from '../../utils/browser-scroll';
import ProjectDetails from './project-details';
import SiteImage from '../site-image';

class Trainspotted extends Component {
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
    // Get lenght of entire line from percentages
    const getFullLineWidth = (lines) => (
      [].reduce.call(lines, (acc, line) => {
        const width = parseFloat(line.style.width, 10);
        if (Number.isNaN(parseInt(acc, 10))) {
          return width;
        }
        return acc + width;
      })
    );
    // If more than one marker (should always be the case) only animate in > 1
    const addMarkerAnimationsToTimeline = (row, totalWidth) => {
      const lines = row.querySelectorAll('.sighting-connector');
      const markers = row.querySelectorAll('.sighting-marker');
      const timeline = new TimelineLite();
      [].map.call(lines, (line, index) => {
        const width = parseFloat(line.style.width, 10);
        timeline.fromTo(line, width / totalWidth, { scaleX: 0 }, { scaleX: 1 });
        timeline.set(markers[index], { className: 'sighting-marker' });
      });
      return timeline;
    };
    // Get longest line, assign to tween
    const selector = `${triggerElement} .data-table .y-axis-row`;
    const tableRows = document.querySelectorAll(selector);
    const lineLength = [].reduce.call(tableRows, (acc, row) => {
      const connector = row.querySelectorAll('.sighting-connector');
      const length = getFullLineWidth(connector);
      if (Number.isNaN(parseInt(acc, 10))) {
        return length;
      }
      return Math.max(acc, length);
    });
    // Add tweens
    return [].map.call(tableRows, (row) => (
      addMarkerAnimationsToTimeline(row, lineLength)
    ));
  }

  animate() {
    const { data } = this.props;
    const { id } = data;
    const { ScrollMagic } = this;
    const triggerElement = `.project-animation-${id}`;
    const controller = getScrollMagicController();
    const timelines = {
      elements: new TimelineLite()
        .fromTo(`${triggerElement} .content-wrapper`, 0.5, { visibility: 'hidden', y: '75%' }, { visibility: 'visible', y: '0%' })
        .add('yAxisAnimations')
        .set('#active-marker-trigger', { className: 'active sighting-marker' }, 1.125)
        .fromTo(`${triggerElement} .visualization-overlay`, 0.25, { visibility: 'hidden', scale: 0.85 }, { visibility: 'visible', scale: 1 }, 1.375)
        .fromTo(`${triggerElement} .data-visualization`, 0.25, { opacity: 1 }, { opacity: 0.25 }, 1.375),
    };

    const { elements } = timelines;
    elements.add(this.addTweens(), 'yAxisAnimations-=.475', 'sequence', -0.25);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1200,
    }).setClassToggle(triggerElement, 'in-focus')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 1200,
    }).setClassToggle('body', 'project-trainspotted')
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 250,
      triggerHook: 0,
    }).setPin(`${triggerElement} .section-content`)
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement,
      duration: 750,
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
    const colors = {
      cp: 'rgb(195, 32, 50)',
      ns: 'rgb(35, 31, 32)',
      bnsf: 'rgb(248, 93, 19)',
      cefx: 'rgb(11, 118, 215)',
      soo: 'rgb(136, 6, 13)',
    };
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
              <div className="data-visualization">
                <div className="data-table resightings-values-table">
                  <div className="table-title">
                    <span className="title-spacing title-left-spacing" />
                    <h3>277 repeated sightings of 209 engines since 3/20/2019</h3>
                    <span className="title-spacing title-right-spacing" />
                  </div>
                  <div className="y-axis">
                    <div className="y-axis-row">
                      <div className="row-label">CP, 9833</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '2.82738%' }}><span>9833</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '3.57143%' }}><span>9833</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '2.82738%', width: '0.744048%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">CP, 8056</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '2.97619%' }}><span>8056</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '60.8631%' }}><span>8056</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '2.97619%', width: '57.8869%' }} />
                        </div>
                        <div>
                          <button id="active-marker-trigger" className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '69.1964%' }}><span>8056</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '60.8631%', width: '8.33333%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">CP, 4452</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '2.97619%' }}><span>4452</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '49.5536%' }}><span>4452</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '2.97619%', width: '46.5774%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">NS, 1132</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.ns, left: '3.125%' }}><span>1132</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.ns }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.ns, left: '3.42262%' }}><span>1132</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.ns, left: '3.125%', width: '0.297619%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">NS, 9714</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.ns, left: '3.125%' }}><span>9714</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.ns }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.ns, left: '3.42262%' }}><span>9714</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.ns, left: '3.125%', width: '0.297619%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">CP, 8725</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.42262%' }}><span>8725</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '22.7679%' }}><span>8725</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.42262%', width: '19.3452%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">SOO, 4412</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.soo, left: '3.42262%' }}><span>4412</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.soo }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.soo, left: '58.631%' }}><span>4412</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.soo, left: '3.42262%', width: '55.2083%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">CP, 8516</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.57143%' }}><span>8516</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '41.369%' }}><span>8516</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.57143%', width: '37.7976%' }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '44.1964%' }}><span>8516</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '41.369%', width: '2.82738%' }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '56.6964%' }}><span>8516</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '44.1964%', width: '12.5%' }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '61.9048%' }}><span>8516</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '56.6964%', width: '5.20833%' }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '63.0952%' }}><span>8516</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '61.9048%', width: '1.19048%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">CP, 8546</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.57143%' }}><span>8546</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '4.91071%' }}><span>8546</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.57143%', width: '1.33929%' }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '10.8631%' }}><span>8546</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '4.91071%', width: '5.95238%' }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '68.1548%' }}><span>8546</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '10.8631%', width: '57.2917%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">BNSF, 5167</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.bnsf, left: '3.57143%' }}><span>5167</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.bnsf }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.bnsf, left: '12.3512%' }}><span>5167</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.bnsf, left: '3.57143%', width: '8.77976%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">CP, 9836</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.57143%' }}><span>9836</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '67.1131%' }}><span>9836</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.57143%', width: '63.5417%' }} />
                        </div>
                      </div>
                    </div>
                    <div className="y-axis-row">
                      <div className="row-label">CEFX, 1053</div>
                      <div className="row-axis">
                        <div>
                          <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cefx, left: '3.72024%' }}><span>1053</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cefx }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cefx, left: '22.3214%' }}><span>1053</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cefx, left: '3.72024%', width: '18.6012%' }} />
                        </div>
                        <div>
                          <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cefx, left: '25.2976%' }}><span>1053</span></button>
                          <div className="sighting-connector" style={{ backgroundColor: colors.cefx, left: '22.3214%', width: '2.97619%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="y-axis-row">
                    <div className="row-label">CP, 8735</div>
                    <div className="row-axis">
                      <div>
                        <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.72024%' }}><span>8735</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '9.97024%' }}><span>8735</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.72024%', width: '6.25%' }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '28.2738%' }}><span>8735</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '9.97024%', width: '18.3036%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="y-axis-row">
                    <div className="row-label">CEFX, 1054</div>
                    <div className="row-axis">
                      <div>
                        <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cefx, left: '3.72024%' }}><span>1054</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cefx }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cefx, left: '42.5595%' }}><span>1054</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cefx, left: '3.72024%', width: '38.8393%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="y-axis-row">
                    <div className="row-label">CP, 8062</div>
                    <div className="row-axis">
                      <div>
                        <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.72024%' }}><span>8062</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '48.3631%' }}><span>8062</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.72024%', width: '44.6429%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="y-axis-row">
                    <div className="row-label">CP, 8028</div>
                    <div className="row-axis">
                      <div>
                        <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.72024%' }}><span>8028</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '4.91071%' }}><span>8028</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.72024%', width: '1.19048%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="y-axis-row">
                    <div className="row-label">CP, 8019</div>
                    <div className="row-axis">
                      <div>
                        <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.72024%' }}><span>8019</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '4.91071%' }}><span>8019</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.72024%', width: '1.19048%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="y-axis-row">
                    <div className="row-label">CP, 8620</div>
                    <div className="row-axis">
                      <div>
                        <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.86905%' }}><span>8620</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '5.95238%' }}><span>8620</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.86905%', width: '2.08333%' }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '50.744%' }}><span>8620</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '5.95238%', width: '44.7917%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="y-axis-row">
                    <div className="row-label">CP, 8845</div>
                    <div className="row-axis">
                      <div>
                        <button className="sighting-marker" type="button" style={{ backgroundColor: colors.cp, left: '3.86905%' }}><span>8845</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.cp, left: '9.82143%' }}><span>8845</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.cp, left: '3.86905%', width: '5.95238%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="y-axis-row">
                    <div className="row-label">NS, 9142</div>
                    <div className="row-axis">
                      <div>
                        <button className="sighting-marker" type="button" style={{ backgroundColor: colors.ns, left: '3.86905%' }}><span>9142</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.ns }} />
                      </div>
                      <div>
                        <button className="sighting-marker hidden" type="button" style={{ backgroundColor: colors.ns, left: '5.50595%' }}><span>9142</span></button>
                        <div className="sighting-connector" style={{ backgroundColor: colors.ns, left: '3.86905%', width: '1.6369%' }} />
                      </div>
                    </div>
                  </div>
                  <div className="x-axis">
                    <div className="data-set">
                      <ul className="data-set-values">
                        <li>3/19</li>
                        <li>5/19</li>
                        <li>7/19</li>
                        <li>9/19</li>
                        <li>11/19</li>
                        <li>1/20</li>
                        <li>3/20</li>
                        <li>5/20</li>
                        <li>7/20</li>
                        <li>9/20</li>
                        <li>11/20</li>
                        <li>1/21</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="visualization-overlay">
                <SiteImage
                  data={getImageDataById('visualization-overlay-inner', data)}
                />
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

Trainspotted.propTypes = {
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

export default Trainspotted;
