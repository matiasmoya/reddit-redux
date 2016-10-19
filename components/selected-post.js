import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

const ItemTypes = {
  POST: 'post'
};

const postSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class SelectedPost extends Component {
  render() {
    const { post, isDragging, connectDragSource } = this.props;
    
    return connectDragSource(
      <div className="card horizontal" style={{opacity: isDragging ? 0.5 : 1, cursor: 'move'}}>
        <div className="card-image">
          <img src={this.getThumbnail(post.thumbnail)} />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <b>{post.title}</b>
            <p></p>
          </div>
          <div className="card-action">
            <ul className="item-post-footer">
              <li><i className="ico ico-comments"></i><span>{post.num_comments} comments</span></li>
              <li><i className="ico ico-ups"></i><span>{post.ups} ups</span></li>
              <li><i className="ico ico-downs"></i><span>{post.downs} downs</span></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  getThumbnail(url) {
    if (url === 'default' || url === 'self') return "/assets/images/default-user.png";
    return url;
  }
}

SelectedPost.propTypes = {
  post: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.POST, postSource, collect)(SelectedPost);
