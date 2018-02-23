const {MainHandler, AdminPageHandler, TestHandler, PostHandler} = require('./requesthandlers')

const methodMapper = function(app) {
  const handlers = {
    '/': MainHandler,
    '/admin': AdminPageHandler,
    '/test/:keycode': TestHandler,
    '/posts': PostHandler,
  }

  for (path in handlers) {
    app.App.get(path, handlers[path].get ? handlers[path].get : function(req, res) {return res.status(405).send('<h1>Method Get Not Defined</h1>')});
    app.App.post(path, handlers[path].post ? handlers[path].post : function(req, res) {return res.status(405).send('<h1>Method Post Not Defined</h1>')});
  }

  return app;
}

module.exports = methodMapper;
