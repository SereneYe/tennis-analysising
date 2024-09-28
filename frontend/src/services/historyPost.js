let getAuth,
  auth,
  getFirestore,
  firestore,
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  limit,
  orderBy;

const importFirestoreFunctions = async () => {
  const appModule = await import("../../App");
  const firestoreModule = await import("firebase/firestore");
  app = appModule.default;
  getFirestore = firestoreModule.getFirestore;
  firestore = getFirestore(app);
  doc = firestoreModule.doc;
  setDoc = firestoreModule.setDoc;
  updateDoc = firestoreModule.updateDoc;
  deleteDoc = firestoreModule.deleteDoc;
  collection = firestoreModule.collection;
  getDocs = firestoreModule.getDocs;
  query = firestoreModule.query;
  where = firestoreModule.where;
  orderBy = firestoreModule.orderBy;
  limit = firestoreModule.limit;
};

const importAuthFunctions = async () => {
  const authModule = await import("firebase/auth");
  getAuth = authModule.getAuth;
  auth = getAuth();
};

const initializeFirebase = async () => {
  importAuthFunctions();
  importFirestoreFunctions();
};

initializeFirebase();

export const fetchCurrentPost = async () => {
  await importFirestoreFunctions();
  try {
    const userId = auth.currentUser.uid;
    //TODO: fetch current user posts

    const rawVideoCollection = collection(firestore, "raw-video");
    const q = query(
      rawVideoCollection,
      where("user_id", "==", userId),
      orderBy("create_at", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    // Process the results
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return { success: true, data: posts };
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return { success: false, error };
  }
};

export const fetchPostDetails = async (itemId) => {
  await importFirestoreFunctions();

  //TODO: fetch posts by video_id
  try {
    const rawVideoCollection = collection(firestore, "raw-video");
    const q = query(rawVideoCollection, where("video_id", "==", itemId));
    const querySnapshot = await getDocs(q);

    let post = null;
    querySnapshot.forEach((doc) => {
      post = {
        id: doc.id,
        ...doc.data(),
      };
    });

    return { success: true, data: post }; // Return the single post or null
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return { success: false, error };
  }
};

export const deletePostDetails = async (itemId) => {
  await importFirestoreFunctions();
  console.log("deletePostDetails: ", itemId);

  try {
    const rawVideoCollection = collection(firestore, "raw-video");
    const docRef = doc(rawVideoCollection, itemId);

    await deleteDoc(docRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting posts: ", error);
    return { success: false, error };
  }
};
