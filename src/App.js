import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'
import InputNumberParticipants from 'components/InputNumberParticipants'

import './assets/styles/base.css'
import VoteContainer from './components/VoteContainer/index'

class App extends Component {

  state = {
    amountParticipants: 0,
  }

  onEntryParticipants = amount => {
    this.setState({
      amountParticipants: amount,
    })
  }

  render() {
    const { amountParticipants } = this.state

    return (
      <Container className="base-container">
        <Row>
          {
            amountParticipants ?
              <VoteContainer amountParticipants={ amountParticipants }/>
              :
              <InputNumberParticipants onClick={ this.onEntryParticipants }/>
          }

        </Row>
      </Container>
    )
  }

}

export default App
