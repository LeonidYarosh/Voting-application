import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Label, Form, FormGroup, Input } from 'reactstrap'

import './style.css'

class InputNumberParticipants extends Component {

  state = {
    isValid: true,
    value: 2,
  }

  onChange = e => {
    const value = parseInt(e.target.value, 10)

    this.setState({
      value,
    })
  }

  getOptionList = () => {
    const optionList = []

    for (let i = 2; i < 21; i++) {
      optionList.push(
        <option key={ `option-${i}` } value={ i }>
          { i }
        </option>
      )
    }
    return optionList
  }

  onClick = () => {
    this.props.onClick(this.state.value)
  }

  render() {
    const optionList = this.getOptionList()

    return (
      <Form>
        <FormGroup>
          <Label for="inputParticipants">Выберите кол-во кандидатов</Label>
          <Input
            type="select"
            name="selectMulti"
            id="inputParticipants"
            size="5"
            onChange={ this.onChange }
            value={ this.state.value }
          >
            { optionList }
          </Input>
        </FormGroup>
        <Button color="success" onClick={ this.onClick }>
          Подтвердить
        </Button>
      </Form>
    )
  }

}

InputNumberParticipants.propTypes = {
  onClick: PropTypes.func.isRequired,
}
InputNumberParticipants.defaultProps = {}

export default InputNumberParticipants
