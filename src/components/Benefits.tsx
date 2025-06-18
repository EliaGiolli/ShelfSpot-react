import { benefits } from '../services/homePageData'

function Benefits() {
  return (
    <>
     <section className="py-16 bg-amber-50 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-amber-700 mb-12">Why Choose ShelfSpot?</h2>
        <div className="grid gap-10 md:grid-cols-3">
        {benefits.map(({ icon, title, description }, i) => (
            <div key={i} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-amber-700 mb-2">{title}</h3>
            <p className="text-gray-700">{description}</p>
            </div>
        ))}
        </div>
     </section>
    </>
  )
}

export default Benefits