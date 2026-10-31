import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { getAllDownloadResumeApi } from '../service/apiService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '80vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Download() {

  const [downloadList, setDownloadList] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [label, setLabel] = useState([])
  const [value, setValue] = useState([])
  const colorPallet = ['#11669f','#d66928','#df1ecf','#662020','#292727','#c2bf36']
  const backgroundColor = label.map((value,index)=>colorPallet[index%colorPallet.length])

  const data = {
  labels: label,
  datasets: [
    {
      label: 'download count',
      data: value ,
      backgroundColor: backgroundColor
    }
  ]}
  useEffect(() => {
    getAllDownloads()
  }, [])

  const getAllDownloads = async () => {

    const result = await getAllDownloadResumeApi()
    setDownloadList(result.data)
    const output = {}

    result.data.forEach(item => {

      const currentJob = item.jobRole

      if(currentJob in output){
        output[currentJob]+=1
      }else{
        output[currentJob]=1
      }
      
    });

    setLabel(Object.keys(output))
    setValue(Object.values(output))
  }

  return (
    <div className='container my-5'>
      <div className='d-flex justify-content-between align-items-center'>
        <h3 className='fs-1'>Download Resume History</h3>
        <button className='btn btn-primary' onClick={handleOpen}>View in  chart</button>
      </div>

      <p className='mt-3 fs-3 fw-semibold text-primary'>

        Total download resumes from our site is

        <span className='fw-bolder text-danger ms-2'>
          {downloadList.length}
        </span>

      </p>

      <div className="row my-5">
        {/* Duplicate the row according to the resume count */}

        {
          downloadList?.length > 0 ?
            downloadList?.map(resume => (
              <div className='col-lg-4' key={resume.id}>

                <div style={{ height: '350px' }} className='rounded shadow p-3'>

                  <h6>Review at: {resume.timeStamp}</h6>

                  <div className='mt-4 text-center'>

                    <Link to={`/resume/${resume?.resumeId}`}>
                      <img className='w-100' style={{ height: "300px" }} src={resume?.resumeImg} alt="resumeimage" />
                    </Link>

                  </div>

                </div>

              </div>
            ))
            :
            <div>No resume downloaded yet</div>
        }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ width: '100%', padding: '10px' }}>
            CV count by job role
          </Typography>
          <div className='text-center'>
            <Pie data={data} />
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This chart provides an overview of the number of CV downloads associated with different jobs on the website.It helps visulize the demand and engagement for CV's accross various career categories, making it easie to identify which job roles attract the heighest number of downloads.By comparing download counts across roles the chart can provide useful insights in to user preference and the popularity of differnt career oppurtunites on the platform.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Download