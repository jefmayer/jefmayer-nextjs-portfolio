import Image from 'next/image'
import * as React from 'react';

function Footer() {
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
              MERN, NextJs, Gatsby
              <br />
              EPiServer .NET Devlopment
              <br />
              PHP & Wordpress Development
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
            <p className="body-regular">AKQA, EssenceGlobal, GTB, Jack Morton, Legendary Creatures, McCann, Octagon, Real Art, Sapient, AlpineStars, Cisco, Chrysler, Ford, GM, Harley-Davidson, HBO, Hilton, LG, Motorola, Progressive, Samsung, Sony, Springs Window Fashions, Verizon</p>
          </div>
          <div className="footer-content-locations">
            <h3 className="heading-sm">Where I&rsquo;ve been</h3>
            <div className="flag-wrapper">
              <div className="oh-flag">
                <Image
                  alt="Cleveland, Ohio"
                  height="122"
                  src="/images/oh-flag.svg"
                  width="75"
                />
              </div>
              <div className="chi-flag">
                <Image
                  alt="Chicago, Illinois"
                  height="105"
                  src="/images/chi-flag.svg"
                  width="65"
                />
              </div>
              <div className="az-flag current">
                <Image
                  alt="Tucson, Arizona"
                  height="106"
                  src="/images/az-flag.svg"
                  width="65"
                />
              </div>
            </div>
          </div>
        </div>
        <ul className="social-nav">
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
        <div className="copyright-content">
          <p className="body-sm">&copy;2023 Jef Mayer</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
