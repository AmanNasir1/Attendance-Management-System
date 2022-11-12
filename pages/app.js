import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, addDoc, query, where, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyCxCpLP7vdV4ik1P-c5ok6E6tsArTDACxo",
    authDomain: "smithackathon2022.firebaseapp.com",
    projectId: "smithackathon2022",
    storageBucket: "smithackathon2022.appspot.com",
    messagingSenderId: "267881097366",
    appId: "1:267881097366:web:6a6da309a50244d5607ab7"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// const storage = getStorage(app);



const login = document.querySelector("#login");
login?.addEventListener("click", () => {
    const email = document.querySelector("#admin-email");
    const password = document.querySelector("#admin-password")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("log in")
            window.location = "pages/panel.html"
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
})



window.onload = () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            showClassDetails()
            showStudent()
            // const q = query(collection(db, "class Details"));
            // const querySnapshot = await getDocs(q);
            // querySnapshot.forEach((doc) => {
            //     console.log(doc.id, " => ", doc.data());

            //     tableContent.innerHTML += `<tr>
            //         <td>${doc.data().class_time}</td>
            //         <td>${doc.data().schedule}</td>
            //         <td>${doc.data().teacher_name}</td>
            //         <td>${doc.data().course}</td>
            //         <td>${doc.data().section}</td>
            //         <td>${doc.data().batch}</td>
            //     </tr>`
            // });


        } else {
            console.log("Sign out")
        }
    });

}

const logOut = document.querySelector("#logout");
logOut?.addEventListener("click", () => {
    signOut(auth).then(() => {
        console.log("log out")
        window.location = "../index.html"
    }).catch((error) => {
        console.log(error)
    });

})

const submitBtn = document.getElementById("submitBtn");
if (submitBtn) {

    submitBtn.addEventListener("click", async () => {
        const time = document.querySelector("#classTime");
        const schedule = document.querySelector("#schedule")
        const teacher = document.querySelector("#teacher")
        const section = document.querySelector("#section")
        const course = document.querySelector("#course")
        const batch = document.querySelector("#batch")
        const docRef = await addDoc(collection(db, "class Details"), {
            class_time: time.value,
            schedule: schedule.value,
            teacher_name: teacher.value,
            section: section.value,
            course: course.value,
            batch: batch.value
        });
        console.log("Document written with ID: ", docRef.id);
        // showClassDetails()
        console.log("chlgya")

        window.location = "panel.html"
    });
}

// })


const showClassDetails = async () => {
    // const q = query(collection(db, "class Details"));

    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const cities = [];
    //         querySnapshot.forEach((doc) => {
    //             const tableContent = document.getElementById("tt")
    //             tableContent.innerHTML += `<tr>
    //                  <td>${doc.data().class_time}</td>
    //                  <td>${doc.data().schedule}</td>
    //                  <td>${doc.data().teacher_name}</td>
    //                  <td>${doc.data().course}</td>
    //                  <td>${doc.data().section}</td>
    //                  <td>${doc.data().batch}</td>
    //              </tr>`
    //         })
    //     })
    const a = query(collection(db, "class Details"));
    const querySnapshot = await getDocs(a);
    querySnapshot.forEach((doc) => {
        const tableContent = document.getElementById("tt")
        tableContent.innerHTML += `<tr>
        <td>${doc.data().course}</td>
        <td>${doc.data().teacher_name}</td>
        <td>${doc.data().schedule}</td>
        <td>${doc.data().class_time}</td>
        <td>${doc.data().batch}</td>
        <td>${doc.data().section}</td>
                 </tr>`
        // console.log(doc.id, " => ", doc.data());
    });


}

//  Changing Panel Menu

var btn1 = document.querySelector("#toggle1")
var btn2 = document.querySelector("#toggle2")
var btn3 = document.querySelector("#toggle3")
var btn4 = document.querySelector("#toggle4")

var div1 = document.querySelector("#createClass")
var div2 = document.querySelector("#addStudent")
var div3 = document.querySelector("#Attendance")
var div4 = document.querySelector("#StudentDetails")
btn1.addEventListener("click", () => {
    div1.classList.remove("switchClasses")
    div2.classList.add("switchClasses")
    div3.classList.add("switchClasses")
    div4.classList.add("switchClasses")


})
btn2.addEventListener("click", () => {
    div2.classList.remove("switchClasses")
    div1.classList.add("switchClasses")
    div3.classList.add("switchClasses")
    div4.classList.add("switchClasses")

})
btn3.addEventListener("click", () => {
    div1.classList.add("switchClasses")
    div2.classList.add("switchClasses")
    div3.classList.remove("switchClasses")
    div4.classList.add("switchClasses")

})
btn4.addEventListener("click", () => {
    div1.classList.add("switchClasses")
    div2.classList.add("switchClasses")
    div3.classList.add("switchClasses")
    div4.classList.remove("switchClasses")
})



//           Student Details


const studentSubmit = document.querySelector("#submitStudent")
studentSubmit.addEventListener("click", async () => {
    const studentName = document.querySelector("#studentName");
    const FatherName = document.querySelector("#Fname");
    const RollNumber = document.querySelector("#RollNumber");
    const ContactNumber = document.querySelector("#ContactNumber");
    const Cnic = document.querySelector("#Cnic");
    const select = document.querySelector("select");
    const fileLabel = document.querySelector("#fileInput");
    const fileInput = fileLabel.files[0]
    const url = await uploadFiles(fileInput)
    const docRef = await addDoc(collection(db, "Student Details"), {
        studentName: studentName.value,
        FatherName: FatherName.value,
        RollNumber: RollNumber.value,
        ContactNumber: ContactNumber.value,
        Cnic: Cnic.value,
        select: select.value,
        ProfilePicture: url
    });
    console
    // console.log(fileInput)
})




const uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage();
        const storageRef = ref(storage, `users/${Math.random()}png`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
                if (progress == 100) {
                    console.log("done")
                } else {


                }
            },
            (error) => {
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};


//  Attendance 


const searchbtn = document.querySelector("#searchStudentBtn")
searchbtn.addEventListener("click", async () => {
    const searchValue = document.querySelector("#searchStudent")
    const q = query(collection(db, "Student Details"), where("RollNumber", "==", searchValue.value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.data().studentName)
        const cardInfo = document.querySelector(".card-container")
        cardInfo.innerHTML = `<img class="round" src="${doc.data().ProfilePicture}"/>
        <div>
        <h4>Name: <span>${doc.data().studentName}</span></h4>
        <h4>Roll No: <span>${doc.data().RollNumber}</span></h4>
     </div>
     <div>
         <h5>Cnic: <span>${doc.data().Cnic}</span></h5>
         <h5>Phone Number: <span>${doc.data().ContactNumber}</span></h5>
     </div>
         <div class="course">
         <h3>${doc.data().select}</h3>
         </div>
     </div>`
        //     console.log(doc.id, " => ", doc.data());

    });

})

//  Student Details Info

const showStudent = async () => {
    const q = query(collection(db, "Student Details"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const tableContent = document.getElementById("studentDetailsTable")
        tableContent.innerHTML += `<tr>
                     <td>${doc.data().studentName}</td>
                     <td>${doc.data().FatherName}</td>
                     <td>${doc.data().Cnic}</td>
                     <td>${doc.data().RollNumber}</td>
                     <td>${doc.data().ContactNumber}</td>
                     <td>${doc.data().select}</td>
                 </tr>`
        // console.log(doc.id, " => ", doc.data());
    });

}
