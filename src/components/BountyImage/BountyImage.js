import React, { Component } from 'react'
import './BountyImage.css';
import images from './images';


class BountyImage extends Component {
  render() {
    var index = Math.floor(Math.random() * Math.floor(images.length));
    return <img src={images[index]} style={{width: "100%", paddingBottom: "1em"}} />;
  }
}

export default BountyImage