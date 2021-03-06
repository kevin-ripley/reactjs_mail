import React, { Component } from 'react'
import './App.css'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import {key} from './mailgun-key';
const Mailgun = require('mailgun.js')

// const api_key = 'Your Mailgun API Key'
// const from_who = 'Who you would like the mailing to be from'
// const domain = 'Mailgun Domain'

const api_key = key
// Your domain, from the Mailgun Control Panel
const domain = 'sandboxb4fca9421b034123b71a4540218869eb.mailgun.org'
// Your sending email address
const from_who = 'ripleyoriginals@gmail.com'


class App extends Component {
  constructor () {
    super()
    this.state = { email: [], body: '', attachments: '' }
  }
  render () {
    return (
      <div>
        <div className='split left'>
          <div className='centered'>
            <InTitle />
            <InMail />
          </div>
        </div>
        <div className='split right'>
          <div className='centered'>
            <OutTitle />
            <OutMail
              email={this.state.email}
              body={this.state.body}
              attachments={this.state.attachments}
            />
          </div>
        </div>
      </div>
    )
  }
}

function OutTitle () {
  return <h1 className='App-header'>out-mail</h1>
}

function InTitle () {
  return <h1 className='App-header'>in-mail</h1>
}

class OutMail extends Component {
  constructor () {
    super()
    this.state = { email: [], body: '', attachments: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileSelected = this.fileSelected.bind(this)
    this.fileInput = React.createRef()
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })

    console.log(this.state)
  }

  handleSubmit (e) {
    e.preventDefault()

    const { email, body, attachments } = this.state
    const path = require('path')
    const fp = path.join(__dirname, attachments)
    const data = {
      // Specify email data
      from: from_who,
      // The email to contact
      to: email,
      html: `<html>${body}</html>`,
      attachment: fp,
      'h:Content-Type': 'multipart/form-data'
    }
    console.log(`This is the attachments variable: ${attachments}`)
    const mg = Mailgun.client({ username: 'api', key: api_key })
    mg.messages
      .create(domain, data)
      .then(msg => this.resetForm(msg))
      .catch(err => console.log(err))
  }

  fileSelected (e) {
    this.setState({
      attachments: this.fileInput.current.files[0].name
    })
    console.log(this.state.attachments)
  }

  resetForm (msg) {
    this.setState = {
      email: [],
      body: '',
      attachments: ''
    }
    console.log(msg)
    alert('Message Sent!')
  }

  render () {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type='textarea'
              name='email'
              placeholder='Add recipients email'
              style={{ cols: '30', rows: '2' }}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type='textarea'
              name='body'
              placeholder='Add body text'
              style={{ cols: '30', height: '15vh' }}
              onChange={this.handleChange}
            />
          </FormGroup>

          <input
            className='filechooser'
            type='file'
            ref={this.fileInput}
            placeholder='Add Attachments'
            onChange={this.fileSelected}
          />

          <Button type='submit'>send out-mail</Button>
        </Form>
      </div>
    )
  }
}

class InMail extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}


export default App
