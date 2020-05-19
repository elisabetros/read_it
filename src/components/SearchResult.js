import React, { useState } from "react";

const SearchResult = (props) => {
   const [ searchResults, setSearchResults] = useState(props)
console.log(props)

    return(
        <div>
            <h3>{props.title}</h3>
            <h4>{props.author}</h4>

        </div>
    )
// }

       
        
    
}
export default SearchResult