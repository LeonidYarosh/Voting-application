import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col } from 'reactstrap'
import LogVotes from 'components/VoteContainer/LogVotes'
import TableParticipiants from 'components/VoteContainer/TableParticipiants'

import './style.css'

class VoteContainer extends Component {

  state = {
    voterData: [],
    seconds: 9,
    initialState: true,
  }

  componentWillMount() {
    const { amountParticipants } = this.props

    this.setState({
      voterData: new Array(amountParticipants).fill(0),
    })
  }

  componentDidMount() {
    this.calculationVotes(this.state.seconds, this.state.voterData)
  }

  calculationVotes = (seconds, voterData) => {
    if (seconds - 1 < 0) {
      return
    }

    this.calculationVotesOneSeconds(1000, voterData).then(result => {
      this.setState({
        voterData: [...result],
        seconds: seconds - 1,
        initialState: false,
      }, this.calculationVotes( seconds - 1, result))
    })
  }

  calculationVotesOneSeconds = (miliseconds, voterData) => {
    const { amountParticipants } = this.props
    const cloneVoterData = [...voterData]

    return new Promise(resolve => {
      const iterate = ms => {
        if (ms < 10) {
          resolve(cloneVoterData)
          return
        }
        const randIndex = Math.floor(Math.random() * amountParticipants)

        cloneVoterData[randIndex]++
        setTimeout(iterate, 10, ms - 10)
      }

      setTimeout(iterate, 10, miliseconds)
    })
  }

  render() {
    const { voterData, seconds, initialState } = this.state

    return (
      <div className="vote-container">
        <Col sm="12" md="4">
          <LogVotes voterData={ voterData } seconds={ seconds } initialState={ initialState } />
        </Col>
        <Col sm="12" md="8">
          <TableParticipiants voterData={ voterData } seconds={ seconds } />
        </Col>
      </div>
    )
  }

}

VoteContainer.propTypes = {
  amountParticipants: PropTypes.number.isRequired,
}
VoteContainer.defaultProps = {}

export default VoteContainer
