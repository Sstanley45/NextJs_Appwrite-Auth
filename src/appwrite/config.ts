import conf from "@/conf/config";
import { Client, Account, ID } from "appwrite";

//create types (Ts) for the creation of the user and login.

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

//create an instance of the Client. The client helps in connecting the next-app to appwrite.

const appwriteClient = new Client();

appwriteClient.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

//also instanciate Account and pass the appwriteClient as an arg
//ecport it because we'll need it in various files..

export const account = new Account(appwriteClient);

//hitesh recommends creating a class because it does a lot of jobs e.g creating lots of async methods responsible for creating user account,
//logging in and out of the user..etc this will help because in future we will just have have to call the methods.

//create a class

export class AppwriteService {
  //create a new record of user appwrite..
  async createUserAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error: any) {
      throw error;
    }
  }

  //Login function
  async login({ email, password }: LoginUserAccount) {
    try {
      return await account.createEmailSession(email, password);
    } catch (error: any) {
      throw error;
    }
  }

  //Check if user is Logged in
  async isLoggedIn(): Promise<boolean> {
    try {
      //here we'll use the getCurrentUser method in our class
      const user = await this.getCurrentUser();
      return Boolean(user); //simply as saying if user is present return true otherwise return false.
    } catch (error) {
      //no need of using catch coz we eventually return false
    }
    return false;
  }

  //getCurrent user
  async getCurrentUser() {
    try {
      return account.get();
    } catch (error) {
      console.log("error while getting Current User", error);
    }
    return null;
  }

  //log out
  async logout() {
    try {
      return await account.deleteSession("current");
    } catch (error) {
      console.log("error logging out", error);
    }
  }
}

//now that's it. we now now need to export the class so as to instanciate it where it'll be used,
//BUT its better to create an object here then export the object instead, that will make life easy

const appwriteService = new AppwriteService();
export default appwriteService;
