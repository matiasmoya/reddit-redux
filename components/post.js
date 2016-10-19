import React, { Component, PropTypes } from 'react';

export default class Post extends Component {
  render() {
    const { post, index } = this.props;

    return (
      <li className="collection-item avatar item-post" key={index}>
        <div className="item-post-image">
          <img src={this.getThumbnail(post.thumbnail)} />
        </div>
        <div className="item-post-description">
          <span class="title">{post.title}</span>
          <ul className="item-post-footer">
            <li><i className="ico ico-comments"></i><span>{post.num_comments} comments</span></li>
            <li><i className="ico ico-ups"></i><span>{post.ups} ups</span></li>
            <li><i className="ico ico-downs"></i><span>{post.downs} downs</span></li>
          </ul>
        </div>
      </li>
    );
  }

  getThumbnail(url) {
    if (url === 'default' || url === 'self') return "/assets/images/default-user.png";
    return url
  }
}

Post.propTypes = {
  posts: PropTypes.array.isRequired
};
