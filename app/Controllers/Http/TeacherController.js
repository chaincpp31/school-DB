'use strict'


const Database = use("Database");
const Hash = use("Hash");
const Validator = use("Validator");
const Teacher = use("App/Models/Teacher");

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number))) {
        return {
            error: `param: '${number}' is not supported, please use param as a number.`,
        };
    }

    return {};
}

class TeacherController {
    async index({ request }) {
        const { references } = request.qs;
        const teachers = Teacher.query();

        if (references) {
            const extractedReferences = references.split(",");
            teachers.with(extractedReferences);
        }

        return { status: 200, error: undefined, data: await teachers.fetch() };
    }

    async show({ request }) {
        const { id } = request.params;

        const validatedValue = numberTypeParamValidator(id);

        if (validatedValue.error)
            return { status: 500, error: validatedValue.error, data: undefined };

        const teacher = await Teacher.find(id);

        return { status: 200, error: undefined, data: teacher || {} };
    }

    async store({ request }) {
        const { first_name, last_name, email, password } = request.body;

        const rules = {
            first_name: "required",
            last_name: "required",
            email: "required|email|unique:teachers,email",
            password: "required|min:8"
        };

        const validation = await Validator.validateAll(request.body, rules);

        if (validation.fails())
            return { status: 422, error: validation.messages(), data: undefined };

        // const hashedPassword = await Hash.make(password);

        const teacher = new Teacher();
        teacher.first_name = first_name;
        teacher.last_name = last_name;
        teacher.email = email;
        teacher.password = password;

        await teacher.save();

        return {
            status: 200,
            error: undefined,
            data: teacher,
        };
    }

    async update({ request }) {
        const { body, params } = request;

        const { id } = params;

        const { first_name, last_name, email } = body;

        const teacher = await Teacher.find(id);

        teacher.merge({ first_name, last_name, email });

        await teacher.save();

        return {
            status: 200,
            error: undefined,
            data: teacher,
        };
    }

    async destroy({ request }) {
        const { id } = request.params;

        await Database.table("teachers").where({ teacher_id: id }).delete();

        return { status: 200, error: undefined, data: { message: "success" } };
    }
}





// const Database = use('Database')
// const Enrollment = use('App/Models/Enrollment')
// const Hash = use('Hash')
// const Validator = use('Validator')

// function numberTypeParamValidator(number){
//     if (Number.isNaN(parseInt(number)))
//         return { error: `param: ${number} is not supported, please use number type param instead.`} 

//         return {}

// }

// class TeacherController {
//     async index (request){
//         const teachers = await Database.table('teachers')
//         return { status: 200, error: undefined, data: teachers}
//     }
//     async show ({ request }){
//         const { id } = request.params

//         const validatedValue = numberTypeParamValidator(id)

//         if(validatedValue.error) 
//         return {status: 500, error: validatedValue.error, data: undefined}


    


//         const teachers = await Database
//         .select('*')
//         .from('teachers')
//         .where('teacher_id',id)
//         .first()

//         //0,"",null,false,undefind
//         return  {status: 200, error: undefined, data: teachers || {} }
//     }
//     async store ({ request }) {
//         const { first_name, last_name, email, password } = request.body

//         const rules = {
//             first_name:'required',
//             last_nAME:'required',
//             email:'required|email|unique:teachers,email',
//             password:'required|min:8'
//         }
//         const validation = await Validator.validate(request.body, rules)

//         if(validation.fails())
//         return{ status: 422, error: validation.messages() , data: undefined}
        
//         // const missingKeys = []
//         // if (!first_name) missingKeys.push('first_name')
//         // if (!last_name) missingKeys.push('last_name')
//         // if (!email) missingKeys.push('email')
//         // if (!password) missingKeys.push('password')

//         // if (missingKeys.length)
//         // return {status: 422, error: `${missingKeys} is missing`, data: undefined}



//         const hashedPassword = await Hash.make(password)

//         const teachers = await Database.table('teachers').insert({ first_name, last_name, email, password: hashedPassword })
//         return {status: 200, error: undefined, data:{first_name, last_name, email}}
//     }

//     async update({ request }){
//         const {body, params} = request
//         const { id: teacher_id } = params
//         const { first_name,last_name,email } = body

//         const teacherId = await Database
//         .table('teachers')
//         .where({id: teacher_id})
//         .update({ first_name, last_name, email})

//         const teacher = await Database
//         .table('teachers')
//         .where({teacher_id: teacherId})
//         .first()

//         return {status: 200, error: undefined, data: teacher}
//     }
//     async destroy({ request }){
//         const {id} = request.params

//         await Database
//         .table('teachers')
//         .where({ id })
//         .delete()

//         return {status: 200, error: undefined, data: {message: 'success'}}
//     }
// }

module.exports = TeacherController
