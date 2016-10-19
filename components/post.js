import React, { Component, PropTypes } from 'react';
import { selectPost } from '../actions/actions';
import { connect } from 'react-redux';

class Post extends Component {
  constructor(props) {
    super(props);
    this.selectThisPost = this.selectThisPost.bind(this);
  }

  selectThisPost() {
    let post = this.props.post;
    this.props.dispatch(selectPost(post));
    window.scrollTo(0, 0);
  }

  render() {
    const { post, key } = this.props;

    return (
      <li className="collection-item avatar item-post" key={key} onClick={this.selectThisPost}>
        <div className="item-post-image">
          <img src={this.getThumbnail(post.thumbnail)} />
        </div>
        <div className="item-post-description">
          <span className="title">{post.title}</span>
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
    return url;
  }
}

Post.propTypes = {
  key: PropTypes.number,
  post: PropTypes.object,
  selectPost: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectPost } = state;

  return {
    selectPost
  };
}
export default connect(mapStateToProps)(Post);
