import bcrypt from "bcrypt";
import { storage } from "./server/storage";

async function setupFirstAdmin() {
  try {
    const username = process.env.ADMIN_USERNAME || "admin";
    const email = process.env.ADMIN_EMAIL || "admin@neuralcoderai.com";
    const password = process.env.ADMIN_PASSWORD || "admin123"; // Change this!

    const existingAdmin = await storage.getAdminUserByUsername(username);
    
    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = await storage.createAdminUser({
      username,
      email,
      password: hashedPassword,
      role: "superadmin"
    });

    console.log("✓ Admin user created successfully!");
    console.log(`  Username: ${admin.username}`);
    console.log(`  Email: ${admin.email}`);
    console.log(`  Password: ${password}`);
    console.log("\n⚠️  Please change the password after first login!");
    console.log("\nYou can now login at: /admin/login");
    
  } catch (error) {
    console.error("Failed to create admin user:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

setupFirstAdmin();
