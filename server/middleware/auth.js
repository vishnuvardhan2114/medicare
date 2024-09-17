const jwt = require('jsonwebtoken');

// Authorization middleware
const auth = (allowedRoles) => (req, res, next) => {
  console.log('Authenticating user', allowedRoles, req.body);
  const token = req.header('x-auth-token');
console.log('Authenticating', token )
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
