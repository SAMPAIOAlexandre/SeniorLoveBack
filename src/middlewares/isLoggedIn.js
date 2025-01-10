import jwt from 'jsonwebtoken';

// Middleware to check if the user is logged in
// If the user is not logged in, return a 401 status code with a message
// If the user is logged in, continue to the next middleware (here, the controller wrapper before continuing to the controller)

// Initialize the isLoggedIn middleware
const isLoggedIn = async (req, res, next) => {
  // We must test Bearer before testing token.
  // Check if the authorization header is provided and starts with 'Bearer '
  // If not, null is returned
  const token = req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null;

  // If the token is not provided (null), return a 401 status code with a message
  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }
  
  // Check the token
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using the verify method, giving the token and the JWT_SECRET from the .env file

    // If calls are in controllers, just send the user id in the request
    // req.user.id will be used in the controllers to get the user id from the database
    req.userId = decoded.id; 
    next();

  } catch (error) {
    // If the token is invalid, return a 401 status code with a message
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export default isLoggedIn;