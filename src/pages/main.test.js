import React from 'react'
import {shallow, mount} from 'enzyme'

import MainPage from './main'

describe('MainPage', () => {
  it('should be able to add note', () => {
    const component = mount(<MainPage />)
    let addNoteButton =component.find('#addNote').first();
    let textArea =component.find('#noteInput').first();
    addNoteButton.simulate('click');
    textArea.simulate('change', { target: {value: 'note1' }})
    let notes = JSON.parse(global.localStorage.getItem("notes"));
    expect(notes.length).toBe(1);
    expect(notes[0]).toBe('note1');
  })

  it('should be able to add multiple notes', () => {
    const component = mount(<MainPage />)
    let addNoteButton =component.find('#addNote').first();
    let textArea =component.find('#noteInput').first();
    addNoteButton.simulate('click');
    textArea.simulate('change', { target: {value: 'note2' }})
    let notes = JSON.parse(global.localStorage.getItem("notes"));
    expect(notes.length).toBe(2);
    expect(notes[0]).toBe('note1');
    expect(notes[1]).toBe('note2');
  })

  it('should be able to edit first note', () => {
    const component = mount(<MainPage />)
    let noteItem =component.find('.noteItem').first();
    let textArea =component.find('#noteInput').first();
    noteItem.simulate('click');
    textArea.simulate('change', { target: {value: 'updatedNote1' }})
    let notes = JSON.parse(global.localStorage.getItem("notes"));
    expect(notes.length).toBe(2);
    expect(notes[0]).toBe('updatedNote1');
    expect(notes[1]).toBe('note2');
  })

  it('should be able to delete first note', () => {
    window.confirm = jest.fn(() => true)
    const component = mount(<MainPage />)
    let deleteNote =component.find('.deleteNote').first();
    deleteNote.simulate('click');
    let notes = JSON.parse(global.localStorage.getItem("notes"));
    expect(notes.length).toBe(1);
    expect(notes[0]).toBe('note2');
  })
})