const makeSubjectUtil = SubjectModel => {
    return {
        getAll: references => {
            const Subjects = SubjectModel.query()

            if(references){
                const extractedReference = references.split(",",
                Subjects.with(extractedReference))
            }
            return Subjects.fetch()
        },
        getById: references => {
            const subject = SubjectModel.query()

            if (references){
                const extractedReference = references.split(",",
                subject.with(extractedReference))
            }
            return subject.where('subject_id', subjectId).fetch()
        }
    }
}
// const Subject = use("App/Models/Subject")
// class SubjectUtil {
//     constructor(SubjectModel){
//         this._Subject = SubjectModel
//     }

//     async getAll(references){
//         const subjects = Subject.query()
//         if(references){
//             const extractedReference = references.split(",",
//             subjects.with(extractedReference))
//         }
//         return subjects.fetch()
//     }
//     getById (subjectId , references){
//         const subject = this._Subject.query()

//         if (references){
//             const extractedReference = references.split(",",
//             subject.with(extractedReference))
//         }
//         return subject.where('subject_id', subjectId).fetch()
//     }
// }
module.exports = SubjectUtil