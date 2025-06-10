import express from 'express'
import dotenv from 'dotenv'
import auth from 'json-server-auth'
import cors from 'cors'
import jsonServer from 'json-server'
import path from 'path'


dotenv.config();

const app = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// Set up the database
app.db = router.db;

// Apply middleware
app.use(cors());
app.use(express.json());

// Set up json-server-auth
const rules = auth.rewriter({
  // Allow public access to login and register
  '/login': 200,
  '/register': 200,
  // Protect user routes
  '/users*': 600,
  // Protect other routes as needed
  '/books*': 600,
  '/loans*': 600
});

// Apply auth rules and middleware
app.use(rules);
app.use(auth);

// Apply json-server router
app.use(router);

// Add a test route to verify the server is working
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('✅ Server running on port:', PORT);
  console.log('🔒 Auth endpoints:');
  console.log('   - POST /register');
  console.log('   - POST /login');
  console.log('   - GET /600/users');
})