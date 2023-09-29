import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: '3a6d2f3ab3a33a5035b6',
      clientSecret: '83500474d43673d536064083b7d562d03b903498',
    }),
  ],
  secret : 'secret2583pw',
  adapter : MongoDBAdapter()
};
export default NextAuth(authOptions); 