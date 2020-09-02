'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateStudentSchema extends Schema {
  up () {
    this.create('students', (table) => {
      table.increments()
      table.integer('student_id').unsigned().unique()
      table.string('first_name',120).notNullable().unique()
      table.string('last_name',120).notNullable().unique()
      table.string('email',255).notNullable().unique()
      table.string('password').notNullable()
      table.integer('group_id').unsigned() // convert group_id to unsigned integer
      table.timestamps() //auto create 2 colum -> create_at update_at

      table.foreign('group_id')
      .references('groups.group_id')
      .onDelete('CASCADE') // ON DELETE CASCADE
      .onUpdate('CASCADE') // ON UPDATE CASCADE
    })
  }

  down () {
    this.drop('students')
  }
}

module.exports = CreateStudentSchema
