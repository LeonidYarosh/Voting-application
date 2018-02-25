import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, Label, Input } from 'reactstrap'
import { isEqual } from 'lodash'

class LogVotes extends Component {

  state = {
    voteConfigList: '',
  }

  componentWillMount() {
    this.transformVoterData(this.props.voterData)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.voterData, nextProps.voterData)) {
      this.transformVoterData(nextProps.voterData, nextProps.seconds, nextProps.initialState)
    }
  }

  transformVoterData = (data, seconds, initialState) => {
    if (initialState === false) {
      const { voteConfigList } = this.state
      let stringConfig = ''

      data.map((el, i) => {
        stringConfig = `${stringConfig}${i + 1}к. - ${ el } гл.\n`
      })

      this.setState({
        voteConfigList: `${voteConfigList} (${ 9 - seconds }) -----------------\n${stringConfig}`,
      })
    }
  }

  render() {
    const { seconds } = this.props
    const { voteConfigList } = this.state

    return (
      <Form>
        <FormGroup row>
          <Label for="config" >Конфиг результатов голосования (к. - кандидат, гл. - голоса).         Время: { 9 - seconds }</Label>
          <Input
            type="textarea"
            name="text"
            id="config"
            value={ voteConfigList }
            rows="6"
            onChange={ () => {} }
          />
        </FormGroup>
      </Form>
    )
  }

}

LogVotes.propTypes = {
  voterData: PropTypes.array.isRequired,
  seconds: PropTypes.number,
  initialState: PropTypes.bool,
}
LogVotes.defaultProps = {}

export default LogVotes
