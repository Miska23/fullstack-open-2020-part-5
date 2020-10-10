import React from 'react'

import PropTypes from 'prop-types'

const LoginForm = (props) => (

  <form onSubmit={props.handleLogin}>
    <div>Username
      <input
        type="text"
        name="username"
        value={props.username}
        onChange={(event) => props.setUsername(event.target.value)} />
    </div>
    <div>Password
      <input
        type="text"
        name="password"
        value={props.password}
        onChange={(event) => props.setPassword(event.target.value)} />
    </div>
    <button type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
