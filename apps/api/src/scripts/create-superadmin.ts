import mongoose from 'mongoose';
import { env } from '../config/env.config.js';
import { UserModel } from '../models/user.model.js';
import { hashPassword } from '../utils/auth.js';

/**
 * Creates (or updates) an admin/staff account in MongoDB.
 *
 * Usage:
 *   bun run admin:create
 *   MONGODB_URI=... ADMIN_EMAIL=x ADMIN_PASSWORD=y bun run admin:create
 *
 * Reads from env (or defaults) so it works the same against local Mongo and MongoDB Atlas.
 */
async function createSuperAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@meghpiyon.com').toLowerCase().trim();
  const phone = process.env.ADMIN_PHONE || '01700000000';
  const name = process.env.ADMIN_NAME || 'Meghpiyon Super Admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const role = (process.env.ADMIN_ROLE || 'admin') as 'admin' | 'employee' | 'moderator';

  try {
    console.log('Connecting to MongoDB at:', env.MONGODB_URI);
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB successfully.');

    const passwordHash = hashPassword(password);
    const user = await UserModel.findOneAndUpdate(
      { email },
      { $set: { email, phone, name, passwordHash, role } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`\n✅ ${role} account ready:`);
    console.log(`   Email   : ${user.email}`);
    console.log(`   Phone   : ${user.phone}`);
    console.log(`   Name    : ${user.name}`);
    console.log(`   Role    : ${user.role}`);
    console.log(`   Password: ${password}`);
    console.log('\nYou can now sign in on the admin portal (/admin).');
  } catch (error) {
    console.error('Error creating admin account:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

createSuperAdmin();