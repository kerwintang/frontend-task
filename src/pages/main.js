import React, { Component } from "react";
import { fetchNotes, saveNotes } from "../actions";
import { Input, Menu, Sidebar, TextArea } from "semantic-ui-react";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      note: "",
      term: "",
      index: 0
    };
    this.noteInput = null;
    this.setNote = this.setNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.searchNotes = this.searchNotes.bind(this);
  }

  setNote({ target }) {
    const note = target.value;
    let { notes, index } = this.state;
    notes.splice(index, 1, note);
    this.setState({ note, notes });
    saveNotes(notes);
  }

  addNote() {
    let notes = fetchNotes("");
    this.setState(
      {
        term: "",
        note: "",
        index: notes.length,
        notes: [...notes, "New note"]
      },
      function() {
        saveNotes(this.state.notes);
      }
    );
    this.noteInput.focus();
  }

  selectNote(i) {
    let { notes } = this.state;
    this.setState({ note: notes[i], index: i });
    this.noteInput.focus();
  }

  deleteNote(i) {
    if (confirm("Are you sure you want to delete this note?")) {
      let { notes } = this.state;
      notes.splice(i, 1);
      let note = "";
      if (notes.length > 0) {
        note = notes[0];
      }
      this.setState({ note, index: 0, notes });
      saveNotes(notes);
    }
  }

  searchNotes({ target }) {
    const term = target.value;
    let notes = fetchNotes(term);
    this.setState({ term, notes });
  }

  componentDidMount() {
    let notes = fetchNotes(this.state.term);
    if (notes.length > 0) {
      this.setState({ notes, note: notes[0] });
    } else {
      this.setState({ notes });
    }
  }

  render() {
    const { note, term, index } = this.state;
    return (
      <div
        style={{
          backgroundColor: "white",
          opacity: 0.95,
          marginTop: 10,
          padding: 20
        }}
      >
        <Sidebar
          as={Menu}
          animation="push"
          icon="labeled"
          inverted
          vertical
          visible={true}
          width="thin"
        >
          <Menu.Item as="a">
            <Input
              id="searchNote"
              placeholder="Search..."
              value={term}
              onChange={this.searchNotes}
            />
          </Menu.Item>
          <Menu.Item as="a" id="addNote" onClick={this.addNote}>
            <strong>+ Add Note</strong>
          </Menu.Item>
          {this.state.notes.map((note, i) => {
            return (
              <Menu.Item key={i} as="a" style={i==index?{backgroundColor:'#555'}:{}}>                
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%"
                  }}
                >
                  <div
                    style={{
                      width: "80%",
                      overflow: "hidden",
                      textWrap: "no-wrap",
                      textAlign: "left"
                    }}
                    className="noteItem"
                    onClick={() => this.selectNote(i)}
                  >
                    <div style={{ width: 10000 }}>{note}</div>
                  </div>
                  <div style={{ width: "20%" }}>
                    <img
                      className="deleteNote"
                      onClick={() => this.deleteNote(i)}
                      src="/public/images/delete-48.ico"
                      style={{ height: 15, width: 15 }}
                    />
                  </div>
                </div>
              </Menu.Item>
            );
          })}
        </Sidebar>
        <Sidebar.Pusher>
          <TextArea
            id="noteInput"
            ref={input => {
              this.noteInput = input;
            }}
            transparent="true"
            style={{ border: 0, outline: 0, width: "100%" }}
            autoHeight
            rows={35}
            onChange={this.setNote}
            placeholder="Enter your notes..."
            value={note}
          />
        </Sidebar.Pusher>
      </div>
    );
  }
}

export default MainPage;
