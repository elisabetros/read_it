import React from 'react'
import { BounceLoader } from 'react-spinners'

const Loader = () => {
    return(
        <div className="loader">
            <BounceLoader color={"#ff9100"}/>
        </div>
    )
}
export default Loader