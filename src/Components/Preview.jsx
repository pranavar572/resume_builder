import { Button, Divider } from '@mui/material'
import React from 'react'

function Preview({resumeDetails}) {
  return (
    <div className='w-100'>
      <h2>{resumeDetails?.fullname}</h2>
      <p className='fs-5 lh-1'>Phone:{resumeDetails?.phone}</p>
      <p className='fs-5 lh-1'>Email:{resumeDetails?.email}</p> 
      <p className='fs-5 lh-1'>Linkedin:{resumeDetails?.linkedin}</p>
      <p className='fs-5 lh-1'>Github:{resumeDetails?.github}</p>
      <p className='fs-5 lh-1'>Location:{resumeDetails?.location}</p>
      <Divider className='bg-dark mb-3'/>
      <h2>Professional</h2>
      <p>{resumeDetails?.summary}</p>
      <Divider className='bg-dark mb-3'/>
      <h2>Technical skills</h2>
      {/* dupliacte according to skill number */}
      {
        resumeDetails?.skills.map((skills,index)=>(
          <span key={index}><Button variant='text' className='bg-dark text-light my-2 mx-1'>{skills}</Button></span>
        ))
      }
      
      <Divider className='bg-dark my-3'/>
      <p>Bachelors Degree in:{resumeDetails?.degree}</p>
      <p>University/college name:{resumeDetails?.college}</p>
      <p>Year of graduation{resumeDetails?.year}</p>
    </div>
  )
}

export default Preview
