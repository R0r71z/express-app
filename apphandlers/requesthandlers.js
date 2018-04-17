const fs = require('fs');
const {IDfy} = require('./helpers');

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
      if (_id) {
        const context = {
          post: JSON.parse(data)[_id]
        }
        // If _id is valid or exists
        if (context.post) {
          return result.render('singlepostview.liquid', context);
        }
      }
      const context = {
        posts: JSON.parse(data)
      }
      return result.render('postsview.liquid', context);
    });
  }

  static post(request, result) {
    var _id = request.body.id;
    var _action = request.body.action;
    fs.readFile('./posts.json', function(err, data) {
      var src = JSON.parse(data);
      if (err) throw err;

      switch (_action) {
        case 'save':
          var new_title = request.body.title;
          var new_content = request.body.content;
          src[_id].title = new_title;
          src[_id].content = new_content;
          break;
        case 'delete':
          delete src[_id];
          break;
        case 'create':
          _id = IDfy(src);
          var title = request.body.title;
          var content = request.body.content;
          src[_id] = {
            title: title,
            content: content,
            id: _id
          }
      }
      fs.writeFile('./posts.json', JSON.stringify(src), 'utf8', function(err) {
        if(err) throw err;
        result.send({id: _id});
      })
    })
    return 0;
  }
};

module.exports = {MainHandler, AdminPageHandler, TestHandler, PostHandler};
