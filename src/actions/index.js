export const fetchNotes = term => {
  let notes = [];
  let savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notes = JSON.parse(savedNotes);
  }
  if (term) {
    let results = [];

    // simple search algo
    notes.map(note => {
      if (note.toUpperCase().indexOf(term.toUpperCase()) >= 0) {
        results.push(note);
      }
    });
    return results;
  } else {
    return notes;
  }
};

export const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};
