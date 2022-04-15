import React from "react";
import { connect } from 'react-redux'; 
import { fetchStreams } from '../../actions';
import { Link } from "react-router-dom";
import StreamEdit from "./StreamEdit";
import StreamDelete from "./StreamDelete";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  // * helper function for renderList to determine if Delete and Edit buttons should be shown on each stream. Function will be called inside renderList .map function with the current stream.
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return  (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    };
  }

  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <div className='item' key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content" >
            <Link 
              to={`/streams/show/${stream.id}`} 
              className='header' >{stream.title}
            </Link>
            <div className="description" >{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  // * helper method for render() that will show a Create Stream button at the bottom of the list if the user is logged in.
  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className="ui button primary" >Create Stream</Link>
        </div>
      )
    }
  }
  
  render() {

    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        <div>{this.renderCreate()}</div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
