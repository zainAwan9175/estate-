import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import { app } from '../firebase.js';
import { useParams } from 'react-router-dom';

function Update_listing() {
  const params=useParams();
  const id=params.id;
  const { currentuser } = useSelector(state => state.user);

  const [lisitingcondition, setlisitingcondition] = useState("");
  const [formdata, setformdata] = useState({
    imageurls: [],
    name: '',
    location: "",
    bath: 1,
    bed: 1,
    furnish: false,
    parking: 0,
    type: "rent",
    offer: false,
    price: 0,
    description: "",
    userref: currentuser._id,
    discount:"",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, setfiles] = useState([]);
  const [uploadimagebtn, setuploadimagebtn] = useState("UPLOAD");
  const [uploadimageerr, setuploadimageerr] = useState("");

  useEffect(() => {
    if (Object.keys(currentuser).length !== 0) {
 
    } else {
      navigate("/signup");
    }


    axios
    .get(`http://localhost:3001/listining/get/${id}`)
    .then((res)=>{
       if(res.data.findlisting)
       {
        console.log(res.data.listing)
        setformdata(res.data.listing)
       }  

    })
    .catch(()=>{

    })


     
  }, []);
  function submitfiles() {
    setuploadimagebtn("LOADING...");
  
    const totalFiles = formdata.imageurls.length + files.length;
  
    if (totalFiles > 6) {
      setuploadimageerr("You cannot upload more than 6 images in total.");
      setuploadimagebtn("UPLOAD");
      return;
    }
  
    if (files.length > 0) {
      const promises = [];
  
      for (let i = 0; i < files.length; i++) {
        promises.push(uploadfile_tofirebase(files[i]));
      }
  
      Promise.all(promises)
        .then((urls) => {
          setformdata(prevState => ({
            ...prevState,
            imageurls: prevState.imageurls.concat(urls)
          }));
          setuploadimageerr("");
          setuploadimagebtn("UPLOAD");
        })
        .catch((err) => {
          setuploadimageerr("Image must be less than 2MB");
        });
    } else {
      setuploadimageerr("Please upload a file");
      setuploadimagebtn("UPLOAD");
    }
  }
  

 

  function uploadfile_tofirebase(file) {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storage_ref = ref(storage, filename);
      const uploadtask = uploadBytesResumable(storage_ref, file);

      uploadtask.on("state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(Math.round(progress));
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadtask.snapshot.ref)
            .then((downloadurl) => {
              resolve(downloadurl);
            });
        }
      );
    });
  }

  function deleteimage(index) {
    setformdata({
      ...formdata,
      imageurls: formdata.imageurls.filter((url, i) => index !== i)
    });
  }

  // function handleformdata(e) {
  //   e.preventDefault();

  //   const { id, value } = e.target;

  //   if (["name", "description", "location", "bed", "bath", "parking", "price"].includes(id)) {
  //     setformdata({ ...formdata, [id]: value });
  //   }
  // }

  const handleformdata = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setformdata({
        ...formdata,
        type: e.target.id,
      });
    }

    if (
    
      e.target.id === 'furnish' ||
      e.target.id === 'offer'
    ) {
      setformdata({
        ...formdata,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setformdata({
        ...formdata,
        [e.target.id]: e.target.value,
      });
    }
  };

  function send_data_to_backend(e) {
    e.preventDefault();


    

    axios
      .post(`http://localhost:3001/listining/update/${id}`, formdata)
      .then((res) => {
        if (res.data.update) {
          console.log(res.data.listing)
          setlisitingcondition("Your Listing was created successfully.");
          navigate(`/listing/${res.data.listing._id}`)
        }
        else if(!res.data.update){
          console.log("by")
          setlisitingcondition("Your Listing not created some thing went wrong.");

        }
      })
      .catch((err) => {
        setlisitingcondition("Something went wrong.");
      });
  }

  return (
    <div className='flex justify-center items-center flex-col min-h-[88vh] p-10'>
      <form onSubmit={send_data_to_backend} className='flex flex-col gap-2 bg-white shadow-2xl p-4 pt-9 pb-9 rounded-xl'>
        <p className='text-blue-500 font-bold text-[25px] md:text-[30px] text-center'>Update  Listing</p>

        <div className='flex flex-col md:flex-row gap-16 p-4 pt-9 pb-9 w-[320px] md:w-full justify-center'>
          <div className='w-[300px] md:w-[400px] flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <input className='w-full rounded-lg outline-none p-2 bg-slate-100 border' placeholder='Name' id='name' onChange={handleformdata} value={formdata.name}></input>
              <textarea className='w-full rounded-lg outline-none p-2 bg-slate-100 border' placeholder='Description' id='description' onChange={handleformdata} value={formdata.description}></textarea>
              <input className='w-full rounded-lg outline-none p-2 bg-slate-100 border' placeholder='Location' onChange={handleformdata} id='location' value={formdata.location}></input>
            </div>

            {/* <div className='flex gap-6 flex-wrap p-2'>
              <div className='flex gap-1'>
                <input type='checkbox' className='w-[20px]' id='sell' onChange={(e) => { settypestate(e.target.id) }} checked={typestate === "sell"}></input>
                <p>Sell</p>
              </div>
              <div className='flex gap-1'>
                <input type='checkbox' className='w-[20px]' id='offer' onChange={() => { setofferstate(!offerstate) }} checked={offerstate}></input>
                <p>Offer</p>
              </div>
              <div className='flex gap-1'>
                <input type='checkbox' className='w-[20px]' id='rent' onChange={(e) => { settypestate(e.target.id) }} checked={typestate === "rent"}></input>
                <p>Rent</p>
              </div>
              <div className='flex gap-1'>
                <input type='checkbox' className='w-[20px]' id='furnish' onChange={() => { setfurnishstate(!furnishstate) }} checked={furnishstate}></input>
                <p>Furnished</p>
              </div>
            </div> */}


<div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleformdata}
                checked={formdata.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleformdata}
                checked={formdata.type === 'rent'}
              />
              <span>Rent</span>
            </div>
   
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnish'
                className='w-5'
                onChange={handleformdata}
                checked={formdata.furnish}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleformdata}
                checked={formdata.offer}
              />
              <span>Offer</span>
            </div>
          </div>

            <div className='flex gap-7 flex-wrap'>
              <div className='flex items-center gap-1'>
                <input type='number' className='bg-slate-100 outline-none w-[80px] p-2 rounded-xl' id='bed' min={1} max={10} onChange={handleformdata} value={formdata.bed}></input>
                <p>Beds</p>
              </div>
              <div className='flex items-center gap-1'>
                <input type='number' className='bg-slate-100 outline-none w-[80px] p-2 rounded-xl' min={1} id='bath' max={10} onChange={handleformdata} value={formdata.bath}></input>
                <p>Baths</p>
              </div>

              <div className='flex items-center gap-1'>
                <input type='number' className='bg-slate-100 outline-none w-[80px] p-2 rounded-xl' min={1} id='price' onChange={handleformdata} value={formdata.price}></input>
              <div className='flex flex-col justify-center items-center'>
              <p>Price in $</p>
              <p className={`${formdata.type!="rent"&& "hidden"}`}>($/mounth)</p>
              </div>
              </div>
              <div className='flex items-center gap-1'>
                <input type='number' className='bg-slate-100 outline-none w-[80px] p-2 rounded-xl' id='parking' onChange={handleformdata} value={formdata.parking}></input>
                <p>Parking slot</p>
              </div>

              <div className={`flex items-center gap-1 ${formdata.offer != true && "hidden"}`}>
                <input type='number' className='bg-slate-100 outline-none w-[80px] p-2 rounded-xl' id='discount' onChange={handleformdata} value={formdata.discount}></input>
                <p>Discount</p>
              </div>
            </div>
          </div>

          <div className='w-[300px] md:w-[400px] flex flex-col gap-4'>
            <p><span className='font-bold'>Images:</span> The first image will be the cover (max 6)</p>

            <div className='flex gap-3 items-center'>
              <p className='text-red-700'>{uploadimageerr}</p>
              <button type='button' className={`${uploadimageerr ? "" : "hidden"}`} onClick={() => setuploadimageerr("")}><i class="fa-solid fa-circle-xmark text-red-500"></i></button>
            </div>

            <div className='flex gap-1'>
              <input onChange={(e) => setfiles(e.target.files)} type='file' className='w-full outline-none p-2 bg-slate-100 border' accept='image/*' multiple></input>
              <button onClick={submitfiles} type='button' className='p-3 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white hover:duration-500'>{uploadimagebtn}</button>
            </div>

            <div className='flex flex-col gap-3'>
              {formdata.imageurls.map((url, index) => (
                <div key={index} className='flex justify-between p-2 border border-black'>
                  <img src={url} className='w-[80px]' alt={`Uploaded ${index}`} />
                  <button type='button' className='text-red-700' onClick={() => deleteimage(index)}>DELETE</button>
                </div>
              ))}
            </div>

            <button type='submit' className='w-full text-white bg-blue-600 outline-none p-2 mt-4 rounded-md hover:bg-blue-900 hover:text-white hover:duration-500' >Update Listing</button>
            <div className='flex gap-2 items-center'>
              <p className='text-blue-700'>{lisitingcondition}</p>
              <button type='button' className={`${lisitingcondition ? "" : "hidden"}`} onClick={() => setlisitingcondition("")}><i class="fa-solid fa-circle-xmark text-red-700"></i></button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update_listing;
