import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';
export const appwriteConfig= {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.nassiri.checkpoint',
    projectId: '668069070009e6ffbaf0',
    databaseId: '66806bea0031a1b684da',
    userCollectionId: '66806c0700310ca35121',
    storageId: '66806cd50036f35b3770'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser= async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount) throw new Error;

        const avatarUrl = avatars.getInitials(username)

        await SignIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username,
                email,
                avatar: avatarUrl,
            }
        )
        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
    account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}

export async function SignIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

