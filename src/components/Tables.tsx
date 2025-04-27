import  { useState } from 'react'
import { data } from '../Utilis/data'
import { BiSort } from 'react-icons/bi'
import { AiOutlineDown } from 'react-icons/ai'
import { MdSort } from 'react-icons/md'

const Tables = () => {
    const [projects, setProjects] = useState(data)
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [sortConfig, setSortConfig] = useState<{direction:string; key:string}|null>(null)

    {/****Filters******/}
    const[filterVisible, setFilterVisible] = useState(false)
    const [filters, setFilters] = useState({
        name:"",
        country:"",
        email:"",
        password:"",
        projects:"",
        status:""
    })


    const[searchquery, setSearchQuery] = useState('')

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFilters({...filters,
            [e.target.name]: e.target.value
         })
       
        
        
    }

    const filteredProjects = projects.filter((project) => (
        searchquery === " " || Object.values(project).some((value) => value.toLowerCase().includes(searchquery.toLowerCase())))
    && 
    (filters.name === " " || project.client.toLowerCase().includes(filters.name.toLowerCase()))
    && 
    (filters.email === " " || project.email.toLowerCase().includes(filters.email.toLowerCase()))
    && 
    (filters.country === " " || project.country.toLowerCase().includes(filters.country.toLowerCase()))
    && 
    (filters.projects === " " || project.project.toLowerCase().includes(filters.projects.toLowerCase()))
    && 
    (filters.status === " " || project.status.toLowerCase().includes(filters.status.toLowerCase())))

{/*Sorting*/}
    const sortProjects = (key:string) => {
        let sortedProject = [...projects]
        if(sortConfig && sortConfig.direction === "ascending" && sortConfig.key === key){
            sortedProject.sort((a:any, b:any) => (a[key] > b[key] ? -1 : 1 ))
            setSortConfig({key, direction:"descending"})
        }else{
            sortedProject.sort((a:any, b:any) => (a[key] > b[key] ? 1 : -1 ))
            setSortConfig({key, direction:"ascending"})
        }

        setProjects(sortedProject)
        setDropdownVisible(false)

    }

    const handleSortOption = (key:string) => {
        sortProjects(key)
        setDropdownVisible(false)
      
    }

    {/*Pagnation*/}
    const[currentPage, setCurrentPage] = useState(1)
    const ItemsPerPage = 2
    const StartIndex = (currentPage - 1) * ItemsPerPage
    const currentProjects = filteredProjects.slice(StartIndex, StartIndex + ItemsPerPage )
    const totalPages = Math.ceil(filteredProjects.length/ItemsPerPage)


    const handlePage = (pagenumber: number) => (setCurrentPage(pagenumber)) 

    


  return (
    <div className='p-4 w-[93%] ml-[5rem]'>
        {/*Sorting*/}
        <div className="flex items-center mb-5">

            <div className="relative">
            <button className='border border-gray-700 flex items-center justify-center text-white p-2 rounded' onClick={() => setDropdownVisible(!dropdownVisible)}>
                <BiSort className='mr-[0.3rem]'/> Sort
                <AiOutlineDown className='ml-2'/>
                
            </button>

            {dropdownVisible && (
                <div className='absolute mt-2 bg-gray-800 border rounded shadow-lg'>
                    <button onClick={() => handleSortOption("client")} className='block px-4 py-2 text-white w-full hover:bg-gray-700'>
                        Name
                    </button>

                    <button onClick={() => handleSortOption("country")} className='block px-4 py-2 text-white w-full hover:bg-gray-700'>
                        Country
                    </button>

                    <button onClick={() => handleSortOption("date")} className='block px-4 py-2 text-white w-full hover:bg-gray-700'>
                        Date
                    </button>
                </div>
            )}

       
            </div>


         {/*Filters*/}
        <div className="relative">
            <button className='border border-gray-700 flex items-center justify-center text-white rounded p-2 ml-2' onClick={() => setFilterVisible(!filterVisible)}>
                <MdSort className='mr[0.3rem]'/>Filters<AiOutlineDown className='ml-2'/>
            </button>

               {/*Filter UI*/}
        {filterVisible && (
            <div className="absolute mt-2 bg-gray-700 border border-gray-700 rounded shadow-lg p-4">
                <div className="mb-2 w-[10rem]">
                    <label className='text-white block'>Filter By Name:</label>
                    <input className='bg-gray-900 text-white rounded p-2 w-full' type='text' name='name' value={filters.name} onChange={handleChange}/>
                </div>

                <div className="mb-2">
                    <label className='text-white block'>Filter By Country:</label>
                    <input className='bg-gray-900 text-white rounded p-2 w-full' type='text' name='country' value={filters.country} onChange={handleChange}/>
                </div>

                <div className="mb-2">
                    <label className='text-white block'>Filter By Email:</label>
                    <input className='bg-gray-900 text-white rounded p-2 w-full' type='password' name='email' value={filters.email} onChange={handleChange}/>
                </div>

                <div className="mb-2">
                    <label className='text-white block'>Filter By Projects:</label>
                    <input className='bg-gray-900 text-white rounded p-2 w-full' type='text' name='projects' value={filters.projects} onChange={handleChange}/>
                </div>

                <div className="mb-2">
                    <label className='text-white block'>Filter By Status:</label>
                    <input className='bg-gray-900 text-white rounded p-2 w-full' type='text' name='status' value={filters.status} onChange={handleChange}/>
                </div>

            </div>
        )}
        </div>
        </div>

     

       
        {/*Main Table*/}
        <table className='min-w-full table-auto rounded border border-gray-700 text-white'>
            <thead>
                <tr>
                    <th className='px-5 py-3 text-left'>Image</th>
                    <th className='px-5 py-3 text-left'>Name</th>
                    <th className='px-5 py-3 text-left'>Country</th>
                    <th className='px-5 py-3 text-left'>Email</th>
                    <th className='px-5 py-3 text-left'>Task Progress</th>
                    <th className='px-5 py-3 text-left'>Status</th>
                    <th className='px-5 py-3 text-left'>Date</th>
                    <th className='px-5 py-3 text-left'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentProjects.map((project:any, index:any) => (
                <tr className='border border-gray-700' key={index}>
                    <td className='px-4 py-2'>
                        <img src={project.image} alt={project.client} className='w-12 h-12 rounded-full'/>
                    </td>

                    <td className='px-4 py-2'>
                        {project.client}
                    </td>

                    <td className='px-4 py-2'>
                        {project.country}
                    </td>

                    <td className='px-4 py-2'>
                        {project.email}
                    </td>

                    <td className='px-4 py-2'>
                        {project.project}
                    </td>
                    <td className='px-4 py-2'>
                        {project.status}
                    </td>
                    <td className='px-4 py-2'>
                        {project.date}
                    </td>
                    <td className='px-4 py-2'>
                        {project.progress}
                    </td>
                </tr>
                ))}
            </tbody>

        </table>
        {/*Pagination*/}

        <div className='flex justify-end mt-4'>
            <button disabled={currentPage === 1} onClick={() => handlePage(currentPage - 1)} className='px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50'>
                Previous
            </button>
            <span className='px-4 py-2 text-white'>Page {currentPage} of {totalPages}</span>
            <button disabled={currentPage === totalPages} 
            onClick={() => handlePage(currentPage + 1)} className='px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50'>
                Next
            </button>
        </div>
    </div>
  )
}

export default Tables
