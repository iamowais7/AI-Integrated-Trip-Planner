import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


function Hero() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white min-h-screen">
      <h1 className="font-extrabold text-[45px] md:text-[60px] leading-tight">
        <span className="text-yellow-300">Discover Your Next Adventure with AI:</span> <br />
        Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-lg md:text-xl text-gray-200 max-w-2xl mt-4">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={"/create-trip"}>
        <Button className="mt-6 px-6 py-3 bg-yellow-400 text-black text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all">
          Get Started, It's Free
        </Button>
      </Link>
      <img
        src="/pic.jpg"
        alt="Travel"
        className="mt-10 w-full max-w-lg rounded-2xl shadow-lg"
      />
    </div>
    {/* <Footer/> */}
    </div>
  );
}

export default Hero;