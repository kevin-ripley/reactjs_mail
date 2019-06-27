import React, { Component } from 'react'
import './App.css'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import axios from 'axios'

const Mailgun = require('mailgun.js')

const api_key = 'key-48be13739a33970d539fc85e0b989f2d'
// Your domain, from the Mailgun Control Panel
const domain = 'sandboxb4fca9421b034123b71a4540218869eb.mailgun.org'
// Your sending email address
const from_who = 'ripleyoriginals@gmail.com'

class App extends Component {
  constructor () {
    super()
    this.state = { email: [], body: '', attachments: [] }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }
  
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1>out-mail</h1>
        </header>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <FormControl
              type='email'
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

          <input className='filechooser' type='file' name='attachments' />

          <Button type='submit'>send out-mail</Button>
        </Form>
      </div>
    )
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  resetForm(msg){
    this.state = {
      email: [],
      body: '',
      attachments:[]
    };
    console.log(msg)
    alert('Message Sent!')
  }

  handleSubmit (e) {
     e.preventDefault()
    const { email, body, attachments } = this.state

    const data = {
      // Specify email data
      from: from_who,
      // The email to contact
      to: email,
      text: body,
      attachment: attachments
    }
    console.log(`This is the attachments variable: ${attachments}`)
    const mg = Mailgun.client({ username: 'api', key: api_key })
    mg.messages.create(domain, data).then(msg => this.resetForm(msg), console.log()).catch(err => console.log(err))
  }
}
export default App
