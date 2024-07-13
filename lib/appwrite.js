import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.nassiri.checkpoint',
  projectId: '668069070009e6ffbaf0',
  databaseId: '66806bea0031a1b684da',
  userCollectionId: '66806c0700310ca35121',
  habitsCollectionId: '6691b1aa001a696791fc',
  addictCollectionId: '6691b1b40030b42fd930',
  streakCollectionId: '6691b1e00009b6cc52e4',
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Fetch Habits for Current User
export async function fetchHabits() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.habitsCollectionId,
      [Query.equal('accountId', currentUser.accountId)]
    );
    return response.documents.map(doc => ({ id: doc.$id, ...doc }));
  } catch (error) {
    throw new Error(error);
  }
}

// Fetch Addictions for Current User
export async function fetchAddictions() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.addictCollectionId,
      [Query.equal('accountId', currentUser.accountId)]
    );
    return response.documents.map(doc => ({ id: doc.$id, ...doc }));
  } catch (error) {
    throw new Error(error);
  }
}

// Create Habit
export async function createHabit(habit) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.habitsCollectionId,
      ID.unique(),
      { ...habit, accountId: currentUser.accountId }
    );
    return { id: response.$id, ...response };
  } catch (error) {
    throw new Error(error);
  }
}

// Create Addiction
export async function createAddiction(addiction) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.addictCollectionId,
      ID.unique(),
      { ...addiction, accountId: currentUser.accountId }
    );
    return { id: response.$id, ...response };
  } catch (error) {
    throw new Error(error);
  }
}

// Update Habit
export async function updateHabit(habitId, updates) {
  try {
    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.habitsCollectionId,
      habitId,
      updates
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// Update Addiction
export async function updateAddiction(addictionId, updates) {
  try {
    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.addictCollectionId,
      addictionId,
      updates
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// Delete Habit
export async function deleteHabit(habitId) {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.habitsCollectionId,
      habitId
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// Delete Addiction
export async function deleteAddiction(addictionId) {
  try {
    const response = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.addictCollectionId,
      addictionId
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// Update User Habit Count
export async function updateUserHabitCount(count) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentUser.$id,
      { habitCount: count }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// Update User Addiction Count
export async function updateUserAddictionCount(count) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw Error;

    const response = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      currentUser.$id,
      { addictionCount: count }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
