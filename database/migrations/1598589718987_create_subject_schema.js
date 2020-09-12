'use strict'

const Subject = require('../../app/Models/Subject')

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateSubjectSchema extends Schema {
  up () {
    this.create('subjects', (table) => {
      table.increments('subject_id').unsigned()
      // table.integer('subject_id').unsigned().unique()
      table.string('title').unique()
      table.integer('teacher_id').unsigned()


      table.foreign('teacher_id').references('teachers.teacher_id')
        .onDelete('CASCADE') // ON DELETE CASCADE
        .onUpdate('CASCADE') // ON UPDATE CASCADE
    })
  }

  down () {
    this.drop('subjects')
  }
}

module.exports = CreateSubjectSchema
