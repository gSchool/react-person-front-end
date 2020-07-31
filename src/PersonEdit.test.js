import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PersonEdit from './PersonEdit';

describe('PersonEdit', () => {

    it('should render the selected person from props', () => {
        // Setup
        const expected = {firstName: 'Grace', lastName: 'Hopper'};
        const personEditWrapper = shallow(<PersonEdit selectedPerson={expected}/>);

        // Assert
        expect(personEditWrapper.find({value: 'Grace'})).toHaveLength(1);
        expect(personEditWrapper.find({value: 'Hopper'})).toHaveLength(1);
    });

    it('should edit the selected persons name', () => {
        // Setup
        const personEditWrapper = shallow(<PersonEdit selectedPerson={{firstName: 'Grace', lastName: 'Hopper'}}/>);
        const eventF = {target: {name: 'firstName', value: 'Barbara'}};
        const eventL = {target: {name: 'lastName', value: 'Liskov'}};

        // Exercise
        personEditWrapper.find({name: 'firstName'}).simulate('change', eventF);
        personEditWrapper.find({name: 'lastName'}).simulate('change', eventL);

        // Assert
        expect(personEditWrapper.find({value: 'Barbara'})).toHaveLength(1);
        expect(personEditWrapper.find({value: 'Liskov'})).toHaveLength(1);
    });

    it('should send updated person to parent on save', () => {
        // Setup
        const onSave = sinon.stub();
        const personEditWrapper = shallow(
            <PersonEdit selectedPerson={{firstName: 'Grace', lastName: 'Hopper'}}
            onSave={onSave}/>);

        // Exercise
        personEditWrapper.find({name: 'save'}).simulate('click');
        // Assert
        expect(onSave.calledOnce).toBe(true);
        expect(onSave.calledWith({firstName: 'Grace', lastName: 'Hopper'})).toBe(true);
    })
});