class MainHandler {
  static get(request, result) {
    var context = {a: '', b: ''};
    return result.render('homeview.liquid', context);
  }

  static post(request, result) {
    return result.redirect('/admin');
  }
}

class AdminPageHandler {
  static get(request, result) {
    var context = {
      user: {
        username: 'Raddy',
        logged: true
      }
    }
    return result.render('adminview.liquid', context)
  }

  static post(request, result) {
    return result.redirect(request.body.page ? request.body.page : '/');
  }
}

class TestHandler {
  static get(request, result) {
    return result.render('testview.liquid', {testword: request.params.keycode})
  }
}

module.exports = {MainHandler, AdminPageHandler, TestHandler};
