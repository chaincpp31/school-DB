'use strict'

const { test } = use('Test/Suite')('Teacher Validator')

const teacherValidator = require('../../services/TeacherValidator')


test('should return error when pass incorrect email', async({assert}) => {
  const validatedData = await teacherValidator("John","Doe","john@cmu.ac.th","12345678")
  assert.isOk(validatedData)

  const validatedData2 = await teacherValidator("John","Doe","wrong email","pass")
  assert.isNotOk(validatedData2)
})

test('should return',async({assert})=>{
  const validatedData = await teacherValidator("John","Dou","wrong email","12345")
  assert.isArray(validatedData.error)
})

// test('should return',async({assert})=>{
//   const validatedData = await teacherValidator("John","Dou","wrong email","12345")
//   assert.
// })


test('should return more than one error if multiple incorect data is pass', async ({assert})=>{
  const validatedData = await teacherValidator("John","Doe","john@cmu.ac.th","12345678")
  assert.isAbove(validatedData.error.legth, 1)
})

test('should return undefinded when pass correct data', async ({assert})=>{
  const validatedData = await teacherValidator("John","Doe","john@cmu.ac.th","12345678")
  assert.equal(validatedData.error,undefined)
})