'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateEnrolmentSchema extends Schema {
  up () {
    this.create('enrolments', (table) => {
      table.increments()
      table.float('mark').unique().default(0)
      table.timestamps('mark_date').unique()
      table.integer('student_id').notNullable().unsigned()
      table.integer('subject_id').notNulable().unique().unsigned()
      table.timestamps()

      table.foreign('student_id').reference('students')
        .onDelete('CASCADE') // ON DELETE CASCADE
        .onUpdate('CASCADE') // ON UPDATE CASCADE

      table.foreign('subject_id').reference('subjects')
        .onDelete('CASCADE') // ON DELETE CASCADE
        .onUpdate('CASCADE') // ON UPDATE CASCADE
      table.timestamps()
    })
  }

  down () {
    this.drop('enrolments')
  }
}

module.exports = CreateEnrolmentSchema
