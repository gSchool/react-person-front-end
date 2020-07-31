import React, {Component} from 'react';
import PersonList from './PersonList';
import PersonEdit from './PersonEdit';
import PersonAdd from "./PersonAdd";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            people: [],
            selectedView: 'PersonList',
            selectedPerson: undefined
        };
    }

    componentDidMount() {
        this.getPersonList();
    }

    getPersonList = async () => {
        const response = await fetch('/api/person')
        const people = await response.json()
        this.setState({people, selectedView : 'PersonList'})
    }

    onAdd = () => {
        this.setState({...this.state, selectedView: 'PersonAdd'});
    };

    onEdit = (p, idx) => {
        this.setState({...this.state, selectedView: 'PersonEdit', selectedPerson: p});
    };

    onSave = async (updatedPerson) => {
        await fetch(`/api/person/${this.state.selectedPerson.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName: updatedPerson.firstName, lastName: updatedPerson.lastName })
          })
          this.getPersonList()
    };

    onDelete = async (deletedPerson) => {
        await fetch(`/api/person/${deletedPerson.id}`, {
            method: 'DELETE'
          })
        this.getPersonList()
    };

    onSaveNew = async (newP) => {
        await fetch('/api/person', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName: newP.firstName, lastName: newP.lastName })
        })
        this.getPersonList()
    }

    get currentView() {
        if (this.state.selectedView === 'PersonEdit') {
            return <PersonEdit selectedPerson={this.state.selectedPerson} onSave={this.onSave}/>
        } else if (this.state.selectedView === 'PersonAdd') {
            return <PersonAdd onSave={this.onSaveNew}/>
        } else {
            return <PersonList people={this.state.people}
                               onEdit={this.onEdit}
                               onAdd={this.onAdd}
                               onDelete={this.onDelete}/>
        }
    }

    render() {
        return (
            <div className="App">
                {this.currentView}
            </div>
        );
    }
}