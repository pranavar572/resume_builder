import { Link } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react'
import { FaBackward, FaForward, FaRegTrashAlt } from "react-icons/fa";
import { deleteAllResumeApi, getAllResumeApi } from '../service/apiService';
import { FaSearch } from "react-icons/fa";

function Saved() {

  const [allResumes, setAllResumes] = useState([])
  const [searchKey,setSearchKey]=useState("")
  const[dummyAllResumes,setDummyAllResumes]=useState([])
  // console.log(allResumes);

  const [currentPage,setCurrentPage]=useState(1)
  const rowPerPage=4
  const lastIndexofCurrentPage=currentPage * rowPerPage
  const firstIndexofCurrentPage= lastIndexofCurrentPage - rowPerPage
  const currentResumes=allResumes.slice(firstIndexofCurrentPage,lastIndexofCurrentPage)
  const totalPages=Math.ceil(allResumes.length/rowPerPage)


  useEffect(() => {
    getAllResume()
  }, [])

  const searchInput=useMemo(()=>{
    setAllResumes(allResumes.filter(item=>item.job.toLowerCase().includes(searchKey.toLowerCase())))
  },[searchKey])
  const getAllResume = async () => {
    const response = await getAllResumeApi();

    if (response.status === 200) {
      setAllResumes(response.data);
      setDummyAllResumes(response.data)
    }
  };

  const removeResume = async (id) => {
    if (confirm("Are you sure you want to delete this resume?")) {
      const response = await deleteAllResumeApi(id);

      if (response.status === 200) {
        getAllResume();
      }
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center my-5 flex-column'>
      <h1>All Saved Resume</h1>
      <div className='d-flex justify-content-center align-items-center w-50'>
        <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search candidate by their job name' className='form-control' />
        <FaSearch style={{marginLeft:'-30px'}} />
        </div>
      <table className="table table-hover table-striped my-5">
        <thead className='table-dark'>
          <tr>
            <th>#</th>
            <th>Resume</th>
            <th>Job role</th>
            <th>....</th>
          </tr>
        </thead>
        <tbody>
          {
            currentResumes?.length > 0 ?
              currentResumes?.map((resume, index) => (
                <tr key={resume?.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/resume/${resume?.id}`}>
                      {resume?.fullname?.toUpperCase()}
                    </Link>
                  </td>
                  <td>{resume?.job}</td>
                  <td><button
                    className='btn btn-danger'
                    onClick={() => removeResume(resume.id)}
                  >
                    <FaRegTrashAlt /> Delete
                  </button></td>
                </tr>

              ))
              :
              <p>NO RESUME ADDED YET</p>
          }
        </tbody>
      </table>
      <div className='d-flex align-items-center'>
        <button className='btn' onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage==1}>
          <FaBackward/>

        </button>
        {currentPage} of {totalPages}
        <button className='btn' onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage==totalPages || totalPages==0}>
          <FaForward/>

        </button>

      </div>
    </div>
  )
}

export default Saved
