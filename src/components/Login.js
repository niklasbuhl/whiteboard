import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'

class Login extends Component {

  constructor() {
    super()

    this.state = {
      logged_in: null,
      message: '',
      username: '',
      password: '',
    }

     this.login = this.login.bind(this)
     this.logout = this.logout.bind(this)

     this.onChangeUserName = this.onChangeUserName.bind(this)
     this.onChangePassword = this.onChangePassword.bind(this)
  }

  checkLogin(e) {

  }

  onChangeUserName(e) {
    this.setState({ username: e.target.value })
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value })
  }


  login(e) {

    e.preventDefault()

    console.log("Logging in...")


    const json = {
      username: this.state.username,
      password: this.state.password
    }

    axios.post('/login', json)
      .then((res) => {

        this.setState({logged_in: res.data.login})
        this.setState({message: res.data.message})

      }).catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }

        this.setState({logged_in: false})
        this.setState({message: "Error!"})

      })

  }

  logout(e) {

    console.log("Logging out...")

    axios.get('/logout')
      .then((res) => {

        console.log(res.data.login)

        this.setState({logged_in: res.data.login})
        this.setState({message: res.data.message})

      }).catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }

        this.setState({logged_in: false})
        this.setState({message: "Error!"})

      })

  }

  render() {

    console.log(this.state.logged_in)

    if(this.state.logged_in) {
      console.log("Something")

      return(
        <form>
          <input type="button" value="Logout" onClick={this.logout} />
          <span>{this.state.message}</span>
        </form>
      )
    } else {
      return (
        <form onSubmit={this.login}>
          <label for="username">Username</label>
          <input type="text" value={this.state.username} onChange={this.onChangeUserName} />
          <label for="password">Passphrase</label>
          <input type="text" value={this.state.password} onChange={this.onChangePassword} />
          <input type="submit" value="Login" />
          <span>{this.state.message}</span>
        </form>
      )
    }
  }
}

export default Login
