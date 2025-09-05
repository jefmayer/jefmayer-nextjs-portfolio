import Image from 'next/image'
import * as React from 'react';

function Footer({ currentYear }) {
  return (
    <footer className="footer project-animation-about project-details-about">
      <div className="footer-inner">
        <h2 className="heading-lg">About</h2>
        <div className="footer-content">
          <div className="footer-content-skills">
            <h3 className="heading-sm">What I do well</h3>
            <p className="body-regular">
              Fullstack Javascript Development
              <br />
              NextJs, Modern Web Frameworks
              <br />
              .NET Web Dev, Platform-Based Solutions
              <br />
              PHP, Wordpress Development
              <br />
              Responsive Site Design & UX
              <br />
              Brand & Content Strategy
              <br />
              SEO & Martech Integration
              <br />
              Creative Design
            </p>
          </div>
          <div className="footer-content-clients">
            <h3 className="heading-sm">Who I&rsquo;ve worked with</h3>
            <p className="body-regular">AKQA, EssenceGlobal, GTB, Jack&nbsp;Morton, Legendary&nbsp;Creatures, McCann, Octagon, Real&nbsp;Art, Sapient, AlpineStars, Cisco, Chrysler, Ford, GM, Harley-Davidson, HBO, Hilton, LG, Motorola, Progressive, Samsung, Sony, Springs&nbsp;Window&nbsp;Fashions, Verizon</p>
          </div>
          <div className="footer-content-locations">
            <h3 className="heading-sm">Where I&rsquo;ve been</h3>
            <div className="flag-wrapper">
              <a className="oh-flag" href="https://goo.gl/maps/miAioRNQxuJcd7GX8" target="_blank" rel="noopener noreferrer">
                <Image
                  alt="Cleveland, Ohio"
                  height="122"
                  src="/images/oh-flag.svg"
                  width="75"
                />
                <Image
                  alt=""
                  className="hover-img"
                  height="122"
                  src="/images/oh-flag-hover.svg"
                  width="75"
                />
              </a>
              <a className="chi-flag" href="https://goo.gl/maps/1KW2aYcqQZBzwSw68" target="_blank" rel="noopener noreferrer">
                <Image
                  alt="Chicago, Illinois"
                  height="105"
                  src="/images/chi-flag.svg"
                  width="65"
                />
                <Image
                  alt=""
                  className="hover-img"
                  height="105"
                  src="/images/chi-flag-hover.svg"
                  width="65"
                />
              </a>
              <a className="az-flag current" href="https://goo.gl/maps/9WoriThjHUqHwuA2A" target="_blank" rel="noopener noreferrer">
                <Image
                  alt="Tucson, Arizona"
                  height="106"
                  src="/images/az-flag.svg"
                  width="65"
                />
                <Image
                  alt=""
                  className="hover-img"
                  height="106"
                  src="/images/az-flag-hover.svg"
                  width="65"
                />
              </a>
            </div>
          </div>
        </div>
        <ul className="social-nav">
          <li className="copyright-content">
            <span>&copy;{currentYear.toString().substring(2)}</span>
          </li>
          <li>
            <a
              className="instagram-link"
              href="https://www.instagram.com/modeseventyeight"
              rel="noreferrer"
              style={{
                backgroundImage: 'url(/images/instagram-icon.svg)',
              }}
              target="_blank"  
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              className="strava-link"
              href="https://www.strava.com/athletes/5643933"
              rel="noreferrer"
              style={{
                backgroundImage: 'url(/images/strava-icon.svg)',
              }}
              target="_blank"  
            >
              Strava
            </a>
          </li>
          <li>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/in/jefmayer"
              rel="noreferrer"
              style={{
                backgroundImage: 'url(/images/linkedin-icon.svg)',
              }}
              target="_blank"  
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              className="zwift-link"
              href="https://zwiftpower.com/profile.php?z=1002258"
              rel="noreferrer"
              style={{
                backgroundImage: 'url(/images/zwift-icon.svg)',
              }}
              target="_blank"  
            >
              Zwift
            </a>
          </li>
          <li>
            <a
              className="discogs-link"
              href="https://www.discogs.com/user/jefmayer/collection"
              rel="noreferrer"
              style={{
                backgroundImage: 'url(/images/discogs-icon.svg)',
              }}
              target="_blank"  
            >
              Discogs
            </a>
          </li>
          <li>
            <a
              className="github-link"
              href="https://github.com/jefmayer"
              rel="noreferrer"
              style={{
                backgroundImage: 'url(/images/github-icon.svg)',
              }}
              target="_blank"  
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
