const fs = require('fs');

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

class PostHandler {
  static get(request, result) {
    var _id = request.query.id;
    fs.readFile('./posts.json', function(err, data) {
      if (err) throw err;
      if (!_id) {
        const context = {
          posts: JSON.parse(data)
        }
        return result.render('postsview.liquid', context);
      } else {
        const context = {
          post: JSON.parse(data)[_id]
        }
        return result.render('singlepostview.liquid', context);
      }
    });
  }
}

module.exports = {MainHandler, AdminPageHandler, TestHandler, PostHandler};
