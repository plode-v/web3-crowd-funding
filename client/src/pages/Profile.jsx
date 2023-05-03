import React from 'react'

import { useAddress } from "@thirdweb-dev/react"

const Profile = () => {

    const address = useAddress();
    return (
        <div>{address}</div>
    )
}

export default Profile