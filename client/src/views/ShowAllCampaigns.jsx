import { useEffect, useState } from "react";
import axios from 'axios'
import { useCookies } from "react-cookie";
import EachCampaign from "../components/EachCampaign";


const ViewAllCampaigns = (props) => {
    const [campaigns, setCampaigns] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [cookies, setCookie, removeCookie] = useCookies(['user_id'])
    const user = cookies.user_id

    useEffect(() => {
        axios.get(`http://localhost:8000/api/campaigns`)
            .then(res => {
                console.log(res)
                setCampaigns(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <div className="min-h-screen py-16 bg-black">
                <div className="grid grid-cols-4 gap-10">
                    {campaigns.map((campaign) => 
                    <EachCampaign key={campaign._id} campaign={campaign}/>
                    )}
                </div>
            </div>
        </>
    )
}
export default ViewAllCampaigns;