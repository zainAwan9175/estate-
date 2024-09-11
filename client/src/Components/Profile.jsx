import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import pic from "../assest/pic2.png";
import vdio from "../assest/cloud.mp4";
import axios from 'axios';
import { updatecurrentuser, updateactive } from '../redux/userredux';
import { app } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Showlisting from './Showlisting';

function Profile() {
  const navigate = useNavigate();
  const fileref = useRef(null);
  const listingRef = useRef(null); // Reference to the Showlisting component

  const dispatch = useDispatch();
  const { active, currentuser } = useSelector(state => state.user);
  const [username, setusername] = useState(currentuser.username);
  const [email, setemail] = useState(currentuser.email);
  const [userid, setuserid] = useState(currentuser._id);
  const [password, setpassword] = useState("");
  const [file, setfile] = useState(undefined);
  const [filepersentage, setfilepersentage] = useState(null);
  const [uploaderr, setuploaderr] = useState(false);
  const [imageurl, setimageurl] = useState("");
  const [fechshow_listing, setfechshow_listing] = useState(false);
  const [p_lmsg, setp_lmsg] = useState("");
  const [msg, setmsg] = useState();

  useEffect(() => {
    dispatch(updateactive(null));
    if (Object.keys(currentuser).length !== 0) {
      navigate("/profile");
    } else {
      navigate("/signup");
    }
  }, []);

  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  function uploadFile() {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const reference = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(reference, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilepersentage(Math.round(progress));
      },
      (error) => {
        setuploaderr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .post("http://localhost:3001/auth/updatepic", { userid, downloadURL })
            .then((res) => {
              dispatch(updatecurrentuser(res.data.updateuser));
              setfile(undefined);
            })
            .catch((err) => {
              console.error("Error updating profile picture:", err);
              setuploaderr(true);
            });
        });
      }
    );
  }

  axios.defaults.withCredentials = true;

  function handlesubmit(e) {
    e.preventDefault();
    if (password.length < 8) {
      return setp_lmsg("Password must be at least 8 characters long");
    } else {
      setp_lmsg("");
      axios
        .post("http://localhost:3001/auth/updateprofile", {
          username,
          email,
          password,
          userid,
        })
        .then((res) => {
          if (res.data.update) {
            dispatch(updatecurrentuser(res.data.newuser));
            setmsg("Account updated successfully");
          } else {
            setmsg("Email or username already registered");
          }
        })
        .catch((err) => {
          console.log(err);
          setmsg("Something went wrong");
        });
    }
  }

  function deleteaccount() {
    axios
      .post("http://localhost:3001/auth/deleteaccount", { userid })
      .then((res) => {
        if (res.data.delete) {
          dispatch(updatecurrentuser({}));
          setemail("");
          setusername("");
          navigate("/signup");
          setmsg("Account deleted successfully");
        } else {
          setmsg("Account not deleted, something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function SignOut() {
    axios
      .post("http://localhost:3001/auth/signout")
      .then((res) => {
        if (res.data.signout) {
          dispatch(updatecurrentuser({}));
          setemail("");
          setusername("");
          navigate("/signup");
          setmsg("You have signed out successfully");
        } else {
          setmsg("Something went wrong, you are not logged out");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setTimeout(() => {
    setmsg("");
  }, 7000);

  function handleShowListing() {
    setfechshow_listing(!fechshow_listing);
    if (!fechshow_listing) {
      setTimeout(() => {
        listingRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center relative p-4 min-h-[90vh] md:min-h-[90vh]">
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover z-[-1]">
        <source src={vdio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <form
        onSubmit={handlesubmit}
        className="bg-gradient-to-b opacity-95 from-white/30 to-white/10 backdrop-blur-md shadow-2xl w-[340px] md:w-[400px] rounded-2xl pl-6 pr-6 pb-4 md:pt-2 pt-4 gap-5 flex flex-col justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center md:gap-0 gap-2" enctype="multipart/form-data">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={fileref}
            onChange={(e) => setfile(e.target.files[0])}
          />
          <h1 className="font-bold md:text-[30px] text-[22px]">Your Profile</h1>
          <img
            onClick={() => fileref.current.click()}
            src={currentuser.photo}
            alt="Profile"
            className="cursor-pointer border rounded-full w-[100px] h-[100px]"
          />
          <p className={`text-green-700 ${filepersentage > 0 && filepersentage < 100 ? "" : "hidden"}`}>
            Upload {filepersentage}% done
          </p>
          <p className={`text-red-700 ${uploaderr ? "" : "hidden"}`}>
            Something went wrong [image must be less than 2MB]
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <input
            value={username}
            className="p-2 shadow-2xl rounded-md outline-none w-full opacity-70"
            placeholder="Username"
            type="text"
            onChange={(e) => setusername(e.target.value)}
            required
          />
          <input
            value={email}
            className="p-2 shadow-2xl rounded-md outline-none w-full opacity-70"
            placeholder="Email"
            type="email"
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <div className="text-red-700 font-bold w-full">
            <p className="text-red-600">{p_lmsg}</p>
            <input
              className={`text-black p-2 shadow-2xl rounded-md outline-none w-full opacity-70 ${
                p_lmsg ? "border-2 border-red-600" : ""
              }`}
              placeholder="Password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <p className="h-[25px]">{msg}</p>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="p-2 shadow-2xl hover:bg-blue-900 duration-300 bg-blue-600 text-white mt-2 rounded-md outline-none w-full"
              >
                UPDATE
              </button>
              <Link to="/creat-lisiting">
                <button
                  type="button"
                  className="p-2 shadow-2xl hover:bg-green-900 duration-300 bg-green-600 text-white rounded-md outline-none w-full"
                >
                  Create Listing
                </button>
              </Link>
              <div className="flex justify-between mt-2">
                <button type="button" onClick={deleteaccount}>Delete</button>
                <button type="button" className="text-green-600" onClick={handleShowListing}>
                  {fechshow_listing ? "Hide Listing" : "Show Listing"}
                </button>
                <button type="button" onClick={SignOut}>Sign Out</button>
              </div>
              <div>
                <p>{msg}</p>
              </div>
            </div>
          </div>
        </div>
      </form>

      {fechshow_listing && <Showlisting ref={listingRef} />}
    </div>
  );
}

export default Profile;
