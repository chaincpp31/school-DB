'use strict'

const Database = use("Database");
const Validator = use("Validator");
const Group = use("App/Models/Group");

function numberTypeParamValidator(number) {
    if (Number.isNaN(parseInt(number))) {
        return {
            error: `param: '${number}' is not supported, please use param as a number.`,
        };
    }

    return {};
}

class GroupController {
    async index({ request }) {
        const { references } = request.qs;
        const groups = Group.query();

        if (references) {
            const extractedReferences = references.split(",");
            groups.with(extractedReferences);
        }

        return { status: 200, error: undefined, data: await groups.fetch() };
    }

    async show({ request }) {
        const { id } = request.params;

        const validatedValue = numberTypeParamValidator(id);

        if (validatedValue.error)
            return { status: 500, error: validatedValue.error, data: undefined };

        const group = await Group.find(id);

        return { status: 200, error: undefined, data: group || {} };
    }

    async store({ request }) {
        const { name } = request.body;

        const rules = {
            name: "required|unique:groups,name",
        };

        const validation = await Validator.validateAll(request.body, rules);

        if (validation.fails())
            return { status: 422, error: validation.messages(), data: undefined };

        const group = new Group();
        group.name = name;

        await group.save();

        return { status: 200, error: undefined, data: group };
    }

    async update({ request }) {
        const { body, params } = request;

        const { id } = params;

        const { name } = body;

        const group = await Group.find(id);

        group.merge({ name });

        await group.save();

        return {
            status: 200,
            error: undefined,
            data: group,
        };
    }

    async destroy({ request }) {
        const { id } = request.params;

        await Database.table("groups").where({ group_id: id }).delete();

        return { status: 200, error: undefined, data: { message: "success" } };
    }
}


// const Database = use('Database')


// class GroupController {
//     async index() {
//         const groups = await Database.table('groups')
//         return { status: 200, error: undefined, data: groups }
//     }
//     async show({ request }) {
//         const { id } = request.params

//         const validatedValue = numberTypeParamValidator(id)

//         if (validatedValue.error)
//             return { status: 500, error: validatedValue.error, data: undefined }





//         const groups = await Database
//             .select('*')
//             .from('groups')
//             .where('name','id')
//             .first()

//         //0,"",null,false,undefind
//         return { status: 200, error: undefined, data: groups || {} }
//     }
//     async store({ request }) {
//         const { name,id } = request.body

//         const missingKeys = []
//         if (!name) missingKeys.push('name')
       

//         if (missingKeys.length)
//             return { status: 422, error: `${missingKeys} is missing`, data: undefined }



//         const groups = await Database.table('groups').insert({ name })
//         return { status: 200, error: undefined, data: { name } }
//     }
// }

module.exports = GroupController
