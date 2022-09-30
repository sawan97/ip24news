import React, { useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from "./Spinner"
const News = (props) => {
    const [articles,setArticles] = useState([]);
    const [totalResults,setTotalResults] = useState(0);
    const [page,setPage] = useState(1);
    const getNews = async ()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=${props.pageSize}&page=${page}&category=${props.category}&apiKey=bc88de60d5464f5d84751b44e91b2d40`;
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
        setPage(page+1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&pageSize=${props.pageSize}&page=${page}&apiKey=bc88de60d5464f5d84751b44e91b2d40`;
        let data = await fetch(url);
        let parseData = await data.json();
        setTotalResults(parseData.totalResults);
        setArticles(articles.concat(parseData.articles))
    }
    // const capitalize = (s)=>{
    //     return s[0].toUpperCase() + s.slice(1);
    // }
    // const capitalizeFirstLetter = (string) => {
    //     return string[0].toUpperCase() + string.slice(1);
    // }
  return (
    <InfiniteScroll
    dataLength={articles.length} //This is important field to render the next data
    next={updateNews}
    hasMore={articles.length<totalResults}
    loader= {<Spinner/>} >
    <div className='container my-3'>
        <h1 className='text-center' style={{margin:"35px 0px"}}>IP24NEWS-Top {props.category} headlines</h1>
        <div className="row my-3">
        {articles.map((element)=>{
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
