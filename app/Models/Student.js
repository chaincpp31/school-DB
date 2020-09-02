'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Student extends Model {
    static get primaryKey() {
        return 'student_id'
    }
    subjects() {
        return this.hasMany('App/Models/Student')
    }
}

module.exports = Student
