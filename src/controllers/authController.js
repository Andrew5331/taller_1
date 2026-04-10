import jwt from 'jsonwebtoken';

// Simulated users database
// In a real project this would be a database query
const USERS = [
  { id: 1, username: 'admin', password: 'admin123', role: 'ADMIN' },
  { id: 2, username: 'user',  password: 'user123',  role: 'USER'  },
];

/**
 * POST /login
 *
 * Body: { username, password }
 *
 * [200] { token: "eyJ..." }   — valid credentials
 * [400] { message: "..." }    — invalid credentials
 */
export const login = (req, res) => {
  const { username, password } = req.body;

  // Find a user whose username AND password match
  const found = USERS.find(
    (u) => u.username === username && u.password === password
  );

  // If no match, respond with 400
  if (!found) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Sign a JWT with the user's id, username, and role
  // JWT_SECRET comes from environment variables — never hardcoded
  const token = jwt.sign(
    { id: found.id, username: found.username, role: found.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Return the token with 200
  return res.status(200).json({ token });
};
