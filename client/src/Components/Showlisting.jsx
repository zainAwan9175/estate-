import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Showlisting() {
    const [listings, setListings] = useState([]); // Initialize as an empty array
    const { currentuser } = useSelector(state => state.user);

    useEffect(() => {
        if (currentuser && currentuser._id) {
            axios.get(`http://localhost:3001/listining/getlisiting/${currentuser._id}`)
                .then((res) => {
                    setListings(res.data.data || []); // Ensure that the data is an array
                })
                .catch((err) => {
                    console.error("Error fetching listings:", err);
                });
        }
    }, [currentuser]);

    function editlisting() {
        // TODO: Implement the edit functionality
    }

    function deleteListing(id) {
        axios.post(`http://localhost:3001/listining/delete/${id}`)
            .then((res) => {
                if (res.data.delete) {
                    axios.get(`http://localhost:3001/listining/getlisiting/${currentuser._id}`)
                        .then((res) => {
                            setListings(res.data.data || []); // Ensure that the data is an array
                        })
                        .catch((err) => {
                            console.error("Error refreshing listings:", err);
                        });
                }
            })
            .catch((err) => {
                console.error("Error deleting listing:", err);
            });
    }

    return (
        <div className='flex justify-center items-center gap-3 flex-col mt-6'>
            <p className={`text-blue-600 font-bold text-[30px] ${listings.length !== 0 ? '' : 'hidden'}`}>
                Your Listings
            </p>
            {
                listings.length > 0 ? (
                    listings.map((obj) => (
                        <div key={obj._id} className='border border-black w-[340px] md:w-[440px] p-3 flex justify-between items-center'>
                            <Link to={`/listing/${obj._id}`}>
                                <img src={obj.imageurls[0]} alt='Listing' className='w-[80px] h-[40px] md:h-[60px] md:w-[105px]' />
                            </Link>
                            <div className='flex gap-3 items-center'>
                                <Link to={`/update-lisiting/${obj._id}`}> <button className='text-green-600' onClick={editlisting}>EDIT</button></Link>
                               
                                <button className='text-red-600' onClick={() => deleteListing(obj._id)}>DELETE</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='text-red-800 font-bold text-[30px]'>You have no Listing. Please create Listings.</div>
                )
            }
        </div>
    );
}

export default Showlisting;
