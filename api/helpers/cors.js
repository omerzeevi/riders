exports.originCorsAccess = (app) => {
  app.all('*',  (req, res, next) => {
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, x-auth-token');
    next();
  });
}