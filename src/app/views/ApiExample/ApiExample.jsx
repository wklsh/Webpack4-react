import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEqual, isEmpty } from 'lodash';

import { getExample, GET_EXAMPLE } from 'Redux/example';
import { apiSelector } from '../../redux/api';

import styles from './ApiExample.scss';

const propTypes = {
  /** @type {func}		example api action */
  getExample: PropTypes.func.isRequired,
  /** @type {bool}		loading state of redux api action */
  loading: PropTypes.bool.isRequired,
  /** @type {object}	redux data */
  success: PropTypes.objectOf(PropTypes.any).isRequired,
  /** @type {object}	redux data */
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  /** @type {object}	redux data */
  error: PropTypes.objectOf(PropTypes.any).isRequired,
};

class ApiExample extends PureComponent {
  componentDidMount() {
    const { getExample } = this.props;
    getExample();
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    /**
     * On error
     */
    if (!isEmpty(error) && !isEqual(error, prevProps.error)) {
      console.log('error:', error);
      alert('API error occured! Check console.');
    }
  }

  render() {
    const { success, loading, data } = this.props;

    return (
      <section>
        <section>
          <h1 className={styles.nameplate}>
            Pulling test data from{' '}
            <a href="https://jsonplaceholder.typicode.com" className={styles.hyperlink}>
              https://jsonplaceholder.typicode.com
            </a>
          </h1>

          <div className={styles.itemWrapper}>
            {loading ? (
              <div>Loading...</div>
            ) : (
              !isEmpty(success) && (
                <>
                  <h2 className={styles.itemTitle}>{success.title}</h2>
                  <h3 className={styles.itemStatus}>{`Completed: ${success.completed}`}</h3>
                </>
              )
            )}
          </div>
        </section>

        <section>
          <div className={styles.objectWrapper}>
            <p className={styles.objectLabel}>Redux store data - processed in reducer:</p>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className={styles.objectItemWrapper}>
                <div className={styles.objectItemTitle}>example.data</div>
                {Object.keys(data).map(key => (
                  <div key={key} className={styles.objectItemKey}>
                    {`${key}: ${data[key]}`}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = ({ example }) => {
  const { 0: loading, 1: success, 2: error } = apiSelector(GET_EXAMPLE);
  const { data } = example; // store data

  return {
    data,
    loading,
    success: success || {},
    error,
  };
};

export default connect(
  mapStateToProps,
  {
    getExample,
  }
)(withRouter(ApiExample));

ApiExample.propTypes = propTypes;
