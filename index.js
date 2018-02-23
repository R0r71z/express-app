const methodMapper = require('./apphandlers/httpmapper')
const app = methodMapper(require('./apphandlers/customapp'))
app.Start();
