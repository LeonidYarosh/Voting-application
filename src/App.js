import React, { Component } from 'react'
import { Container, Col, Button } from 'reactstrap'
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
        <header>
          <h2>Приложение для обработки результатов голосования</h2>
        </header>
        {
          amountParticipants ?
            <VoteContainer
              amountParticipants={ amountParticipants }
            />
            :
            <InputNumberParticipants onClick={ this.onEntryParticipants }/>
        }
        {
          !!amountParticipants &&
          <Col xs="12">
            <Button color="primary" onClick={ () => this.onEntryParticipants(0) }>
              Перезапустить
            </Button>
          </Col>
        }
      </Container>
    )
  }

}

export default App
