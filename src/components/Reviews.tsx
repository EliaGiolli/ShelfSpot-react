import { useTheme } from "../custom hooks/useTheme"
import { reviews } from "../services/homePageData"

function Reviews() {

  const theme = useTheme();
   // Theme-based classes
  const background = theme === 'light' ? 'bg-white' : 'bg-amber-950';
  const subtitle = theme === 'light' ? 'text-amber-700' : 'text-amber-300';
  const quoteBg = theme === 'light' ? 'bg-amber-50 text-gray-800' : 'bg-amber-900 text-white';
  
  return (
    <>
      <div className={`${background} py-16 px-6 max-w-6xl mx-auto rounded-lg shadow-md`}>
        <h2 className={`${subtitle} text-3xl font-bold mb-10 text-center`}>What Our Readers Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
        {reviews.map(({ name, text }, i) => (
            <blockquote key={i} className={`${quoteBg} p-6 rounded-lg shadow-md`}>
            <p className="mb-4 italic">"{text}"</p>
            <footer className={`${subtitle} font-semibold`}>— {name}</footer>
            </blockquote>
        ))}
        </div>
      </div>    
    </>
  )
}

export default Reviews