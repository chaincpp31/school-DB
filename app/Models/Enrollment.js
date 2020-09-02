'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Enrollment extends Model {
    static get createdAtColumn() {
        return null;
    }
    static get updatedAtColumn() {
        return null;
    }
    teacher() {
        return this.belongsTo('App/Models/Enrollment')
    }
}


module.exports = Enrollment
