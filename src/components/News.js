import React, { useEffect , useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const News =(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
   
  const capitalizeFirstLetter=(val)=> {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
 
   
  const updateNews= async (url)=>{
    props.setProgress(0);
     /*  let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`; */
    setLoading(true);
    let data =await fetch(url);
     props.setProgress(30);
    let parsedData= await data.json();
     props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles);
    
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
     props.setProgress(100);
  }
  useEffect(() => {
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    updateNews(url);
     document.title="NewsHub - "+capitalizeFirstLetter(props.category); 
  }, [])
  
/*   async componentDidMount(){
    console.log("cdm")
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=94bbe64a77804c30ac5e77a3675e1d45&pageSize=${props.pageSize}&page=1`;
    this.setState({loading:true})
    let data =await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false}); 
    */
  
  const  handlePrevClick= async()=>{
    /* let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=94bbe64a77804c30ac5e77a3675e1d45&pageSize=${props.pageSize}&page=${this.state.page-1}`;
    this.setState({loading:true})
    let data =await fetch(url);
    let parsedData= await data.json();

    this.setState({articles:parsedData.articles,
      page:this.state.page-1,
      loading:false
    }); */
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page-1}`;
     setPage(page-1);
    updateNews(url);


  }
  const handleNextClick=async()=>{
/*     if(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)){}
    else{
       let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=94bbe64a77804c30ac5e77a3675e1d45&pageSize=${props.pageSize}&page=${this.state.page+1}`;
      this.setState({loading:true})
       let data =await fetch(url);
     let parsedData= await data.json();
  
      this.setState({articles:parsedData.articles,
      page:this.state.page+1,
      loading:false
    });
  } */
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`;
    setPage(page+1);
  updateNews(url);
  }
  
    return (
     <>
        <div className='container my-4'> 
          <h1 className='text-center' style={{margin:" 90px 0px"}}>Top Headlines on {capitalizeFirstLetter(props.category)}</h1>
         {loading && <Spinner/>}
          
          <div className='row'>
            {!loading && articles.map((element)=>{
              return <div className='col-md-4' key={element.url}>
               <Newsitem  title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
             
            })}
            
             
          </div>
          
          
         </div>
         <div className=' container d-flex justify-content-between' >
          <button disabled={page<=1} type="button" className="btn btn-dark " onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={page+1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark  " onClick={handleNextClick}>Next &rarr;</button>
         </div>
     </>
    )
  
}

export default News

News.defaultProps={
    country: "us",
    pageSize:9,
    category:'general'
  }
  News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string,
    apiKey:PropTypes.string
  }