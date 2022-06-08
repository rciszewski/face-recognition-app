import React from 'react'

const SignIn = () => {
  return (
    <article className="br2 ba b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center"> 
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 center">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" for="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="center">
            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" type="submit" value="Sign in" />
          </div>
          <div className="lh-copy mt3 center">
            <p href="#0" className="f6 link dim black db pointer">Sign up</p>
          </div>
        </form>
      </main>
    </article>
  )
}

export default SignIn;