import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

// Singleton pattern — hot reload-এ নতুন connection হবে না
const getClient = () => {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(process.env.MONGODB_URI);
      global._mongoClient.connect();
    }
    return global._mongoClient;
  }
  // Production
  if (!getClient._instance) {
    getClient._instance = new MongoClient(process.env.MONGODB_URI);
    getClient._instance.connect();
  }
  return getClient._instance;
};

const client = getClient();
const db = client.db("Tutor-Booking-System");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  plugins: [jwt()],
});