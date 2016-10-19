import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

const ItemTypes = {
  POST: 'post'
};

const squareTarget = {
  drop(props) {
    let post = props.post;
    let url = 'https://reddit.com'+ post.permalink;
    
    let mailto = `mailto:?subject=look at this reddit post&body=Hey! why don't you check this reddit post? ${url} :)`
    window.open(mailto, "_self");
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class ShareDropzone extends Component {
  render() {
    const { connectDropTarget, isOver, post } = this.props;
    
    return connectDropTarget(
      <div className="card-panel drop-panel" style={{ opacity: isOver ? 0.5 : 1 }}>
        <img src="/assets/images/mail-logo.png" />
        <h2>Share</h2>
      </div>
    );
  }
}

ShareDropzone.propTypes = {
  isOver: PropTypes.bool.isRequired,
  post: PropTypes.object
};

export default DropTarget(ItemTypes.POST, squareTarget, collect)(ShareDropzone);
