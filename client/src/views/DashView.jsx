import {useContext, useEffect} from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthProvider';
import { useCookies } from 'react-cookie'
import CreateACharacter from './CreateACharacterView';
import ShowOneCharacter from './ShowOneCharacter';

const Dash = (props) => {
    const { user } = useContext(AuthContext)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const navigate = useNavigate()
    console.log(user)

    const onClickHandler = (e) => {
        console.log('working')
        removeCookie(['user_id'])
        navigate('/')
    }

    return (
        <>
        <div className="bg-black">
            <div className="flex border-b content-around">
                <div className="flex">
                    <p className="-mb-px mr-1">
                        <Link to="/cac" className="bg-black inline-block focus:border-l focus:border-t focus:border-r hover:text-blue-800 rounded-t py-2 px-4 text-indigo-700 font-semibold">Create Character</Link>
                    </p>
                    <p className="mr-1">
                        <Link to="/sac" className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-indigo-400 hover:text-blue-800 font-semibold">View Characters</Link>
                    </p>
                    <p className="mr-1">
                        <Link to="cag" className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-violet-400 hover:text-blue-800 font-semibold">Create Group</Link>
                    </p>
                    <p className="mr-1">
                        <Link className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-violet-500 hover:text-blue-800 font-semibold">Find Group</Link>
                    </p>
                </div>
                <p className="mr-1">
                    <button onClick={e => {onClickHandler(e)}} className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 font-semibold text-blue-600 dark:text-blue-500 hover:underline"> Logout</button>
                </p>
            </div>
        </div>
        <Outlet/>
        </>
    )
}
export default Dash;