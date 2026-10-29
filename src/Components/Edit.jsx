import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaUserEdit } from "react-icons/fa";
import { FormControl, TextField } from '@mui/material';
import { FiFileText } from "react-icons/fi";
import { IoMdRefreshCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import Preview from '../Components/Preview';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FaXmark } from "react-icons/fa6";
import jobRole from '../assets/jobRole.json'
import { toast } from 'react-toastify';
import { editAllResumeApi } from '../service/apiService';
import { jsPDF } from "jspdf";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function Edit({ resumeDetails, setResumeDetails }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const skillRef = React.useRef()
  const removeSkill = (skill) => {
    setResumeDetails({ ...resumeDetails, skills: resumeDetails.skills.filter(item => item != skill) })
  }
  const addSkill = (skill) => {
    if (skill) {
      if (resumeDetails?.skills?.map(item => item.toLowerCase())
        .includes(skill.toLowerCase())) 
        {
        toast.info("Given skill is alreadyavailable, please add another")
        }
      else {
        setResumeDetails({ ...resumeDetails, skills: [...resumeDetails?.skills, skill] })
      }
    }
    else{
      toast.warning("Please enter a valid input!!!")
    }
  }

  const handleEditResume=async()=>{
      // make api call to update resume whenever the update button clicks
      const {fullname,location,job,phone,email,github,linkedin,degree,college,year,skills,summary}=resumeDetails
      if(fullname && location && job && phone && email && github && linkedin && degree && college && year && skills.length>0 && summary){
        // make api call
        const response=await editAllResumeApi(resumeDetails.id,resumeDetails)
        console.log(response);
        if(response.status===200){
          toast.success("Resume updated successfully")
         setTimeout(()=>{
          handleClose()
         },2500);
        }
        
      }else{
        toast.error("Please fill the form completely")
      }
    }
  const generatePDF=()=>{
    const pdf=new jsPDF()
  }
  
  return (
    <div>
      <Button style={{ color: '#4d321d' }} className='btn' onClick={handleOpen}><FaUserEdit />Edit CV</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit resume deatils
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <div>
                <h3>Personal details</h3>
                <div className='row p-3' >
                  <TextField value={resumeDetails?.fullname} onChange={e => setResumeDetails({ ...resumeDetails, fullname: e.target.value })} id="standard-basic-fullname" label="Full name" variant="standard" />
                  <TextField value={resumeDetails?.location} onChange={e => setResumeDetails({ ...resumeDetails, location: e.target.value })} id="standard-basic-loc" label="Location" variant="standard" />
                  <FormControl variant='standard'>
                    <InputLabel id="demo-simple-select-label">Choose job title</InputLabel>
                    <Select

                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Job"
                      value={resumeDetails?.job}
                      onChange={e => setResumeDetails({ ...resumeDetails, job: e.target.value })}

                    >

                      {jobRole.jobRoles.map(job => (
                        <MenuItem key={job} value={job}>
                          {job}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className='mt-3'>
                <h3>Contact details</h3>
                <div className='row p-3'>
                  <TextField value={resumeDetails?.email} onChange={e => setResumeDetails({ ...resumeDetails, email: e.target.value })} id="standard-basic-email" label="E-mail" variant="standard" />

                  <TextField value={resumeDetails?.phone} onChange={e => setResumeDetails({ ...resumeDetails, phone: e.target.value })} id="standard-basic-contact" label="Contact number" variant="standard" />

                  <TextField value={resumeDetails?.linkedin} onChange={e => setResumeDetails({ ...resumeDetails, linkedin: e.target.value })} id="standard-basic-linkedin" label="LinkedIn Link" variant="standard" />

                  <TextField value={resumeDetails?.github} onChange={e => setResumeDetails({ ...resumeDetails, github: e.target.value })} id="standard-basic-github" label="Githb Link" variant="standard" />
                </div>
              </div>
              <div className='mt-3'>
                <h3>Educational details</h3>
                <div className='row p-3'>
                  <TextField value={resumeDetails?.degree} onChange={e => setResumeDetails({ ...resumeDetails, degree: e.target.value })} id="standard-basic-degree" label="Bachelors Degree" variant="standard" />
                  <TextField value={resumeDetails?.college} onChange={e => setResumeDetails({ ...resumeDetails, college: e.target.value })} id="standard-basic-college" label="University/college" variant="standard" />
                  <TextField value={resumeDetails?.year} onChange={e => setResumeDetails({ ...resumeDetails, year: e.target.value })} id="standard-basic-year" label="Year of graduation" variant="standard" />
                </div>
              </div>
              <div className='mt-3' >
                <h3>Skills</h3>
                <div className='d-flex p-3'>
                  <input ref={skillRef} 
                  type="text" 
                  className='form-control' 
                  placeholder='Add skills' />
                  <button onClick={()=>{addSkill(skillRef.current.value)}} className='btn'>Add</button>
                </div>
                <h5>Added skills</h5>
                <div className='d-flex justify-content-between flex-wrap'>
                  {
                    resumeDetails?.skills?.map(skill => (
                      <Button onClick={() => (removeSkill(skill))} className='my-2 mx-3' variant='contained'>{skill}<FaXmark className='ms-3' /></Button>))
                  }
                </div>
              </div>
              {/* Summary */}
              <div className='mt-3'>
                <h3>Summary</h3>
                <div className='row p-3'>
                  <TextField value={resumeDetails?.summary} onChange={e => setResumeDetails({ ...resumeDetails, summary: e.target.value })} id='summary' label='Summary' variant='standard'></TextField></div>
              </div>
            </div>
            {/* Update button */}
            <button onClick={handleEditResume} className='btn btn-primary mt-3'>Update CV</button>
          </Box>
        </Box>
      </Modal>

    </div>
  )
}

export default Edit