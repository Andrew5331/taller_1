import jwt from 'jsonwebtoken';

/**
 * Authentication middleware
 *
 * Runs before every protected endpoint (e.g. POST /request).
 * Extracts the JWT from the Authorization header, verifies it,
 * and attaches the decoded payload to req.user so controllers can use it.
 *
 * Expected header format:
 *   Authorization: Bearer <token>
 *
 * If the token is missing, malformed, or invalid → 401
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check that the header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "You're not allowed to do this" });
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret from environment variables
    // If invalid or expired, jwt.verify throws an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload { id, username, role } to the request
    req.user = decoded;

    // Pass control to the next middleware or controller
    next();
  } catch {
    return res.status(401).json({ message: "You're not allowed to do this" });
  }
};
