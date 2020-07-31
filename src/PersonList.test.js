import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import PersonList from './PersonList';

describe('PersonList', () => {

    it('has clickable people', () => {
        const expected = [
            { firstName: 'Alan', lastName: 'Turing' },
            { firstName: 'Alanzo', lastName: 'Church' }
        ];
        const personListWrap = shallow(<PersonList people={expected} />);
        expect(personListWrap.find('li')).toHaveLength(2);
    });

    it('calls onEdit when clicked', () => {
        const expected = [
            { firstName: 'Alan', lastName: 'Turing' },
        ];
        const onEdit = sinon.stub();
        const personListWrap = shallow(<PersonList
            people={expected} onEdit={onEdit} />);
        expect(personListWrap.find('li')).toHaveLength(1);
        personListWrap.find('span').simulate('click');
        expect(onEdit.calledOnce).toBe(true);
    });

    it('calls onAdd when clicked', () => {
        // Setup
        const people = [
            { firstName: 'Alan', lastName: 'Turing' },
        ];
        const onAdd = sinon.stub();
        const personList = shallow(<PersonList
            people={people} onAdd={onAdd}/>);

        // Exercise
        personList.find({name: 'add'}).simulate('click');

        // Assert
        expect(onAdd.calledOnce).toBe(true);
    });

    it('should invoke onDelete when btn is clicked', () => {
        // Setup
        const people = [
            { firstName: 'Alan', lastName: 'Turing' },
        ];
        const onDelete = sinon.spy();
        const personListWrapper = shallow(<PersonList
            people={people} onDelete={onDelete}/>);

        // Exercise
        personListWrapper.find({name: 'delete'}).simulate('click');

        // Assert
        expect(onDelete.calledOnce).toBe(true);
        expect(onDelete.calledWith({firstName: 'Alan', lastName: 'Turing'})).toBe(true);
    })
});
