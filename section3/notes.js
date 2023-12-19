const chalk = require('chalk')
const fs = require('fs')

const getNotes = function () {
  return 'Your notes...'
}


const addNote = function (title, body) {
  const notes = loadNotes()

  const duplicateNote = notes.filter((note) => title === note.title)

  debugger
  if (duplicateNote.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log('New note added!')
  } else {
    console.log('Note title already exist!')
  }
}

const removeNote = (title) => {
 const notes = loadNotes()

 const notesToKeep = notes.filter((note) => title !== note.title)
 if (notesToKeep.length === notes.length) {
  console.log(chalk.red.inverse('No note found!'))
 } else {
  console.log('notesToKeep', notesToKeep);
  saveNotes(notesToKeep)
  console.log(chalk.green.inverse('Note removed!'))
 }
}

const listNote = () => {
  const notes = loadNotes()

  console.log(chalk.green('Your notes'))
  
  notes.forEach(element => {
    console.log(element.title)
  })
}

const readNote = (title) => {
  const notes = loadNotes()

  const note = notes.find(note => note.title === title)

  if (note) {
    console.log(chalk.green.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note Not Found!'))
  }

}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  listNote,
  readNote,
}