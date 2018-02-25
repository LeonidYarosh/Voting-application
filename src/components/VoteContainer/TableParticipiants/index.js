import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import { isEqual } from 'lodash'

import { precisionRound, sortItemsOut } from 'utils'

class TableParticipiants extends Component {

  state = {
    tablesVoterData: [],
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.voterData, nextProps.voterData)) {
      this.sortVoterData(nextProps.voterData, nextProps.seconds)
    }
  }

  sortVoterData = (data, seconds) => {
    const totalVotes = (9 - seconds) * 100
    let tablesVoterData = data.map((el, i) => {
      let votePercent = el / totalVotes * 100

      votePercent = precisionRound(votePercent, 1)

      return { voterNumber: i + 1, vote: votePercent }
    })

    tablesVoterData = [...sortItemsOut(tablesVoterData, 'vote')]

    this.setState({
      tablesVoterData,
    })
  }

  render() {
    const { tablesVoterData } = this.state

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Избиратель</th>
            <th>Процент голосов</th>
          </tr>
        </thead>
        <tbody>
          {
            tablesVoterData.map( (el, i) => {
              return (
                <tr key={ `row-${i}` } >
                  <th scope="row">{ el.voterNumber }</th>
                  <td>{ el.vote }</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }

}

TableParticipiants.propTypes = {
  voterData: PropTypes.array.isRequired,
  seconds: PropTypes.number,
}
TableParticipiants.defaultProps = {}

export default TableParticipiants
