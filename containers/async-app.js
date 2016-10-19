import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from '../actions/actions'
import SearchField from '../components/search-field'
import PostsList from '../components/posts-list'

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(nextSubreddit) {
    if (nextSubreddit === '') return;
    this.props.dispatch(selectSubreddit(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated, errors, selectedPost } = this.props;
    return (
      <div>
        <header>
          <nav>
            <div className="nav-wrapper container">
              <a href="#">Reedit</a>
              <SearchField value={selectedSubreddit}
                onChange={this.handleChange} />
            </div>
          </nav>
        </header>
        {!!errors && 
          <span>
            There was an error in your request
          </span>
        }
        <main>
          <div className="container">
            <div className="row">
              <div className="col s12 update-container">
                {lastUpdated &&
                  <span>
                    Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                    {' '}
                  </span>
                }
                {!isFetching &&
                  <a href="#"
                    onClick={this.handleRefreshClick}>
                    Refresh
                  </a>
                }
              </div>
              {isFetching && posts.length === 0 &&
                <h2>Loading...</h2>
              }
              {!isFetching && posts.length === 0 &&
                <h2>Empty.</h2>
              }
              {selectedPost.title &&
                <div className="row">
                  <div className="col s12 m5">
                    <div className="card-panel" style={{cursor: 'move'}}>
                      {selectedPost.title}
                    </div>
                  </div>
                  <div className="col s12 m5">
                    <div className="card-panel">
                      Open
                    </div>
                  </div>
                  <div className="col s12 m5">
                    <div className="card-panel">
                      Share
                    </div>
                  </div>
                </div>
              }
              {posts.length > 0 &&
                <div className="col s12" style={{ opacity: isFetching ? 0.5 : 1 }}>
                  <PostsList posts={posts} />
                </div>
              }
            </div>
          </div>
        </main>
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  selectedPost: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit, errors, selectedPost} = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
    selectedPost,
    errors
  };
}

export default connect(mapStateToProps)(AsyncApp);