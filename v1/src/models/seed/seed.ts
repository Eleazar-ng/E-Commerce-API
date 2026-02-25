import mongoose from "mongoose";
import { env } from "../../config/env";
import { Admin } from "../Admin";
import { Account } from "../Account";

//Connect to db
mongoose.connect(env.DATABASE_URL)
.then(() => {
  console.log('\x1b[32m' + '\nConnected to MongoDB successfully!' + '\x1b[0m')
})
.catch((err) => {
  console.log('\x1b[31m' + '\nFailed to connect to MongoDB' + '\x1b[0m')
  console.error('\x1b[41m' + `Error connecting to MongoDB:`, err);
  console.log('\x1b[0m')
})

const superAdmin = {
  firstName: "Super",
  lastName: "Admin",
  email: "sa@email.com",
  password: "Allidoiswin01#",
  isSuperAdmin: true
}

const seedDB = async () => {
  try {
    const existingAccount = await Account.findOne({email: superAdmin.email});
    if(existingAccount){
      console.log("Super Admin account already exists!")
    }else {
      const admin = new Admin({
        ...superAdmin
      })

      await admin.save();
      console.log("Admin data seeded successfully!");
    }

    await mongoose.disconnect();
    console.log('\x1b[32m' + '\nMongoDB disconnected successfully!' + '\x1b[0m')
  } catch (error) {
    console.error("Error seeding database", error)
  }
}

seedDB();