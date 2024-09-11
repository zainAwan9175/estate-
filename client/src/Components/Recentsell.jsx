import React from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'
function Recentsell({sell}) {
  return (
    <div>
       <div className='flex justify-center  gap-6  flex-wrap p-16 flex-col'>
        <div>
            <h1 className='text-slate-500 font-bold text-[20px] md:text-[40px]'>Recent places for sale</h1>
           <Link to="/search?type=sale"><button className='text-blue-700  text-[17px] font-semibold'>Show more places for sale</button></Link> 
        </div>
        <div className='flex items-center gap-12  flex-wrap  '>

        {
        sell.map((listing)=>{
            return(   <Cards listing={listing}></Cards>)
         

        })
      }

        </div>
    
      
    </div>
    </div>
  )
}

export default Recentsell
