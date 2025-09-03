import { useEffect, useState } from "react";
import './App.css';

function App() {

  const[products,setProducts] = useState([]);
  const[page,setPage] = useState(1);
  const[totalPage,setToatalPage] = useState(0);

  const fetchProduct = async()=>{
    const resp = await fetch(`https://dummyjson.com/products?limit=9&skip=${(page-1)*9}`);
    const data = await resp.json();
    console.log(data);
    if (data && data.products)
    {
      setProducts(data.products);
      setToatalPage(Math.ceil(data.total/9));
    }
  }
  useEffect(()=>{
    fetchProduct();
  },[page])

  const selectedPageHandler = (selectedPage)=>{
    if(
      selectedPage>=1 && 
      selectedPage<=totalPage && 
      selectedPage!==page
    ){
      setPage(selectedPage);
    }
    
  }

  console.log(products);
  return(
    <div>
      {
      products.length>0 && 
      (<div className="products">
        {
          products.map((product)=>{
            return (
              <div className="product__single" key={product.id}>
            <img src={product.thumbnail} alt={product.title}></img>
            <span>{product.title}</span>
            </div>
          );
          })
        }
      </div>
      )}
      {products.length > 0 && 
      (<div className="pagination">
        <span onClick={()=>selectedPageHandler(page-1)} style={page>1?{display:"block"}:{display:"none"}}>◀</span>

          {[...Array(totalPage)].map((_,i)=>{
            return(<span className={page === i+1 ?"pagination__selected":""} onClick={()=>selectedPageHandler(i+1)} key={i}>{i+1}</span>);
          })}

        <span onClick={()=>selectedPageHandler(page+1)} style={page<totalPage?{display:"block"}:{display:"none"}}>▶</span>
      </div>
    )}
    </div>
  );
}

export default App;
