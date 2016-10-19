import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';

const ItemTypes = {
  POST: 'post'
};

const squareTarget = {
  drop(props) {
    let post = props.post;
    let url = '//reddit.com'+ post.permalink;
    window.open(url ,"_self");
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

class OpenDropzone extends Component {
  render() {
    const { connectDropTarget, isOver, post } = this.props;
    
    return connectDropTarget(
      <div className="card-panel drop-panel" style={{ opacity: isOver ? 0.5 : 1 }}>
        <img src="/assets/images/reddit-logo.png" />
        <h2>Open</h2>
      </div>
    );
  }
}

OpenDropzone.propTypes = {
  isOver: PropTypes.bool.isRequired,
  post: PropTypes.object
};

export default DropTarget(ItemTypes.POST, squareTarget, collect)(OpenDropzone);
