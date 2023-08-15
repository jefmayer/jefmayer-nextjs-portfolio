import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getSceneOffsetPos,
  scrollToPosition,
} from '../utils/browser-scroll';
import {
  hideMenu,
  setActiveSection,
  showMenu,
} from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.updateMenuState = this.updateMenuState.bind(this);
    this.onNavClick = this.onNavClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.removeActiveClass = this.removeActiveClass.bind(this);
    this.addActiveClass = this.addActiveClass.bind(this);
    this.onBodyClickHandler = this.onBodyClickHandler.bind(this);
    this.getNavHighlightPos = this.getNavHighlightPos.bind(this);
    this.navHighlightRef = React.createRef();
    this.menuActiveClass = 'nav-menu-open';
    this.menuAnimatelass = 'nav-menu-animate';
  }

  onNavClick(id) {
    const { dispatch } = this.props;
    const pos = getSceneOffsetPos(id);
    scrollToPosition(pos);
    dispatch(setActiveSection(id));
  }

  onMouseOver(id) {
    const { activeSectionId } = this.props;
    const btn = document.querySelector(`.nav-menu [data-scene-name="${activeSectionId}"]`);
    if (btn) {
      btn.classList.remove('active');
    }
    this.navHighlightRef.current.style.top = this.getNavHighlightPos(id);
  }

  onMouseLeave() {
    const { activeSectionId } = this.props;
    const btn = document.querySelector(`.nav-menu [data-scene-name="${activeSectionId}"]`);
    if (btn) {
      btn.classList.add('active');
    }
    this.navHighlightRef.current.style.top = this.getNavHighlightPos();
  }

  onBodyClickHandler(event) {
    if (!event.target.closest('.site-nav')) {
      this.updateMenuState();
    }
  }

  getNavHighlightPos(id) {
    const { activeSectionId } = this.props;
    let btnId = id;
    if (!btnId) {
      btnId = activeSectionId;
    }
    const btn = document.querySelector(`.nav-menu [data-scene-name="${btnId}"]`);
    if (!btn) {
      return 0;
    }
    return `${btn.offsetTop}px`;
  }

  updateMenuState() {
    const { dispatch, isMenuOpen } = this.props;
    if (!isMenuOpen) {
      dispatch(showMenu());
    } else {
      dispatch(hideMenu());
    }
  }

  removeActiveClass() {
    document.body.removeEventListener('click', this.onBodyClickHandler);
    document.body.classList.remove(this.menuAnimatelass);
    setTimeout(() => {
      document.body.classList.remove(this.menuActiveClass);
    }, 100);
  }

  addActiveClass() {
    document.body.addEventListener('click', this.onBodyClickHandler);
    document.body.classList.add(this.menuActiveClass);
    setTimeout(() => {
      document.body.classList.add(this.menuAnimatelass);
    }, 100);
  }

  render() {
    const {
      activeSectionId,
      data,
      isMenuOpen,
    } = this.props;
    // Toggle menu display
    if (isMenuOpen) {
      this.addActiveClass();
    } else {
      this.removeActiveClass();
    }
    return (
      <header className="header">
        <div className="header-logo" />
        <nav className="site-nav">
          <div className="nav-menu">
            <div
              className="nav-highlight active"
              ref={this.navHighlightRef}
              style={{ top: this.getNavHighlightPos() }}
            />
            <div className="nav-menu-inner">
              {data.map((section) => {
                const {
                  client,
                  id,
                  projectTitlePart1,
                  projectTitlePart2,
                  role,
                } = section;
                return (
                  <React.Fragment key={id}>
                    <button
                      type="button"
                      className={`scene-navigation-btn ${activeSectionId === id ? 'active' : ''}`}
                      role="menuitem"
                      data-scene-name={id}
                      onClick={(e) => this.onNavClick(id, e)}
                      onMouseOver={(e) => this.onMouseOver(id, e)}
                      onFocus={(e) => this.onMouseOver(id, e)}
                      onMouseLeave={this.onMouseLeave}
                    >
                      <span className="heading-md">{client}</span>
                      <span className="body-regular">
                        {projectTitlePart1}
                        &nbsp;
                        {projectTitlePart2}
                      </span>
                      <span className="heading-xs">Role</span>
                      <span className="body-sm">{role}</span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="nav-menu-overlay" />
          <button type="button" className="nav-menu-btn" onClick={this.updateMenuState}>
            <span className="nav-btn-dot nav-dot-top" />
            <span className="nav-btn-dot nav-dot-mid" />
            <span className="nav-btn-dot nav-dot-btm" />
            <span className="nav-label">Work</span>
            <span className="nav-close-btn">
              <span className="nav-btn-dot nav-dot-left" />
              <span className="nav-btn-dot nav-dot-right" />
              <span className="nav-btn-dot nav-dot-top-left" />
              <span className="nav-btn-dot nav-dot-top-right" />
              <span className="nav-btn-dot nav-dot-btm-left" />
              <span className="nav-btn-dot nav-dot-btm-right" />
            </span>
          </button>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  activeSectionId: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    client: PropTypes.string,
    id: PropTypes.string,
    projectTitlePart1: PropTypes.string,
    projectTitlePart2: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  ...bindActionCreators({
    hideMenu,
    setActiveSection,
    showMenu,
  }, dispatch),
});

export default connect(mapDispatchToProps)(Header);
