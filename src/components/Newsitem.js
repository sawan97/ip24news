import React from 'react'

const Newsitem = (props) => {

  return (
    <div>
      <div className="card" >
        <img src={props.imgUrl?props.imgUrl:"https://images.moneycontrol.com/static-mcnews/2022/08/sensex_nifty_sensexdown-770x433.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <p className="card-text"><small className="text-muted">By: {props.author} on {new Date(props.date).toUTCString()}</small></p>
            <a target="blank" href={props.url} className="btn btn-dark">Read More</a>
        </div>
     </div>
    </div>
  )
}

export default Newsitem
