const subjects_test = [
  { id: 1, name: 'Matematica', image: 'https://placehold.co/600x400?text=Matematica' },
  { id: 2, name: 'Storia', image: 'https://placehold.co/600x400?text=Storia' },
  { id: 3, name: 'Scienze', image: 'https://placehold.co/600x400?text=Scienze' },
  { id: 4, name: 'Geografia', image: 'https://placehold.co/600x400?text=Geografia' },
];

export const MaterieGrid = ({ materie = subjects_test, handleMateriaClick = (subject) => console.log(subject) }) => {

  return (
   <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="max-w-7xl px-4 mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-white">
          Scegli una Materia
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {(!materie || materie.length === 0) && (
            <h3 className="text-center text-white">
              Non ci sono Materie disponibili, controllare il DB
            </h3>
          )}
          {materie.map((subject) => (
            <div
              key={subject.id}
              className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
              onClick={() => handleMateriaClick(subject)}
            >
              <div className="p-0">
                <img
                  src={subject.imageUrl}
                  alt={`Immagine per ${subject.name}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="py-4 px-4 text-center bg-gray-750/30 backdrop-blur-sm border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white">{subject.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}