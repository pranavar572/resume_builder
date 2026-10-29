import React from 'react'
import { IoDocumentText } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Resume() {
  return (
    <div>
      <div style={{height:'100vh'}} >
        <h1 className='text-center my-5'>Create an ATS friendly resue in minutes</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-4 rounded shadow text-center p-5">
              <IoDocumentText className='fs-1 text-primary mb-3' />
              <h4>Add Your Details</h4>
              <p >Our AI will generate skills and summary</p>
              <h5>Step 1</h5>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-4 rounded shadow text-center p-5">
              <FaFileDownload className='fs-1 text-danger mb-3'  />
              <h4>Download your Resume</h4>
              <p>Download PDF and start Applying</p>
              <h5>Step 2</h5>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
        <div className="text-center mt-5">
          <Link to={'/resume-details'} style={{backgroundColor:'#4d321d'}} className='btn text-light'>LET'S START</Link>
        </div>
      </div>
    </div>
  )
}

export default Resume
