'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateSubjectSchema extends Schema {
  up () {
    this.create('subjects', (table) => {
      table.integer('subject_id').unsigned().unique()
      table.sting('title').unique()
      table.integer('teacher_id').unsigned()


      table.foreign('teacher_id').reference('teachers')
        .onDelete('CASCADE') // ON DELETE CASCADE
        .onUpdate('CASCADE') // ON UPDATE CASCADE
    })
  }

  down () {
    this.drop('subjects')
  }
}

module.exports = CreateSubjectSchema
