import { Button, Container, Form, Grid, Image, Menu, Message, Table } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import React from 'react'

const MenuBar = () => {
  // I left these styles here although they are not used anymore
  // as a proof that I did the 'inline styles' exercises
  const menuStyle = {
    padding: 20,
    backgroundColor: 'lightblue',
  }

  const activeStyle = {
    backgroundColor: 'lightgrey',
    fontWeight: 'bold',
    padding: 'inherit'
  }

  return (
    <Grid.Row columns={1}>
      <Menu inverted>
        <Menu.Item link>
          <NavLink exact to="/">anecdotes</NavLink>
        </Menu.Item>
        <Menu.Item link>
          <NavLink exact to="/create">create new</NavLink>
        </Menu.Item>
        <Menu.Item link>
          <NavLink exact to="/about">about</NavLink>
        </Menu.Item>
      </Menu>
    </Grid.Row>
  )
}

const Anecdote = ({ anecdote }) => (
  <Grid.Row columns={1}>
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} {anecdote.votes === 1 ? 'vote' : 'votes'}</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  </Grid.Row>
)

const AnecdoteList = ({ anecdotes }) => (
  <Grid.Row columns={1}>
    <div>
      <h2>Anecdotes</h2>
      <Table striped celled>
        <Table.Body>
          {anecdotes.map(anecdote =>
            <Table.Row key={anecdote.id} >
              <Table.Cell>
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </Table.Cell>
            </Table.Row>)}
        </Table.Body>
      </Table>
    </div>
  </Grid.Row>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid divided='vertically'>
      <Grid.Row columns={2}>
        <Grid.Column width={10}>
          <p>According to Wikipedia:</p>

          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>

          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column width={3}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const Footer = () => (
  <Grid.Row columns={1}>
    <div>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
  </Grid.Row>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.handleNotification(`a new anecdote '${this.state.content}' created!`)
    this.props.history.push('/')
  }

  render() {
    return (
      <Grid.Row columns={1}>
        <div>
          <h2>create a new anecdote</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>content</label>
              <input name='content' value={this.state.content} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>author</label>
              <input name='author' value={this.state.author} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>url for more info</label>
              <input name='info' value={this.state.info} onChange={this.handleChange} />
            </Form.Field>
            <Button type='submit'>create</Button>
          </Form>
        </div>
      </Grid.Row>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  notify = (notification) => {
    this.setState({ notification })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  render() {
    return (
      <Container>
        <Router>
          <Grid divided='vertically'>
            <Grid.Row columns={1}>
              <h1>Software anecdotes</h1>
            </Grid.Row>
            <MenuBar />
            {(this.state.notification &&
              <Grid.Row>
                <Message success>
                  {this.state.notification}
                </Message></Grid.Row>)}
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/create" render={({ history }) =>
              <CreateNew history={history} addNew={this.addNew} handleNotification={this.notify} />}
            />
            <Route path="/about" render={() => <About />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </Grid>
        </Router>
      </Container>
    );
  }
}

// I left this component here although it isn't used anymore
// as a proof that I did the 'inline styles' exercises
const Notification = (props) => {
  const containerStyle = {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 10,
    marginTop: 10,
    color: 'green',
    padding: 10
  }

  return (
    <div style={containerStyle}>
      {props.children}
    </div>
  )
}

export default App;
