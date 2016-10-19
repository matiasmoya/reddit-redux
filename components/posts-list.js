import React, { Component, PropTypes } from 'react';

export default class PostsList extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <div key={i}>
            <li>{post.title}</li>
            <ul>
              <li>Vote up: {post.ups}</li>
              <li>Vote down: {post.downs}</li>
              <li>Comments: {post.num_comments}</li>
            </ul>
          </div>
        )}
      </ul>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
};
