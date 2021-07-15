import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'

class Tweet extends Component {

  constructor() {
    super()

    this.state = {
      text: '',
      message: '',
    }

    this.submit = this.submit.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  submit(e) {
    e.preventDefault()
    // console.log("Submit text: " + this.state.text)

    const json = {
      tweet: this.state.text
    }

    axios.post('/tweet', json).then((res) => {
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

      this.setState({message: "Error!"})

    })

  }

  onChangeText(e) {
    this.setState({ text: e.target.value })
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <label>Tweet</label>
        <input type="text" value={this.state.text} onChange={this.onChangeText}/>
        <input type="submit" value="Tweet" />
        <span>{this.state.message}</span>
      </form>
    )
  }
}

export default Tweet
