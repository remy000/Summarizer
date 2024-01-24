
import {logo} from '../assets'
const Hero = () => {
  return (
    
    <header className="w-full flex justify-center items-center flex-col">
        <nav className='flex justify-between items-center w-full mb-10 pt-10'>
            <img src={logo} alt='sumz' className='w-28 object-contain'/>
            <button type='button'
            onClick={()=>window.open('https://www.google.com')} className='black_btn'>
                Github

            </button>

        </nav>
        <h1 className="head_text">
            Summarize Article <br className='max-md:hidden'/>
            <span className='orange_gradient'>With OpenAi GPT</span>
        </h1>
        <h2 className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima repellat animi dignissimos sequi! Voluptas, culpa delectus! Tenetur voluptatum numquam vel, repellat maiores,
             dicta architecto quis aspernatur quisquam aliquid voluptates totam?
        </h2>
    </header>
  )
}

export default Hero
