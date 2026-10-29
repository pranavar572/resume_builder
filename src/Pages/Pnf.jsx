import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div style={{height:'90vh'}} className='d-flex justify-content-center align-items-center flex-column'>
      <img className='w-50' src="https://docs.nexthink.com/platform/~gitbook/image?url=https%3A%2F%2F268444917-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FxJSUDk9NTtCHYPG5EWs3%252Fuploads%252Fgit-blob-62191db217cdfce80b1fdb9c26f97bf471e943ce%252Fappex-1643624040.png%3Falt%3Dmedia&width=768&dpr=3&quality=100&sign=ea3b3c08e9ca3d6b56c792fdc42034d0&sv=3" alt="" />
      <h1>Sorry, looks like your lost</h1>
      <Link to={'/'}>Back to Home</Link>
    </div>
  )
}

export default Pnf
