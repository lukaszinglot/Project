import React, { Component } from "react";
import { connect } from "react-redux";
import { customRegister, customLogin } from "../../store/actions/auth";
import { AppState } from "../../store/index.d";
import loginStyles from "./login.module.scss";
import { auth, googleAuthProvider } from "../../firebase/firebase";

interface LoginState {
  email: string;
  password: string;
  [key: string]: string;
}

interface LoginProps {
  customRegister: (email: string, password: string) => void;
  startLogin?: () => void;
  startLogout?: () => void;
  customLogin: (email: string, password: string) => void;
  onInputChange: () => void;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.submitLogin = this.submitLogin.bind(this);
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  submitLogin() {
    const { email, password } = this.state;
    this.props.customLogin(email, password);
    this.setState({
      email: "",
      password: ""
    });
  }
  submitRegister = () => {
    const { email, password } = this.state;
    this.props.customRegister(email, password);
    this.setState({
      email: "",
      password: ""
    });
  };
  startLogout = () => {
    auth.signOut();
  };
  startLogin = () => {
    auth.signInWithPopup(googleAuthProvider);
  };
  render() {
    return (
      <>
        <header className={loginStyles.Header}>
          <div>
            <nav className={`${loginStyles.navStyle} ${loginStyles.shrink}`}>
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={this.onInputChange}
                value={this.state.email}
              />
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={this.onInputChange}
                value={this.state.password}
              />
              <div className="ui buttons">
                <button className="ui button" onClick={this.submitLogin}>
                  Login
                </button>
                <div className="or"></div>
                <button
                  className="ui positive button"
                  onClick={this.submitRegister}
                >
                  Register
                </button>
                <button onClick={this.startLogout} className="ui button">
                  Logout
                </button>
                <button onClick={this.startLogin} className="ui button">
                  Log With Google
                </button>
              </div>
            </nav>
          </div>
        </header>
      </>
    );
  }
}

export default connect<AppState>(null, { customRegister, customLogin })(Login);
