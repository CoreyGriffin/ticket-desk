import React, {Component} from 'react';
import firebase from './firebase';
import './App.css';

class App extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    created: '',
    priority: 'low',
    issue: '',
    summary: '',
    tickets: [],
    selected: []
  }

  componentDidMount() {
    const ticketsRef = firebase
      .database()
      .ref('tickets');
    ticketsRef.on('value', (snapshot) => {
      let tickets = snapshot.val();
      let ticketQueue = [];
      for (let ticket in tickets) {
        ticketQueue.push({
          id: ticket,
          customer_first: tickets[ticket].customer_first,
          customer_last: tickets[ticket].customer_last,
          customer_phone: tickets[ticket].customer_phone,
          customer_email: tickets[ticket].customer_email,
          priority: tickets[ticket].priority,
          customer_issue: tickets[ticket].customer_issue,
          ticket_summary: tickets[ticket].ticket_summary
        })
      }
      this.setState({tickets: ticketQueue})
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const ticketsRef = firebase
      .database()
      .ref('tickets');
    const ticket = {
      created: this.state.created,
      customer_first: this.state.firstName,
      customer_last: this.state.lastName,
      customer_phone: this.state.phone,
      customer_email: this.state.email,
      priority: this.state.priority,
      customer_issue: this.state.issue,
      ticket_summary: this.state.summary
    }
    ticketsRef.push(ticket);
    this.setState({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      created: '',
      priority: '',
      issue: '',
      summary: ''
    });
  }

  render() {
    return (
      <div className="app">
        <header>
          <h1>Ticket Desk</h1>
        </header>
        <div className="wrapper">
          <section className="ticket-input">
            <h2>Create new ticket</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="four columns">
                  <label for="firstName">First Name</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    onChange={this.handleChange}
                    value={this.state.firstName}/>
                </div>
                <div className="four columns">
                  <label for="lastName">Last Name</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    onChange={this.handleChange}
                    value={this.state.lastName}/>
                </div>
                <div className="four columns">
                  <label for="date">Date</label>
                  <input
                    className="u-full-width"
                    type="date"
                    name="created"
                    value={this.state.created}
                    onChange={this.handleChange}/>
                </div>
              </div>
              <div className="row">
                <div className="eight columns">
                  <label for="email">Email Address</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="email"
                    placeholder="example@email.com"
                    value={this.state.email}
                    onChange={this.handleChange}/>
                </div>
                <div className="four columns">
                  <label for="phone">Phone Number</label>
                  <input
                    className="u-full-width"
                    type="text"
                    name="phone"
                    placeholder="(999) 999-9999"
                    value={this.state.phone}
                    onChange={this.handleChange}/>
                </div>
              </div>
              <div className="row">
                <label for="summary">Ticket Sumamry</label>
                <input
                  className="u-full-width"
                  type="text"
                  name="summary"
                  placeholder="Ticket summary"
                  value={this.state.summary}
                  onChange={this.handleChange}/>
              </div>
              <div className="row">
                <label for="priority">Priority</label>
                <select
                  name="priority"
                  value={this.state.priority}
                  onChange={this.handleChange}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="row">
                <label for="issue">Issue Description</label>
                <textarea
                  className="u-full-width"
                  type="text"
                  name="issue"
                  placeholder="Customer issue"
                  value={this.state.issue}
                  onChange={this.handleChange}/>
              </div>
              <button className=".u-pull-right">Submit</button>
            </form>
          </section>
          <section className="ticket-queue">
            <h2>Tickets {`(${this.state.tickets.length})`}</h2>
            <ul>
              {this
                .state
                .tickets
                .map((ticket) => {
                  return (
                    <li key={ticket.id} onClick={this.selectTicket}>
                      <div className="ticket-queue-wrap">
                        <p className="ticket-user">{ticket.customer_first + ' ' + ticket.customer_last}</p>
                        <p className="ticket-priority">{ticket.priority}</p>
                        <hr/>
                        <h3 className="ticket-summary">{ticket.ticket_summary}</h3>
                      </div>
                    </li>
                  )
                })}
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
