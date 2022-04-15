import React from "react";
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);

    this.buildPlayer();
  }

  // * Originally we had the player build code in componentDidMount BUT if we need to fetch the stream, the stream will not yet exist when we reach render() (b/c api call delay) and the videoRef will never be passed into the video element. SOLUTION: we export the build player code into a helper function and 1) call it in component did mount in the case we directly navigate from a stream link and have the stream info already in the store, or 2) call it in componentDidUpdate in the event the stream is not present, so that it is called when the component re-renders (componentDidMount is only called ONCE!)
  componentDidUpdate() {
    this.buildPlayer();
  }

  // * video player will still try to load a video even when we navigate away from StreamShow. componentWillUnmount can disengage the video player. 
  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) return;

    // * integrating streaming video into video element with flv.js
    const { id } = this.props.match.params;
    if (flv.isSupported()) {
      this.player = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`
      });
      this.player.attachMediaElement(this.videoRef.current);
      this.player.load();
    };
  }

  render() {
    console.log(this.props.stream);
    if (!this.props.stream) return <div>Loading...</div>;

    const { title, description } = this.props.stream;

    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
