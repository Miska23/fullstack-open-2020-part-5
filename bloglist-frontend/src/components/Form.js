import React from 'react'
const Form = (props) => (

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

export default Form
