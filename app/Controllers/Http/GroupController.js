'use strict'
const Database = use('Database')


class GroupController {
    async index() {
        const groups = await Database.table('groups')
        return { status: 200, error: undefined, data: groups }
    }
    async show({ request }) {
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if (validatedValue.error)
            return { status: 500, error: validatedValue.error, data: undefined }





        const groups = await Database
            .select('*')
            .from('groups')
            .where('name','id')
            .first()

        //0,"",null,false,undefind
        return { status: 200, error: undefined, data: groups || {} }
    }
    async store({ request }) {
        const { name,id } = request.body

        const missingKeys = []
        if (!name) missingKeys.push('name')
       

        if (missingKeys.length)
            return { status: 422, error: `${missingKeys} is missing`, data: undefined }



        const groups = await Database.table('groups').insert({ name })
        return { status: 200, error: undefined, data: { name } }
    }
}

module.exports = GroupController
