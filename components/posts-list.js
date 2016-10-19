import React, { Component, PropTypes } from 'react';
import Post from './post';

export default class PostsList extends Component {
  render() {
    return (
      <ul className="collection list-post">
        {this.props.posts.map((post, i) =>
          <Post post={post} key={i} />
        )}
      </ul>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
};
