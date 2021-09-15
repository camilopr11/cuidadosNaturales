import 'regenerator-runtime/runtime'
const app = require('./app');

const server = app.listen(3000, function(){
    console.log('Server listening on: http://localhost:3000');
}); 

module.exports = server;