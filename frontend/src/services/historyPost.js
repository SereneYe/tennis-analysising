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
    // TODO: fetch current user posts
    const recordResponse = await getCurrentUserRecord(userId);
    if (recordResponse.success) {
      return { success: true, data: recordResponse.data.recordList };
    }
    //firebase logic
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

  //TODO: fetch posts by record_id
  const recordResponse = await getRecordDetail(itemId);
  if (recordResponse.success) {
    return { success: true, data: recordResponse.data };
  }

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

export const fetchSummaryDetails = async (summaryId) => {
  //TODO: fetch summary by each of the type name
  // try {
  //   const rawVideoCollection = collection(firestore, "raw-video");
  //   const q = query(rawVideoCollection, where("video_id", "==", itemId));
  //   const querySnapshot = await getDocs(q);

  //   let post = null;
  //   querySnapshot.forEach((doc) => {
  //     post = {
  //       id: doc.id,
  //       ...doc.data(),
  //     };
  //   });

  //   return { success: true, data: post }; // Return the single post or null
  // } catch (error) {
  //   console.error("Error fetching posts: ", error);
  //   return { success: false, error };
  // }

  console.log("fetchSummaryDetails: ", summaryId);
  return {
    success: true,
    data: {
      type: "Backhand",
      averageScore: 79,
      practiceTurns: 46,
      totalTime: 459,
      progress: 0.76,
      maxScore: 84,
      practiceTime: 459,
      performanceDetail: { excellent: 47, good: 40, fair: 16, poor: 3 },
      pastScore: [65, 87, 54, 77, 86, 78, 91, 92, 83, 87],
      summary1: "zsdjf dAWD AWDH zdsfgzdbf szfSDEE szbfddytj sdfbdsfb erfra",
      summary2:
        "adsgf zdfbvc vdsfz dfvzac gsdfvz dgfvbcx vfdrr zdfbxcva gxbdfv",
    },
  };
};

//////////////////////////////////////////////
// TODO: Mock data for testing
//////////////////////////////////////////////
async function getCurrentUserRecord(userId, reject) {
  // console.log("GET request started.");
  // try {
  //   let response = await fetch(
  //     "http://10.89.129.175:5001/add_videos_by_user_id",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   console.log("GET request finished.");

  //   if (!response.ok) {
  //     console.error("GET request failed.", response.status);
  //     reject();
  //   } else {
  //     const data = await response.json();
  //     resolve(data);
  //   }
  // } catch (error) {
  //   console.error("There was an error with fetch!", error);
  //   reject();
  // }

  return {
    success: true,
    data: {
      recordList: [
        {
          id: "12879t34gbrs-db5j",
          title: "Backhand Practice for 5 turns",
          recordScore: 79,
          recordType: "Backhand",
          recordTurns: 5,
          created_date: "2024-09-29 14:22:33",
          record_url:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
          video: [
            {
              processed_video_id: "13s245",
              video_url:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
              image_url1:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
              image_url2:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
              image_url3:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
              instruction1:
                "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
              instruction2:
                "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
              instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
            },
            {
              processed_video_id: "5436d7",
              video_url:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fa939c0ff-75da-411e-91dc-0935297071e2?alt=media&token=b24c6659-7612-4e5e-8acd-13a03f45534f",
              image_url1:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
              image_url2:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
              image_url3:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
              instruction1:
                "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
              instruction2:
                "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
              instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
            },
            {
              processed_video_id: "4567e3",
              video_url:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fbfbae445-fa8c-4a89-9957-858e791b9bc2?alt=media&token=ce557a32-ee3a-415a-8b41-ac68d20e69b7",
              image_url1:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
              image_url2:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
              image_url3:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
              instruction1:
                "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
              instruction2:
                "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
              instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
            },
          ],
        },
        {
          id: "dgxfserdgz4lkgbrs-db5",
          title: "Forehand Practice for 10 turns",
          recordScore: 88,
          recordType: "Backhand",
          recordTurns: 3,
          created_date: "2024-09-29 14:22:33",
          record_url:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
          video: [
            {
              processed_video_id: "1ui245",
              video_url:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
              image_url1:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
              image_url2:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
              image_url3:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
              instruction1:
                "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
              instruction2:
                "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
              instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
            },
            {
              processed_video_id: "54tf367",
              video_url:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fa939c0ff-75da-411e-91dc-0935297071e2?alt=media&token=b24c6659-7612-4e5e-8acd-13a03f45534f",
              image_url1:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
              image_url2:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
              image_url3:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
              instruction1:
                "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
              instruction2:
                "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
              instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
            },
            {
              processed_video_id: "45t673",
              video_url:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fbfbae445-fa8c-4a89-9957-858e791b9bc2?alt=media&token=ce557a32-ee3a-415a-8b41-ac68d20e69b7",
              image_url1:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
              image_url2:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
              image_url3:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
              instruction1:
                "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
              instruction2:
                "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
              instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
            },
          ],
        },
        {
          id: "1234g678brs-db5",
          title: "Forhand Practice for 3 turns",
          recordScore: 79,
          recordType: "Backhand",
          recordTurns: 5,
          created_date: "2024-09-29 14:22:33",
          record_url:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
          video: [
            {
              processed_video_id: "1386245",
              video_url:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
              image_url1:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
              image_url2:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
              image_url3:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
              instruction1:
                "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
              instruction2:
                "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
              instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
            },
            {
              processed_video_id: "54678367",
              video_url:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fa939c0ff-75da-411e-91dc-0935297071e2?alt=media&token=b24c6659-7612-4e5e-8acd-13a03f45534f",
              image_url1:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
              image_url2:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
              image_url3:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
              instruction1:
                "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
              instruction2:
                "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
              instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
            },
            {
              processed_video_id: "456jkh73",
              video_url:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fbfbae445-fa8c-4a89-9957-858e791b9bc2?alt=media&token=ce557a32-ee3a-415a-8b41-ac68d20e69b7",
              image_url1:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
              image_url2:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
              image_url3:
                "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
              instruction1:
                "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
              instruction2:
                "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
              instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
            },
          ],
        },
      ],
    },
  };
}

async function getRecordDetail(recordId, reject) {
  // console.log("GET request started.");
  // try {
  //   let response = await fetch(
  //     "http://10.89.129.175:5001/add_videos_by_user_id",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   console.log("GET request finished.");

  //   if (!response.ok) {
  //     console.error("GET request failed.", response.status);
  //     reject();
  //   } else {
  //     const data = await response.json();
  //     resolve(data);
  //   }
  // } catch (error) {
  //   console.error("There was an error with fetch!", error);
  //   reject();
  // }

  return {
    success: true,
    data: {
      recordId: "1234gbrs-db5",
      recordScore: 79,
      recordType: "Backhand",
      recordTurns: 5,
      correctTurns: 4,
      created_date: "2024-09-29 14:22:33",
      video: [
        {
          processed_video_id: "13245",
          video_url:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
          image_url1:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
          image_url2:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
          image_url3:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
          instruction1:
            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
          instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
          instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
        },
        {
          processed_video_id: "54367",
          video_url:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fa939c0ff-75da-411e-91dc-0935297071e2?alt=media&token=b24c6659-7612-4e5e-8acd-13a03f45534f",
          image_url1:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
          image_url2:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
          image_url3:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
          instruction1:
            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
          instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
          instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
        },
        {
          processed_video_id: "45673",
          video_url:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fbfbae445-fa8c-4a89-9957-858e791b9bc2?alt=media&token=ce557a32-ee3a-415a-8b41-ac68d20e69b7",
          image_url1:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
          image_url2:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
          image_url3:
            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
          instruction1:
            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
          instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
          instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
        },
      ],
    },
  };
}

async function deleteRecordDetail(recordId) {
  // try {
  //   let response = await fetch(
  //     "http://10.89.129.175:5001/add_videos_by_user_id",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   console.log("GET request finished.");

  //   if (!response.ok) {
  //     console.error("GET request failed.", response.status);
  //     reject();
  //   } else {
  //     const data = await response.json();
  //     resolve(data);
  //   }
  // } catch (error) {
  //   console.error("There was an error with fetch!", error);
  //   reject();
  // }

  return {
    success: true,
  };
}
