'use strict'
const Database = use('Database')

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.` }

    return {}

}


class SubjectController {
    async index() {
        const subjects = await Database.table('subjects')
        return { status: 200, error: undefined, data: subjects }
    }
    async show({ request }) {
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error)
            return { status: 500, error: validatedValue.error, data: undefined }





        const students = await Database
            .select('*')
            .from('subjects')
            .where('subject_id','title','teacher_id')
            .first()

        //0,"",null,false,undefind
        return { status: 200, error: undefined, data: subjects || {} }
    }
    async store({ request }) {
        const { subject_id, title, teacher_id } = request.body

        const missingKeys = []
        if (!subject_id) missingKeys.push('subject_id')
        if (!title) missingKeys.push('title')


        if (missingKeys.length)
            return { status: 422, error: `${missingKeys} is missing`, data: undefined }

        const subjects = await Database.table('subjects').insert({ subject_id, title, teacher_id})
        return { status: 200, error: undefined, data: { subject_id, title, teacher_id } }
    }
    async showTeacher({ request }){
        const { id } = request.params
        const subject = await Database
        .table('subjects')
        .where({subject_id:id})
        .innerJoin('teachers','subjects.teacher_id','teachers.teacher_id')
        .first()

        return {status: 200, error: undefined, data: subject || {}}
    }
}

module.exports = SubjectController
