import React, { useEffect, useState } from 'react'
import { Card, Button, Form } from 'semantic-ui-react'
import UpdateLoader from '../loader/UpdateLoader'
import { CATEGORIES_HOME } from '../../Constants'
import { updateCategory, getCategory } from '../../actions/categoryActions'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useIsMounted from 'ismounted'

const Update = ({
  category: { category, loading },
  getCategory,
  updateCategory,
  errors,
  history,
  match
}) => {
  const [formData, setFormData] = useState({ _id: match.params.id, name: '' })
  const { name } = formData
  //only get category by id when id changed
  useEffect(() => {
    getCategory(match.params._id, history)
    // eslint-disable-next-line
  }, [])

  //check if it's mounted -> cannot set state on unmounted component
  const isMounted = useIsMounted()
  useEffect(() => {
    //only if loading is false and still mounted
    if (!loading && isMounted.current && category) {
      const { name } = category
      setFormData({
        name
      })
    }
  }, [category, isMounted, loading])

  const onChange = e => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    updateCategory(category, formData, history)
  }

  if (category == null || category === '') return <UpdateLoader />

  return (
    <Card fluid>
      <Card.Content header={category.name} />
      <Card.Content>
        <Form widths='equal'>
          <Form.Group>
            <Form.Input
              label='name'
              name='name'
              value={name}
              onChange={e => onChange(e)}
              error={errors.name}
            />
          </Form.Group>
        </Form>
      </Card.Content>
      <Card.Content extra>
        <Button
          floated='right'
          color='black'
          content='Cancel'
          onClick={() => history.push(CATEGORIES_HOME)}
        />
        <Button
          floated='right'
          color='green'
          content='Save'
          type='submit'
          onClick={e => onSubmit(e)}
        />
      </Card.Content>
    </Card>
  )
}

Update.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  errors: state.errors,
  category: state.category
})

export default connect(mapStateToProps, { updateCategory, getCategory })(Update)
