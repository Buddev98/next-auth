import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if(req.method !== 'POST') {
    return;
  }

  const { email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: 'please enter valid email and password' });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email: email });
  if(existingUser) {
    res.status(422).json({ message: 'User exists already! '});
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = db
    .collection('users')
    .insertOne({ email: email, password: hashedPassword });

  res.status(201).json({ message: 'user created' });
  client.close();
}
