import React, { Component } from 'react';

export default class PersonList extends Component {

    get people() {
        return this.props.people.map((p, idx) => {
            return <li key={idx}>
                <span onClick={() => this.props.onEdit(p)}>{p.firstName} {p.lastName}</span>
                <button name="delete" onClick={() => this.props.onDelete(p)}>Delete</button>
            </li>
        })
    }

    render() {
        return (
            <div>
                <h1>Ordinary People</h1>
                <ul>
                    {this.people}
                </ul>
                <button name="add" onClick={() => this.props.onAdd()}>Add</button>
            </div>
        );
    }
}
