'use strict'

const SubjectUtil = require("../../../Util/subjectUtil");


const Database = use("Database");
const Validator = use("Validator");
const Subject = use("App/Models/Subject");

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number))) {
        return {
            error: `param: '${number}' is not supported, please use param as a number.`,
        };
    }

    return {};
}

class SubjectController {
    async index({ request }) {
        const { references = undefined } = request.qs;

        const subjectUtil = new SubjectUtil()
        const subjects = await subjectUtil.getAll(references)

        // const subjects = Subject.query();

        // if (references) {
        //     const extractedReferences = references.split(",");
        //     subjects.with(extractedReferences);
        // }

        return { status: 200, error: undefined, data: await subjects.fetch() };
    }

    async show({ request }) {
        const { id } = request.params;
        const {references}=request.qs
        const subjectUtil = new SubjectUtil(Subject)
        const subject = subjectUtil.getById(id,references)

        const validatedValue = numberTypeParamValidator(id);

        // if (validatedValue.error)
        //     return { status: 500, error: validatedValue.error, data: undefined };

        // const subject = await Subject.find(id);

        return { status: 200, error: undefined, data: subject || {} };
    }

    async store({ request }) {
        const { title, teacher_id } = request.body;

        const rules = {
            title: "required",
            teacher_id: "required",
        };

        const validation = await Validator.validateAll(request.body, rules);

        if (validation.fails())
            return { status: 422, error: validation.messages(), data: undefined };

        const subject = new Subject();
        subject.title = title;
        subject.teacher_id = teacher_id;

        await subject.save();

        return { status: 200, error: undefined, data: subject };
    }

    async update({ request }) {
        const { body, params } = request;

        const { id } = params;

        const { title } = body;

        const subject = await Subject.find(id);

        subject.merge({ title });

        await subject.save();

        return {
            status: 200,
            error: undefined,
            data: subject,
        };
    }

    async destroy({ request }) {
        const { id } = request.params;

        await Database.table("subjects").where({ subject_id: id }).delete();

        return { status: 200, error: undefined, data: { message: "success" } };
    }
}


// const Database = use('Database')
// const Subject = use('App/Models/Subject')


// class SubjectController {
//     async index({ request }) {
//         const {references = undefined } = request.qs

//         const subjects = Subject.query()

//         if (references){
//             const extractedReferences = references.split(",")
//             subjects.with(extractedReferences)
//         // let subjects = await Subject.all()
//         //? /subjects?references=teachers
//         // console.log(queryString)
//         // const subjects = await Database.table('subjects')
//         }

//         return { status: 200, error: undefined, data: await subjects.fetch() }
//     }
//     async show({ request }) {
//         const { id } = request.params
//         const subject = await Subject.find(id)

//         // const validatedValue = numberTypeParamValidator(id)

//         // if (validatedValue.error)
//         //     return { status: 500, error: validatedValue.error, data: undefined }





//         // const students = await Database
//         //     .select('*')
//         //     .from('subjects')
//         //     .where('subject_id','title','teacher_id')
//         //     .first()

//         //0,"",null,false,undefind
//         return { status: 200, error: undefined, data: subjects || {} }
//     }
//     async store({ request }) {
//         const { subject_id, title, teacher_id } = request.body
//         // const subject = new Subject();
//         // subject.title = title;
//         // subject.teacher_id = teacher_id;
//         // await subject.save()
//         const subject = await Subject.create({title, teacher_id})

//         // const missingKeys = []
//         // if (!subject_id) missingKeys.push('subject_id')
//         // if (!title) missingKeys.push('title')


//         // if (missingKeys.length)
//         //     return { status: 422, error: `${missingKeys} is missing`, data: undefined }

//         // const subjects = await Database.table('subjects').insert({ subject_id, title, teacher_id})
//         return { status: 200, error: undefined, data: { subject_id, title, teacher_id } }
//     }
//     async showTeacher({ request }){
//         const { id } = request.params
//         const subject = await Database
//         .table('subjects')
//         .where({subject_id:id})
//         .innerJoin('teachers','subjects.teacher_id','teachers.teacher_id')
//         .first()

//         return {status: 200, error: undefined, data: subject || {}}
//     }
// }

module.exports = SubjectController
