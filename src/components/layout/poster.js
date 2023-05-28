import React from "react";
import stamp from "./e stamp 2.jpg"
const Poster =() =>{
    return(
        <div className="poster">
        <div className="poster_content">
        <h1 className="title">E-Stamping</h1>
            <h1 className="punch_line">The digital and secure solution</h1>
        </div>  
        <div>
        <img className="poster_img" src={stamp} />
        </div>
            
        </div>
    )
}

export default Poster;