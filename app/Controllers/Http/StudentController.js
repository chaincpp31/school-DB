'use strict'

const Database = use("Database");
const Hash = use("Hash");
const Validator = use("Validator");
const Student = use("App/Models/Student");

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number))) {
        return {
            error: `param: '${number}' is not supported, please use param as a number.`,
        };
    }

    return {};
}

class StudentController {
    async index({ request }) {
        const { references } = request.qs;
        const students = Student.query();

        if (references) {
            const extractedReferences = references.split(",");
            students.with(extractedReferences);
        }

        return { status: 200, error: undefined, data: await students.fetch() };
    }

    async show({ request }) {
        const { id } = request.params;

        const validatedValue = numberTypeParamValidator(id);

        if (validatedValue.error)
            return { status: 500, error: validatedValue.error, data: undefined };

        const student = await Student.find(id);

        return { status: 200, error: undefined, data: student || {} };
    }

    async store({ request }) {
        const { first_name, last_name, email, password, group_id } = request.body;

        const rules = {
            first_name: "required",
            last_name: "required",
            email: "required|email|unique:students,email",
            password: "required|min:8",
            group_id: "required",
        };

        const validation = await Validator.validateAll(request.body, rules);

        if (validation.fails())
            return { status: 422, error: validation.messages(), data: undefined };

        const hashedPassword = await Hash.make(password);

        const student = new Student();
        student.first_name = first_name;
        student.last_name = last_name;
        student.email = email;
        student.password = hashedPassword;
        student.group_id = group_id;

        await student.save();

        return {
            status: 200,
            error: undefined,
            data: student,
        };
    }

    async update({ request }) {
        const { body, params } = request;

        const { id } = params;

        const { first_name, last_name, email, group_id } = body;

        const student = await Student.find(id);

        student.merge({ first_name, last_name, email, group_id });

        await student.save();

        return {
            status: 200,
            error: undefined,
            data: student,
        };
    }

    async destroy({ request }) {
        const { id } = request.params;

        await Database.table("students").where({ student_id: id }).delete();

        return { status: 200, error: undefined, data: { message: "success" } };
    }
}


// const Database = use('Database')
// const Hash = use('Hash')

// function numberTypeParamValidator(number) {
//     if (Number.isNaN(parseInt(number)))
//         return { error: `param: ${number} is not supported, please use number type param instead.` }

//     return {}

// }

// class StudentController {
//     async index() {
//         const students = await Database.table('students')
//         return { status: 200, error: undefined, data: students }
//     }
//     async show({ request }) {
//         const { id } = request.params

//         const validatedValue = numberTypeParamValidator(id)

//         if (validatedValue.error)
//             return { status: 500, error: validatedValue.error, data: undefined }





//         const students = await Database
//             .select('*')
//             .from('students')
//             .where('student_id', id)
//             .first()

//         //0,"",null,false,undefind
//         return { status: 200, error: undefined, data: students || {} }
//     }
//     async store({ request }) {
//         const { first_name, last_name, email, password } = request.body

//         const rules = {
//             first_name: 'required',
//             last_nAME: 'required',
//             email: 'required|email|unique:teachers,email',
//             password: 'required|min:8'
//         }
//         const validation = await Validator.validate(request.body, rules)

//         if (validation.fails())
//             return { status: 422, error: validation.messages(), data: undefined }

//         // const missingKeys = []
//         // if (!first_name) missingKeys.push('first_name')
//         // if (!last_name) missingKeys.push('last_name')
//         // if (!email) missingKeys.push('email')
//         // if (!password) missingKeys.push('password')

//         // if (missingKeys.length)
//         //     return { status: 422, error: `${missingKeys} is missing`, data: undefined }



//         const hashedPassword = await Hash.make(password)

//         const students = await Database.table('students').insert({ first_name, last_name, email, password: hashedPassword })
//         return { status: 200, error: undefined, data: { first_name, last_name, email } }
//     }
//     async update({ request }) {
//         const { body, params } = request
//         const { id } = params
//         const { first_name, last_name, email } = body

//         const teacherId = await Database
//             .table('students')
//             .where({ id })
//             .update({ first_name, last_name, email })

//         const student = await Database
//             .table('students')
//             .where({ id })
//             .first()

//         return { status: 200, error: undefined, data: student }
//     }
//     async destroy({ request }) {
//         const { id } = request.params

//         await Database
//             .table('students')
//             .where({ id })
//             .delete()

//         return { status: 200, error: undefined, data: { message: 'success' } }
//     }
// }

module.exports = StudentController
