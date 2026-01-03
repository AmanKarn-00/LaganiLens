import  hero from '../Assets/hero.png'
import hero2 from '../Assets/hero2.png'
import { useNavigate } from 'react-router'
export default function Body(){
    const navigate=useNavigate();

    const handlebutton = () =>{
        navigate('/signup')
    }
    return(
        < >
        <section className="relative  "> 
                  
              {/*   main div  */}

                <div className=' max-w-[1080px]  flex items-center h-screen  px-2 py-2  justify-between mx-auto  '>  
                    {/* text wala div */}
                    <div className='space-y-8'>
<h1 className=' font-bold text-[44px] text-black   leading-[1.2]'>Meet, Match, and Grow with PeerMeet</h1>
<p className='text-black text-[1.2rem] leading-7 opacity-75'> Join a community built for students who want to share knowledge, build networks, and make meaningful connections for their personal and professional growth. </p>
<p className='text-black text-[1.2rem] leading-7 opacity-75'> Start your journey towards growth today. </p>


  <button onClick={handlebutton} className="text-black  bg-white hover:bg-indigo-950 px-3.5 py-1.5  transition-all duration-100 font-mono  cursor-pointer  hover:text-red-400 border-2 border-solid border-blue-900 rounded-sm ">Get Started Now</button>

                    </div>
{/* pic wala div */}
<img src = {hero} alt= 'hero image' className='  max-w-[580px] max-h-400px'  ></img>
         </div>
        </section>

        {/* main section pachi ko features wala section surue */}
        <section className=''>
        <div className='max-w-[1080px]  flex items-center   px-2 py-2  justify-between mx-auto '>
           
            <div className=''>{/* pic ko div*/ }
           <img src = {hero2}  className='max-w-[520px]'  ></img>

        </div>

    <div className='max-w-[1080px] mx-auto pt-4 space-y-7  shadow-blue-900 shadow-xl/20  rounded-2xl p-20'>
     <h2 id = "features" className='  text-[30px]  text-blue-800 opacity-81  leading-[1.2]  font-bold border-b-2 border-b-black '>Features</h2>
     <div className='relative flex-col justify-between '>
            <ul className='space-y-7 '>
    <li className='text-black text-[1.2rem] leading-7'> <span className='font-bold hover:text-sky-900    text-blue-600 flex '>Find Like-minded Peers</span>
    Connect with students sharing your hobbies, goals, and skills.</li>
    <li className='text-black text-[1.2rem] leading-7'> <span className=' text-blue-600  hover:text-sky-900 font-bold  flex '>Skill Exchange & Learning</span>
Learn from others or teach what you know and earn.</li>
   <li className='text-black text-[1.2rem] leading-7 '>
   <span className='font-bold  flex text-blue-600 hover:text-sky-900 cursor-pointer ju' >Smart Matching</span> 
Our Machine Learning algorithm recommends the best matches for your goals.</li>
   </ul>
   </div>
    </div>
</div>

</section>


        </>
    )
}