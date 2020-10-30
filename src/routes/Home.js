import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService
      .collection("nweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const nweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNweets(nweetArray);
      });
  }, []);
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;

// import Nweet from 'components/Nweet';
// import { dbService, storageService } from 'fbase';
// import React, { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// //async는 비동기 처리를 하기 위해서 사용한다.
// const Home = ({ userObj }) => {
//     const [nweet, setNweet] = useState("");
//     const [nweets, setNweets] = useState([]);
//     const [attachment, setAttachment] = useState("");
//     // 구식의 방식
//     // const getNweets = async() =>{   
//     //     const dbNweets = await dbService.collection("nweets").get();
//     //     dbNweets.forEach((document) => {
//     //         const nweetObject ={
//     //             ...document.data(),
//     //             id:document.id,
//     //         };
//     //         setNweets((prev) =>[nweetObject, ...prev]);
//     //     });
//     // }

//     //스냅 샷은 우리가 가지고 있는 쿼리와 같은 것이다.
//     useEffect(() => {
//         dbService.collection("nweets").onSnapshot((snapshop) => {
//             const nweetArray = snapshop.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setNweets(nweetArray);
//         })
//     }, []);
//     const onSubmit = async (event) => {
//         event.preventDefault();
//         let attachmentUrl = "";
//         if (attachment !== "") {
//             const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
//             const response = await attachmentRef.putString(attachment, "data_url");
//             attachmentUrl = await response.ref.getDownloadURL();
//         }
//         const nweetObj = {
//             text: nweet,
//             createdAt: Date.now(),
//             creatorId: userObj.uid,
//             attachmentUrl,
//         }
//         await dbService.collection("nweets").add(nweetObj);
//         setNweet("");
//         setAttachment("");
//         // await dbService.collection("nweets").add({
//         //     text: nweet,
//         //     createdAt: Date.now(),
//         //     creatorId: userObj.uid,
//         // });
//         // setNweet("");
//     };
//     const onChange = (event) => {
//         const {
//             target: { value }
//         } = event;
//         setNweet(value);
//     }
//     const onFileChange = (event) => {
//         const {
//             target: { files },
//         } = event;
//         const theFile = files[0];
//         const reader = new FileReader();
//         reader.onloadend = (finishedEvent) => {
//             const {
//                 currentTarget: { result },
//             } = finishedEvent;
//             setAttachment(result);
//         }
//         reader.readAsDataURL(theFile);
//     }
//     const onClearAttachment = () => setAttachment(null)
//     return (
//         <div>
//             <form onSubmit={onSubmit}>
//                 <input
//                     value={nweet}
//                     onChange={onChange}
//                     type="text"
//                     placeholder="What's on your mind?"
//                     maxLength={120}
//                 />
//                 <input type="file" accept="image/*" onChange={onFileChange} />
//                 <input type="submit" value="Nweet" />
//                 {attachment && (
//                     <div>
//                         <img src={attachment} width="50px" height="50px" />
//                         <button onClick={onClearAttachment}>Clear</button>
//                     </div>
//                 )}
//             </form>
//             <div>
//                 {nweets.map((nweet) => (
//                     <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
//                 ))}
//             </div>
//         </div>
//     )
// }
// export default Home;