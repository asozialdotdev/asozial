import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import authConfig from "../auth.config";
import { baseUrl } from "@/constants";
import axios from "axios";
import { redirect } from "next/navigation";
import github from "next-auth/providers/github";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GITGUB_CLIENT_ID or GITHUB_CLIENT_SECRET");
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const db = client.db();

      const existingUser = await db
        .collection("User")
        .findOne({ email: user.email });

      if (!existingUser) {
        try {
          //create user in database
          const newUser = {
            name: profile?.name,
            email: profile?.email,
            notificationEmail: profile?.notificationEmail,
            image: profile?.avatarUrl,
            githubId: profile?.id,
            githubNodeId: profile?.node_id,
            bio: profile?.bio,
            username: profile?.login,
            company: profile?.company,
            hireable: profile?.hireable,
            blog: profile?.blog,
            twitterUsername: profile?.twitter_username,
            location: profile?.location,
            githubApiUrl: profile?.url,
            githubFollowersUrl: profile?.followers_url,
            githubFollowingUrl: profile?.following_url,
            githubPublicGistsUrl: profile?.gists_url,
            githubPrivateGistsNumber: profile?.private_gists,
            githubStarredUrl: profile?.starred_url,
            githubSubscriptionsUrl: profile?.subscriptions_url,
            githubOrganizationsUrl: profile?.organizations_url,
            githubReposUrl: profile?.repos_url,
            githubPublicReposNumber: profile?.public_repos,
            githubPublicGistsNumber: profile?.public_gists,
            githubCreatedAt: profile?.created_at,
            githubUpdatedAt: profile?.updated_at,
            githubCollaboratorsNumber: profile?.collaborators,
          };
          const response = await axios.post(`${baseUrl}/api/auth`, newUser);

          user.id = response.data._id; // Assign the custom user ID to NextAuth's user object
        } catch (error) {
          console.error("Error creating user in database", error);
          return false;
        }
      } else {
        // update user information if they already exist
        await db.collection("User").updateOne(
          { email: user.email },
          {
            $set: {
              name: user.name,
              image: user.image,
              updatedAt: new Date(),
            },
          },
        );
        user.id = existingUser._id.toString();
      }

      return true;
    },
    async session({ session, user, token }) {
      // Attach the user's ID to the session object
      if (session && token) {
        session.user.id = token.sub ?? "";
      }
      console.log("Session>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", session);
      return session;
    },
    async jwt({ token, user }) {
      // Add the user ID to the token for session callback
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url === "/" || url === baseUrl) {
        return `${baseUrl}/dashboard`;
      }
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
});
