import React, { Component, useState, useEffect } from 'react'
import styled, { css } from "styled-components";
import axios from 'axios'

class Tweet extends Component {
    constructor() {
      super()
    }

    render() {

      return(
        <div>
          <p>{this.props.text} by {this.props.user}</p>
        </div>
      )
    }
}

class Whiteboard extends Component {

  constructor() {
      super()

      this.state = {
        tweets: ''
      }

      this.getTweets = this.getTweets.bind(this)
  }

  getTweets(e) {

    e.preventDefault()

    console.log("Getting tweets...")

    axios.get('/gettweets')
      .then((res) => {

        // this.setState({tweets: res.data.tweets})
        this.setState({message: res.data.message})

        // tweets = JSON.parse(res.data.tweets)

        this.setState({tweets: JSON.parse(res.data.tweets)})

        // console.log(this.state.message)
        // console.log(res.data.tweets)

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

  render() {

    console.log("render")

    var displayTweets = []

    for (let i = 0; i < this.state.tweets.length; i++) {
      console.log(this.state.tweets[i])
      displayTweets.push(<Tweet key={i} user={this.state.tweets[i].user_id} text={this.state.tweets[i].text} />)
    }

    // this.getTweets()

    return (
      <>
        <h1>Whiteboard</h1>
        <button onClick={this.getTweets}>Load Tweets</button>
        {displayTweets}
      </>
    )

  }
}

export default Whiteboard
