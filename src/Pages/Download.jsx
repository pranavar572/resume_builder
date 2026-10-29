import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

function Download() {
  return (
    <div className='container my-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className='fs-1'>Download Resume History</h3>
        <Link to={'/resume-details'}><FaArrowLeft />Back</Link>
      </div>
      <div className="row my-5">
        {/* Duplicate the row according to the resume count */}
        <div className="col-lg-4">
          <div style={{height:'350px'}} className='rounded shadow p-3'>
            <h6>Review at: Timestamp</h6>
            <div className='mt-3 text-center'>
              <Link to={'/resume/:id'}><img className='w-50' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLG2LOhq7-vbk0Gmx6XIN8Ju1MqG1ROBtY1FOujXLnJEJdUMNYJBMs9-k&s=10" alt="resume" /></Link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Download
