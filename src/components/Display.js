// The Display component will be dashboard for viewing all videos.

import React, { Component } from 'react';
import { Link } from 'react-router';
import Nav from './Nav';
import { Share } from 'react-twitter-widgets';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import { isLoggedIn } from '../utils/AuthService';
import axios from 'axios';


class Display extends Component {

  state = { videos: [] };

  getVideos() {
    axios.get('http://res.cloudinary.com/unicodeveloper/video/list/miniflix.json')
          .then(res => {
            console.log(res.data.resources);
            this.setState({ videos: res.data.resources});
    });
  }

  componentDidMount() {
    this.getVideos();
  }

  render() {

  	const { videos }  = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center"> Latest Videos on Miniflix </h3>
        <hr/>

        <div className="col-sm-12">
        	<CloudinaryContext cloudName="unicodeveloper">
            { videos.map((data, index) => (
                <div className="col-sm-4" key={index}>
                  <div className="embed-responsive embed-responsive-4by3">
                    <Video publicId={data.public_id} width="300" height="300" controls></Video>
                  </div>
                  <div className="tweet-share text-center">
                	<Share url={`http://res.cloudinary.com/unicodeveloper/video/upload/${data.public_id}.mp4`} /> 
                  </div> 
                </div>

              ))
            }
          </CloudinaryContext>

        </div>
      </div>
    );
  }
}

export default Display;