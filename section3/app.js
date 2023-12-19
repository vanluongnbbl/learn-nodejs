const chalk = require('chalk');
const validator = require('validator')
const yargs = require('yargs')
const notes = require('./notes.js')

// const isEmail = validator.isURL('foo@asdbar.csom');
// const command = process.argv[2]
// console.log('process.argv', process.argv)
yargs.version('1.1.0')
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note description',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title: {
            describe: 'Note description',
            demandOption: true,
            type: 'string',
        },
    },
    handler: function (argv) {
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List the note',
    handler () {
        notes.listNote()
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note description',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})
// console.log('yargs', yargs.argv)
yargs.parse()