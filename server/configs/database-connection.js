const Debug = require('debug')('server:mongo');
// const uri = `mongodb+srv://admin:admin@cluster0.ubyuw.mongodb.net/energy-monitoring-db?retryWrites=true&w=majority`;
const uri = `${_config[_config.node_env].db.host}://${_config[_config.node_env].db.username}:${_config[_config.node_env].db.password}@${_config[_config.node_env].db.cluster}/${_config[_config.node_env].db.name}?retryWrites=true&w=majority`;

const mongoose = require('mongoose');
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
const db = mongoose.connection;

// module.exports = function (eventEmitter) {
//     db.on('error', console.error.bind(console, 'Database connection error:'));
//     db.once('open', () => {
//         console.log("Database connected => ", `${_config[_config.node_env].db.name}`);
//         eventEmitter.emit('db-connected');
//     })
// }