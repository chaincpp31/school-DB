'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateEnrolmentSchema extends Schema {
  up () {
    this.create('enrollments', (table) => {
      table.increments()
      table.float('mark').default(0)
      table.timestamp('mark_date').unique().default(this.fn.now())
      table.integer('student_id').notNullable().unsigned()
      table.integer('subject_id').notNullable().unique().unsigned()
      table.timestamps()

      table.foreign('student_id').references('students.student_id')
        .onDelete('CASCADE') // ON DELETE CASCADE
        .onUpdate('CASCADE') // ON UPDATE CASCADE

      table.foreign('subject_id').references('subjects.subject_id')
        .onDelete('CASCADE') // ON DELETE CASCADE
        .onUpdate('CASCADE') // ON UPDATE CASCADE

  
    })
    
  }

  down () {
    this.drop('enrollments')
  }
}

module.exports = CreateEnrolmentSchema
