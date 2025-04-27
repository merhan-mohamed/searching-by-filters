import Sidebar from './Sidebar'
import Tables from './Tables'

const Dashboard = () => {
  return (
    <div className='flex h-full'>
        <Sidebar/>
        <div className="flex-1 bg-gray-900">
          <Tables/>
        </div>
   
    </div>
  )
}

export default Dashboard
