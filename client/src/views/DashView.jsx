import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthProvider';
import { useCookies } from 'react-cookie'
import CreateACharacter from './CreateACharacterView';
import ShowOneCharacter from './ShowOneCharacter';
import Chat from '../components/Chat';
import io from 'socket.io-client'
import axios from 'axios';


const Dash = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user_id = cookies.user_id
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [socket] = useState(() => io(':8000'))

    const joinRoom = () => {
        socket.emit("join_room", 1)
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${user_id}`)
            .then(res => {
                console.log(res)
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
            })

        joinRoom()

        return () => socket.disconnect(true)
    }, [socket])

    const onClickHandler = (e) => {
        removeCookie(['user_id'])
        navigate('/')
    }

    return (
        <>
            <div className="bg-black">
                <ul className="flex border-b justify-between">
                    <div className="flex">
                        <li className="-mb-px mr-1">
                            <Link to="/cac" className="bg-black inline-block focus:border-l focus:border-t focus:border-r hover:text-blue-800 rounded-t py-2 px-4 text-indigo-700 font-semibold">Create Character</Link>
                        </li>
                        <li className="mr-1">
                            <Link to="/sac" className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-indigo-400 hover:text-blue-800 font-semibold" href="#">My Characters</Link>
                        </li>
                        <li className="mr-1">
                            <Link to="cag" className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-violet-400 hover:text-blue-800 font-semibold" href="#">Create Campaign</Link>
                        </li>
                        <li className="mr-1">
                            <Link to="vac" className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 text-violet-500 hover:text-blue-800 font-semibold" href="#">Find Campaign</Link>
                        </li>
                    </div>
                    <li className="mr-1">
                        <button onClick={e => { onClickHandler(e) }} className="bg-black inline-block focus:border-l focus:border-t focus:border-r py-2 px-4 font-semibold text-blue-600 dark:text-blue-500 hover:underline"> Logout</button>
                    </li>
                </ul>
            </div>
            <div className="max-w-full rounded overflow-hidden px-20 py-10 bg-no-repeat bg-cover" style={{
                            backgroundPosition: '100%',
                            backgroundImage: 'url("https://cdn.shopify.com/s/files/1/0059/3061/4851/products/B9A0964.jpg?v=1653900526&width=1445")',
                            height: '1200px',
                            width: 'auto'
                        }}>
                <Outlet />
            <Chat socket={socket} user={user}/>
            </div>
        </>
    )
}
export default Dash;