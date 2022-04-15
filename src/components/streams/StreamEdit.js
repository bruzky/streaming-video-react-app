import _ from "lodash";
import React from "react";
import { connect } from 'react-redux';
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues)
  }

  render() {
    console.log(this.props);
    if (!this.props.stream) return <div>Loading...</div>;

    // * note the use of lodash function to pluck out desired qualities from the stream object so that we are not passing on IDs and other info that we do not want updated. We also could have constructed a standard object that passes on the only the properties we will later need for onSubmit.
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm 
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit}/>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
