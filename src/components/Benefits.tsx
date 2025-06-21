import { useTheme } from '../custom hooks/useTheme'
import { benefits } from '../services/homePageData'

function Benefits() {

  const theme = useTheme();
   // Theme-based classes
  const bgSection = theme === 'light' ? 'bg-amber-50' : 'bg-amber-950';
  const subtTitle = theme === 'light' ? 'text-amber-700' : 'text-amber-300';
  const cardBg = theme === 'light' ? 'bg-white' : 'bg-amber-900';
  const cardSubtitle = theme === 'light' ? 'text-amber-700' : 'text-amber-300';
  const cardText = theme === 'light' ? 'text-gray-700' : 'text-white' ;

  return (
    <>
     <section className={`${bgSection} py-16 px-6 max-w-6xl mx-auto text-center`}>
        <h2 className={`${subtTitle} text-3xl font-bold mb-12`}>Why Choose ShelfSpot?</h2>
        <div className="grid gap-10 md:grid-cols-3">
        {benefits.map(({ icon, title, description }, i) => (
            <div key={i} className={`${cardBg} flex flex-col items-center p-6 rounded-lg shadow-md`}>
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className={`${cardSubtitle} text-xl font-semibold mb-2`}>{title}</h3>
            <p className={`${cardText}`}>{description}</p>
            </div>
        ))}
        </div>
     </section>
    </>
  )
}

export default Benefits