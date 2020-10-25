import React from 'react'
import { Table, Container, Placeholder } from 'semantic-ui-react'

const ListLoader = () => {
  return (
    <div>
      <Container>
        <Table singleLine columns={6} striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Placeholder inverted>
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
              <Table.Cell>
                <Placeholder inverted>
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
              <Table.Cell>
                <Placeholder inverted>
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
              <Table.Cell>
                <Placeholder inverted>
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
              <Table.Cell>
                <Placeholder inverted>
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
              <Table.Cell>
                <Placeholder inverted>
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
              <Table.Cell>
                <Placeholder inverted>
                  <Placeholder.Line />
                </Placeholder>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </div>
  )
}

export default ListLoader
