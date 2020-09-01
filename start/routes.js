'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {

  //api rout start here
  Route.resource('/teachers','TeacherController')

  // Route.get('/teachers','TeacherController.index')
  // Route.get('/teachers/:id','TeacherController.show')
  // Route.post('/teachers','TeacherController.store')
  // Route.put('/teachers/:id','TeacherController.update')
  // Route.patch('/teachers/:id','TeacherController.update')
  // Route.delete('/teachers/:id', 'TeacherController.destroy')

  Route.resource('/students', 'StudentController')

  // Route.get('/students', 'StudedntController.index')
  // Route.get('/students/:id', 'StudentController.show')
  // Route.post('/students', 'StudentController.store')

  Route.resource('/groups', 'GroupController')

  // Route.get('/groups', 'GroupController.index')
  // Route.get('/groups/:id', 'GroupController.show')
  // Route.post('/groups', 'GroupController.store')
  Route.resource('/enrollment','EnrollmentController')
  Route.resource('/subjects','SubjectController')
  Route.get('/subjects/:id/teacher','SubjectController.showTeacher')

}).prefix('api/v1')