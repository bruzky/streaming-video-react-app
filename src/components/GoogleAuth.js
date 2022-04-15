import React from "react";
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '355584320575-g9kror64lcm6ilase91j7r8ab4b3fbs5.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  };

  // * update isSignedIn property via listener in componentDidMount. The callback function for the .listen method on the isSignedIn property gets a boolean argument (true or false)
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) this.props.signIn(this.auth.currentUser.get().getId());
    if (!isSignedIn) this.props.signOut();
  };

  // * Sign in and sign out helper functions
  onSignInClick = () => {
    this.auth.signIn();
  };
  
  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button"><i className="google icon"/>Sign Out</button>  
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button"><i className="google icon"/>Sign In with Google</button>  
      );
    }
  };

  
  render() {
    return <div>{this.renderAuthButton()}</div>
  };
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);