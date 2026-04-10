/**
 * POST /request
 *
 * Requires a valid JWT in the Authorization header (Bearer token).
 * The authMiddleware already verified the token and attached req.user.
 *
 * Role-based responses:
 * [200] { message: "Hi from ADMIN" }              — role === 'ADMIN'
 * [200] { message: "Hi from USER" }               — role === 'USER'
 * [401] { message: "You're not allowed to do this" } — any other role
 */
export const handleRequest = (req, res) => {
  const { role } = req.user;

  if (role === 'ADMIN') {
    return res.status(200).json({ message: 'Hi from ADMIN' });
  }

  if (role === 'USER') {
    return res.status(200).json({ message: 'Hi from USER' });
  }

  // Any role not explicitly handled gets a 401
  return res.status(401).json({ message: "You're not allowed to do this" });
};
