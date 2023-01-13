import React, {Component} from 'react'

class SignIn extends Component {
  constructor(){
    super();
    this.state = {
      SignInEmail: '',
      SignInPassword: ''
    }
  }

  render(){
    const { onRouteChange } = this.props;
    return (
      <form>
      <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center"> 
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="center">
            <input
              onClick={() => onRouteChange('home')} 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
              type="submit" 
              value="Sign in" />
          </div>
          <div className="lh-copy mt3 center">
            <p onClick={() => onRouteChange('register')} className="f5 link dim black db pointer">Register</p>
          </div>
        </div>
      </main>
    </article>
    </form>
    );
  }

}

export default SignIn;