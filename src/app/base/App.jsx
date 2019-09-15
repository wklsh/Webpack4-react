import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Routes from './Routes';

import './styles/index.scss';

const propTypes = {
  // /** @type {object} 		from router */
  // location: PropTypes.object.isRequired,
};

const defaultProps = {
  // guestToken: null,
};

class App extends PureComponent {
  render() {
    return (
      <>
        <Helmet
          htmlAttributes={{ lang: 'en', amp: undefined }}
          titleTemplate="React-helmet title"
          titleAttributes={{ itemprop: 'name', lang: 'en' }}
          meta={[
            {
              name: 'description',
              content: 'Content',
            },
          ]}
        />
        <div className="app__main">
          <Routes />
        </div>
      </>
    );
  }
}

const mapStateToProps = store => {
  return {
    ui: store.ui,
  };
};

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(withRouter(App));

App.propTypes = propTypes;
App.defaultProps = defaultProps;
