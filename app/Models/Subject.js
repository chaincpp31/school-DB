'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Subject extends Model {
    static get primaryKey(){
        return 'subject_id'
    }
    static get createdAtColumn(){
        return null;
    }
    static get updatedAtColumn(){
        return null;
    }
    teacher(){
        return this.belongsTo('App/Models/Teacher')
    }
    students(){
        return this
        .belongsToMany('App/Models/Students')
        .pivotModel('App/Models/Enrollment')
    }
    enrollments(){
        return this.hasMany('App/Models/Enrollment')
    }
}

module.exports = Subject
