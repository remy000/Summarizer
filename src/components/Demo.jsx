import { useEffect,useState } from "react"
import { copy,linkIcon,loader,tick } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article"

const Demo = () => {
  const [allArticles,setAllArticles]=useState([]);
 
  const[article,setArticle]=useState({
    url:'',
    summary:'',
  });
  const[copied,setCopied]=useState("");
  const [ getSummary,{error,isFetching}]=useLazyGetSummaryQuery();
  
  useEffect(()=>{
    const articleFromStorage=JSON.parse(
      localStorage.getItem('articles')
    )
      if(articleFromStorage){
        setAllArticles(articleFromStorage);
      }
    

  },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data}= await getSummary({articleUrl:article.url});
    if(data?.summary){
      const newArticle={...article,summary:data.summary};
      const updatedArticles=[newArticle,...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedArticles);
      localStorage.setItem('articles',JSON.stringify(updatedArticles));
    }
   
      };

      const handleCopy=(copyUrl)=>{
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(()=>setCopied(false),3000);
      }





  
  return (
   <section className="w-full mt-16 max-w-xl">
    <div className="flex flex-col w-full gap-2">
        <form className="relative flex justify-center items-center"
        onSubmit={handleSubmit}>
            <img src={linkIcon} alt="linkIcon" className="absolute left-0 my-2 ml-3 m-5" />
            <input type="url" placeholder="Enter URL"
            required value={article.url} onChange={(e)=>setArticle({...article,url:e.target.value})}
            className="peer url_input" />
            <button className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700" type="submit">&</button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item,index)=>(
            <div key={`link-${index}`} onClick={()=>setArticle(item)} className="link_card">
               <div className="copy_btn" onClick={()=>handleCopy(item.url)}>
                <img src={copied===item.url?tick:copy} alt="copy_btn" className="w-[40%] h-[40%] object-contain" />

              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">{item.url}</p>

            </div>
          ))}
        </div>

    </div>
    <div className="flex justify-center my-10 max-w-full items-center">
      {
         isFetching ?(
          <img src={loader} alt="loader" className="w-20 h-20 object-contain"/>
        ): error ?(
          <p className="font-inter font-bold text-black text-center">Sorry, your request was not successfull!
          <br/>
          <span className="font-satoshi font-normal text-gray-700">
            {error?.data?.error}
          </span>
          
          </p>
    
        ):(
          article.summary&&(
            <div className="flex flex-col gap-3">
              <h2 className="text-blue-700 font-bold font-satoshi text-xl">Article Summary</h2>
              <div className="summary_box">
                <p>{article.summary}</p>
              </div>

            </div>
          )
        )
      }
       
      

    </div>
   </section>
  )
}

export default Demo
