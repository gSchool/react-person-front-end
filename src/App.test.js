import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';
import PersonList from './PersonList';
import PersonEdit from  './PersonEdit';
import PersonAdd from './PersonAdd';
import fetchMock from 'fetch-mock'

describe('App', () => {

    beforeEach(() => {
        fetchMock.get('/api/person', [{firstName: "Nathan", lastName: "Zukoff"}])
    })

    afterEach(() => {
        fetchMock.restore()
    })

    const waitForAsync = () => new Promise(resolve => setImmediate(resolve))

    it('renders without crashing', () => {
      const appWrapper = shallow(<App/>);
      const personList = appWrapper.find(PersonList);
      expect(personList).toHaveLength(1);
    });

    it('has expected initial state', async () => {
        const appWrapper = shallow(<App/>);
        await waitForAsync()
        expect(appWrapper.state().people).toHaveLength(1);
        expect(appWrapper.state().selectedView).toEqual('PersonList');
    });


    it('changes state when onEdit is invoked', () => {
        const appWrapper = shallow(<App/>);

        appWrapper.instance().onEdit();

        expect(appWrapper.state().selectedView).toEqual('PersonEdit');
    });

    it('renders the edit view when state property is PersonEdit', () => {
        const appWrapper = shallow(<App/>);
        appWrapper.setState({selectedView: 'PersonEdit'});
        expect(appWrapper.find(PersonEdit)).toHaveLength(1);
    });

    it('should update a person and change view on save', async () => {
        // Setup
        const appWrapper = shallow(<App/>);
        const expected = {firstName: 'Barbara', lastName: 'Liskov'};
        const personList = appWrapper.find(PersonList);
        appWrapper.setState({selectedPerson: {firstName: 'Grace', lastName: 'Hopper', id:1}});
        appWrapper.setState({selectedView: 'PersonEdit'});
        fetchMock.put('/api/person/1', 200)

        // Exercise
        appWrapper.instance().onSave(expected);
        await waitForAsync()

        // Assert
        expect(appWrapper.state().selectedView).toEqual('PersonList');
    });

    it('changes state when onAdd is invoked', () => {
        // Setup
        const appWrapper = shallow(<App/>);

        // Exercise
        appWrapper.instance().onAdd();

        // Assert
        expect(appWrapper.state().selectedView).toEqual('PersonAdd');
    });

    it('renders the add view when state property is PersonAdd', () => {
        // Setup
        const appWrapper = shallow(<App/>);
        appWrapper.setState({selectedView: 'PersonAdd'});

        // Assert
        expect(appWrapper.find(PersonAdd)).toHaveLength(1);
    });

    it('should add the new person to state and change view to PersonList', async () => {
        // Setup
        const appWrapper = shallow(<App/>);
        const expected = {firstName: 'Barbara', lastName: 'Liskov'};
        appWrapper.setState({selectedView: 'PersonAdd'});
        fetchMock.post('/api/person', 200)

        // Exercise
        appWrapper.instance().onSaveNew(expected);
        appWrapper.update();
        const personList = appWrapper.find(PersonList);
        await waitForAsync()

        // Assert
        expect(appWrapper.state().selectedView).toEqual('PersonList');
    });

    it('should delete the person from state', async () => {
        // Setup
        const appWrapper = shallow(<App/>);
        const deletedPerson = {firstName: 'Alan', lastName: 'Turing', id:1};
        fetchMock.delete('/api/person/1', 200)

        // Exercise
        appWrapper.instance().onDelete(deletedPerson);
        appWrapper.update();
        const personList = appWrapper.find(PersonList);
        await waitForAsync()

        // Assert
        expect(personList.props().people).not.toContainEqual(deletedPerson);
    })

});
