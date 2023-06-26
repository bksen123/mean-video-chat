const mongoose = require("mongoose");
exports.createDBConnection = () => {
  mongoose.Promise = global.Promise;
  // const connect = mongoose.connect("mongodb://0.0.0.0:27017/amw-meet-clone", {
  const connect = mongoose.connect("mongodb+srv://bharat:EqnwUpI5RVJufWTy@cluster0.i3fkd.mongodb.net/amw-zoom?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });
  return connect;
};
