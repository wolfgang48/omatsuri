import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Scrollbars from 'react-custom-scrollbars';
import Background from '../Background/Background';
import GithubButton from '../GithubButton/GithubButton';
import logoText from '../../assets/logo-text.svg';
import toolsData from '../../data/tools';
import settings from '../../data/settings';
import classes from './Navbar.styles.less';

const removeTrailingSlash = (path) =>
  (path.slice(path.length - 1) === '/' ? path.slice(0, path.length - 1) : path);

const isActive = (path, match, location) =>
  !!(match || removeTrailingSlash(path) === removeTrailingSlash(location.pathname));

const findCurrentIndex = (pathname) =>
  toolsData.findIndex((tool) => removeTrailingSlash(pathname) === removeTrailingSlash(tool.link));

export default function Navbar({ className }) {
  const { pathname } = useLocation();
  const [current, setCurrent] = useState(findCurrentIndex(pathname));

  useEffect(() => {
    setCurrent(findCurrentIndex(pathname));
  }, [pathname]);

  const items = toolsData.map((tool) => (
    <NavLink
      key={tool.name}
      to={tool.link}
      className={classes.link}
      activeClassName={classes.linkActive}
      isActive={isActive.bind(this, tool.link)}
    >
      <img className={classes.icon} src={tool.icon} alt="" />
      <div className={classes.label}>{tool.name}</div>
    </NavLink>
  ));

  return (
    <Background component="nav" className={cx(classes.navbar, className)}>
      <div className={classes.inner}>
        <div className={classes.main}>
          <Link to="/" className={classes.logo}>
            <img className={classes.logoImage} src={logoText} alt="" />
          </Link>
          <Scrollbars style={{ width: '100%', height: 'calc(100vh - 262px)' }}>
            <div className={classes.links}>
              {items}
              <div
                className={classes.linkBackground}
                style={{
                  transform: current !== -1 ? `translateY(${current * 72}px)` : 'scaleY(0)',
                }}
              />
            </div>
          </Scrollbars>
        </div>

        <div className={classes.footer}>
          <div className={classes.footerLinks}>
            <Link to="/about" className={classes.footerLink}>
              About
            </Link>
            <span className={classes.dot}>•</span>
            <a className={classes.footerLink} href={settings.bugs}>
              Report an issue
            </a>
          </div>
          <GithubButton />
        </div>
      </div>
    </Background>
  );
}

Navbar.propTypes = {
  className: PropTypes.string,
};
