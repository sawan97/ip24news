import React, { useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from "./Spinner"
const News = (props) => {
    const [articles,setArticles] = useState([]);
    const [totalResults,setTotalResults] = useState(0);
    const [page,setPage] = useState(1);
    const [query,setQuery] = useState("");
    // const keys = ["title","description","author"]

    const getNews = async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c70d3b12033644d69359a38c399464ce&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        setTotalResults(parseData.totalResults);
        setArticles(parseData.articles)
    }
    useEffect(()=>{
        getNews();
        // eslint-disable-next-line
    },[])
    
    const updateNews = async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&pageSize=${props.pageSize}&page=${page+1}&category=${props.category}&apiKey=c70d3b12033644d69359a38c399464ce`;
        setPage(page+1);
        let data = await fetch(url);
        let parseData = await data.json();
        setTotalResults(parseData.totalResults);
        setArticles(articles.concat(parseData.articles))
    }
    const capitalizeFirstLetter = (string) => {
        return string[0].toUpperCase() + string.slice(1);
    }
    const search = (data)=>{ 
        return data.filter((item)=> 
          item.title.toLowerCase().includes(query)
        );
    }
    // const Search = (data)=>{
    //   return data.filter((item)=>
    //   keys.some((key)=>item[key].toLowerCase().includes(query)))
    // }
  return (
    <InfiniteScroll
    dataLength={articles.length} 
    next={updateNews}
    hasMore={articles.length<totalResults}
    loader= {<Spinner/>} >
    <div className='container my-3'>
        <h1 className='text-center' style={{margin:"35px 0px", marginTop:"80px"}}>IP24NEWS-Top {capitalizeFirstLetter(props.category)} headlines</h1>
        <form className="d-flex" role="search">
          <input className="form-control me-2 " type="search" onChange={(e)=>setQuery(e.target.value)} placeholder="Search" aria-label="Search" style={{width:"50%", marginLeft:"20%"}}/>
          <button className="btn btn-outline-success mx-2" type="submit">Search</button>
      </form>
        <div className="row my-3">
        {search(articles).map((element)=>{
            return <div className='col-md-4 my-3'>
                <Newsitem title={element.title} description={element.description} imgUrl={element.urlToImage}  url={element.url}  author={element.author?element.author:"Unknown"} date = {element.publishedAt} source = {element.source.name} />
            </div>
        })}
        </div>
    
    </div>
    </InfiniteScroll>
  )
}

export default News
