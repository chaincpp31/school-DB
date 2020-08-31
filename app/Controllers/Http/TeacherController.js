'use strict'

const Database = use('Database')
const Hash = use('Hash')

function numberTypeParamValidator(number){
    if (Number.isNaN(parseInt(number)))
        return { error: `param: ${number} is not supported, please use number type param instead.`} 

        return {}

}

class TeacherController {
    async index (){
        const teachers = await Database.table('teachers')
        return { status: 200, error: undefined, data: teachers}
    }
    async show ({ request }){
        const { id } = request.params

        const validatedValue = numberTypeParamValidator(id)

        if(validatedValue.error) 
        return {status: 500, error: validatedValue.error, data: undefined}


    


        const teachers = await Database
        .select('*')
        .from('teachers')
        .where('teacher_id',id)
        .first()

        //0,"",null,false,undefind
        return  {status: 200, error: undefined, data: teachers || {} }
    }
    async store ({ request }) {
        const { first_name, last_name, email, password } = request.body
        
        const missingKeys = []
        if (!first_name) missingKeys.push('first_name')
        if (!last_name) missingKeys.push('last_name')
        if (!email) missingKeys.push('email')
        if (!password) missingKeys.push('password')

        if (missingKeys.length)
        return {status: 422, error: `${missingKeys} is missing`, data: undefined}



        const hashedPassword = await Hash.make(password)

        const teachers = await Database.table('teachers').insert({ first_name, last_name, email, password: hashedPassword })
        return {status: 200, error: undefined, data:{first_name, last_name, email}}
    }
}

module.exports = TeacherController
