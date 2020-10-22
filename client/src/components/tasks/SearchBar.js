import React, { useState } from 'react'
import {Card } from 'semantic-ui-react'
import ReactSearchBox from 'react-search-box'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import SearchResult from './SearchResult';

const SearchBar = ({ project: { project } }) => {
  let tasksTitles = []
  if (project.tasks) {
    tasksTitles = project.tasks.map(task => ({
      key: task.title,
      value: task.title,
      status: task.status,
      priority: task.priority,
      type: task.type,
      id: task._id
    }))
  }

  const [recordFound, setRecordFound] = useState(false)
  const [searchResult, setSearchResult] = useState({})

  const showRecord = record => {
    setRecordFound(true)
    setSearchResult(record)
  }
  const cleanResult = () =>{
    setSearchResult({})
    setRecordFound(false)
  }

  return (
    <Card fluid>
      <Card.Content class="search-box-card">
        <ReactSearchBox
          placeholder='Search for Tasks'
          data={tasksTitles}
          onSelect={record => showRecord(record)}
          value=''
        />
      </Card.Content>

      {recordFound && <SearchResult cleanResult= {cleanResult} result = {searchResult}/>}
    </Card>
  )
}

SearchBar.propTypes = {
  project: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  project: state.project
})

export default withRouter(connect(mapStateToProps, { })(SearchBar))
