import React, { Component, useState, useEffect } from 'react'

function InputText() {

  return (
    <>
        <form>
          <label for="video">Video Link</label>
          <input type="text" id="video" name="video" />
          <button type="button">Post</button>
        </form>
    </>
  )
}

export default InputText
