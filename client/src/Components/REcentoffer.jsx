import React from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'
function REcentoffer({offer}) {
  return (
    <div className='flex justify-center  gap-6  flex-wrap p-16 flex-col'>
        <div>
            <h1 className='text-slate-500 font-bold text-[20px] md:text-[40px]'>Recent offers</h1>
          <Link to="/search?offer=true">  <button className='text-blue-700  text-[17px] font-semibold'>Show more offers</button></Link>
        </div>
        <div className='flex items-center gap-12  flex-wrap  '>

        {
        offer.map((listing)=>{
            return(   <Cards listing={listing}></Cards>)
         

        })
      }

        </div>
    
      
    </div>
  )
}

export default REcentoffer
