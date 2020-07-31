import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';


import PersonAdd from './PersonAdd';

it('should render inputs for new person', () => {
    // Setup
    const personAddWrapper = shallow(<PersonAdd/>)

    // Assert
    expect(personAddWrapper.find({name: 'firstName'})).toHaveLength(1);
    expect(personAddWrapper.find({name: 'lastName'})).toHaveLength(1);
});

it('should edit the new person name', () => {
    // Setup
    const personAddWrapper = shallow(<PersonAdd/>);
    const eventF = {target: {name: 'firstName', value: 'Barbara'}};
    const eventL = {target: {name: 'lastName', value: 'Liskov'}};

    // Exercise
    personAddWrapper.find({name: 'firstName'}).simulate('change', eventF);
    personAddWrapper.find({name: 'lastName'}).simulate('change', eventL);

    // Assert
    expect(personAddWrapper.find({value: 'Barbara'})).toHaveLength(1);
    expect(personAddWrapper.find({value: 'Liskov'})).toHaveLength(1);
});

it('should send a new person to parent to save', () => {
    // Setup
    const onSave = sinon.spy();
    const personAddWrapper = shallow(
        <PersonAdd onSave={onSave}/>
    );
    personAddWrapper.setState({firstName: 'Barbara', lastName: 'Liskov'});

    //Exercise
    personAddWrapper.find({name: 'save'}).simulate('click');

    // Assert
    expect(onSave.calledOnce).toBe(true);
    expect(onSave.calledWith({firstName: 'Barbara', lastName: 'Liskov'})).toBe(true);
});