import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./lib/db";
import authConfig from "../auth.config";
import { baseUrl } from "@/constants";
import axios from "axios";
import type { User } from "@/types/User";
import {
  getUserGithubFollowers,
  getUserGithubFollowing,
  getUserGithubSubscriptions,
  getUserGithubPublicGists,
  getUserGithubOrganizations,
  getUserGithubRepos,
  getUserGithubRepoLanguages,
} from "@/actions/users.server";
import { GithubUser } from "./types/Github";

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
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const db = client.db();

      const existingUser = await db
        .collection("User")
        .findOne({ email: user.email });

      if (!existingUser) {
        try {
          const newUser = {
            username: profile?.login,
            name: user?.name,
            email: user?.email,
            notificationEmail: profile?.notification_email,
            image: profile?.avatar_url,
            company: profile?.company,
            website: profile?.blog,
            location: profile?.location,
            hireable: profile?.hireable,
            //codingLanguages: githubRepoLanguages,
            socials: [
              profile?.twitter_username && {
                platform: "twitter",
                url: profile?.twitter_username,
              },
            ],
            github: {
              id: profile?.id,
              nodeId: profile?.node_id,
              username: profile?.login,
              bio: profile?.bio,
              apiUrl: profile?.url,
              followersUrl: profile?.followers_url,
              //followers: githubFollowers,
              followersNumber: profile?.followers,
              followingUrl: profile?.following_url,
              //following: githubFollowing,
              followingNumber: profile?.following,
              publicGistsUrl: profile?.gists_url,
              //publicGists: githubPublicGists,
              publicGistsNumber: profile?.public_gists,
              privateGistsNumber: profile?.private_gists,
              starredUrl: profile?.starred_url,
              subscriptionsUrl: profile?.subscriptions_url,
              //subscriptions: githubSubscriptions,
              //subscriptionsNumber: githubSubscriptions.length,
              organizationsUrl: profile?.organizations_url,
              //organizations: githubOrganizations,
              //organizationsNumber: githubOrganizations.length,
              reposUrl: profile?.repos_url,
              //publicRepos: githubRepos,
              publicReposNumber: profile?.public_repos,
              createdAt: profile?.created_at,
              updatedAt: profile?.updated_at,
              collaboratorsNumber: profile?.collaborators,
            },
          };
          console.log("newUser", newUser);
          const response = await axios.post(`${baseUrl}/api/auth`, newUser, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("response", response.data);

          //**ONCE ACCESS TOKEN GIVEN BY GITHUB, DO THE API CALLS HERE */
          //make separate api calls to get user details before creation in db
          // **TIMING OUT DUE TO TOO MANY API CALLS**
          // const githubFollowers = await getUserGithubFollowers(
          //   profile?.followers_url as string,
          // );
          // console.log("githubFollowers", githubFollowers);
          // const githubFollowing = await getUserGithubFollowing(
          //   profile?.following_url as string,
          // );
          // console.log("githubFollowing", githubFollowing);
          // const githubSubscriptions = await getUserGithubSubscriptions(
          //   profile?.subscriptions_url as string,
          // );
          // console.log("githubSubscriptions", githubSubscriptions);
          // const githubPublicGists = await getUserGithubPublicGists(
          //   profile?.gists_url as string,
          // );
          // console.log("githubPublicGists", githubPublicGists);
          // const githubOrganizations = await getUserGithubOrganizations(
          //   profile?.organizations_url as string,
          // );
          // console.log("githubOrganizations", githubOrganizations);
          // const githubRepos = await getUserGithubRepos(
          //   profile?.repos_url as string,
          // );
          // console.log("githubRepos", githubRepos);
          // const githubRepoLanguages =
          //   await getUserGithubRepoLanguages(githubRepos);
          // console.log("githubRepoLanguages", githubRepoLanguages);

          user.id = response.data._id; // Assign the custom user ID to NextAuth's user object
          //** ADD THE ACCESS TOKEN TO THE USER  */ */
        } catch (error: any) {
          console.log("Error creating user in database", error.message);
          return false;
        }
      } else {
        // update user information if they already exist
        //Benjamin: add users github followers, following, subscriptions, organizations, repos, tech stack
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
    async jwt({ token, account, profile }) {
      // Add the user ID to the token for session callback
      if (account) {
        token.githubAccessToken = account.access_token;
        token.githubId = profile?.id;
        token.githubUsername = profile?.login;
      }
      return token;
    },
    async session({
      session,
      user,
      token,
    }: {
      session: any;
      user: any;
      token: any;
    }) {
      console.log("session", session);
      console.log("user", user);
      console.log("token", token);
      // Attach the user's ID to the session object
      if (session && token) {
        session.user.id = token.sub ?? "";
        session.user.githubId = token.githubId;
        session.user.githubUsername = token.githubUsername;
        session.user.githubAccessToken = token.githubAccessToken;
      }

      return session;
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
