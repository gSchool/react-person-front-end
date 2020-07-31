import React, { Component } from 'react';

export default class PersonAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: ''
        }
    }

    editName = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({...this.state, [name]: value});
    };

    render() {
        return(
            <div>
                <input name="firstName" value={this.state.firstName} onChange={this.editName}/>
                <input name="lastName" value={this.state.lastName} onChange={this.editName}/>
                <button name="save" onClick={() => this.props.onSave(this.state)}>Save</button>
            </div>
        )
    }
}