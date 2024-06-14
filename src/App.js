import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { MdLocationPin } from "react-icons/md";
import Loader1 from './Loader1';
import Loader2 from './Loader2';
function App() {
  
  const [cityname,setcity] = useState("pune");
  const [cords,setcoords] = useState("")
  const [image,setimage]=useState("");
  const [rig,setr] = useState(true);
  const [cityshow,setcityshow] = useState("")
  const [temp,settemp] = useState("")
  const [feeltemp,setftemp] = useState("")
  const [country,setcountry]= useState("")
  const [check,setc] = useState(false)
 const [found,setf]= useState(true)
  const [pressure,setpress] = useState("")
  const [main,setmain]= useState("");
  const [desc,setdesc] = useState("");
  const [rightimg,setimg] = useState("")
  let imageurl =`https://openweathermap.org/img/wn/${image}@2x.png`
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=95d79af3748bb4585b2d1e738d7cbd05`
  let rightimage =`https://api.unsplash.com/search/photos?page=1&query=${cityname}&client_id=Bj_9UUW2ovHqiyNfebRZiuPCrKgLF3dxEx5AEhse0PI`
  async function getweatherinfo(){
    
   
    let datas = await fetch(url);
console.log(datas);

    
    let jsondata =await datas.json();
    console.log(jsondata);
    if (jsondata.cod >= 400){
      setf(false);
      
    }
    else{
     setf(true);
    }
   
    return jsondata;
    
   
  
  
  } 
  
  function input(event){
      setcity(event.target.value);

  }
  
  async function getimg(){
   setr(false)
   let data = await fetch(rightimage);
  let main = await data.json();
 let url = main.results[0].urls.raw;
setimg(url);
setc(true);
setr(true);

  }

 function search(){
  setc(false)
getweatherinfo().then(data => {
 if(found == true){
  setimage(data.weather[0].icon);
  setcoords(data.coord)
  settemp(data.main.temp)
   setftemp(data.main.feels_like)
  setcityshow(data.name);
  setpress(data.main.pressure)
  setcountry(data.sys.country)
  setmain(data.weather[0].main);
  setdesc(data.weather[0].description);
 }

  
  // setc(true);
})

getimg()
 }
 useEffect(()=>{
  search()
 },[])
  

  
  return (
    <div className=" pt-10 flex justify-center align-middle w-full h-screen  ">
        <div className='rounded-xl p-3 border border-2 border-black  bg-slate-50 h-3/4 w-3/5 '>
       <h1 className='text-2xl p-1 text-center border border-2 border-red-500 rounded-lg'>Weather Information </h1>

       <div className=' pt-2 pb-2 flex gap-1'>

        <input className=' font-bold text-black rounded-lg p-3 text-xl w-2/3 bg-red-300 ' type="text" onChange={input} placeholder='Enter City Name' />
       <button onClick={search} className='font-bold text-black rounded-lg p-2 w-1/3 bg-gray-600'>Search </button>
       </div>

      { found ? (<div className='w-full h-3/4 rounded-lg p-1  flex   justify-center '>
        
        <div className='new p-3  h-full w-1/2 rounded-xl bg-white'>
          {image.length > 1?
            ( <img className='  rounded-xl  bg-slate-500' src={imageurl} alt="" />):
            (<img className=' ' src="https://tse1.mm.bing.net/th?id=OIP.wwxK07x0Umfnh0l-nrjxjgHaDg&pid=Api&P=0&h=220" alt="" />)
          }
           
           {setc ? (<div className='  '>
            <MdLocationPin/>
            <h1 className='  font-bold '>{cityshow} <span className=' '>{country}</span></h1>
            { check ? 
                 (<div>
                   <h3 className=' font-semibold'>{`Lat-${cords.lat} Lon-${cords.lon}`}</h3>
                   
            
            <h1 className='font-semibold text'>{` Temp-${temp} `} <span className=' '>deg</span></h1>
            <h1 className='  font-semibold '>{`Feels like-${feeltemp}`}<span className=' '>deg</span></h1>
            <h2 className=' font-semibold text'>{`Pressure-${pressure}pa`}</h2>


                 </div>
                ):
                 (<h1></h1>)
            }
         
          
            </div>):
            (<Loader1/>)
            }
            {check ?
              (<div className='border-t-2 border-yellow-500 p-2 space-y-2'>
             <h2 className=' '>Weather</h2>
             <h2 className=' '>Seems Like </h2>
            </div>):(<div></div>)
            }
            {check ?
              (<div className='border-yellow-500 border-t-2 p-3 '>
              <h2 className=''>{main}</h2>
              <h2 className=' '>{desc}</h2>
             </div>):(<div></div>)
            }
           
            
           
        </div>
        
       {setr ?(  <div className=' rounded-xl p-2 h-full w-1/2 '>
          <img className='rounded-xl  h-full w-full' src={rightimg} alt="" />
         </div>):(
          <Loader2/>
         )}
       </div>) : (
        <h1>No data found</h1>
       )}
      
        </div>
     
    </div>
  );
}

export default App;
