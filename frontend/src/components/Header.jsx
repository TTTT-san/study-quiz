import { Link } from 'react-router-dom';

export const Header = () => {
    return (

        <header className="sticky top-0 z-10 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700 shadow-lg">
            <div className="flex justify-between items-center py-4 px-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center space-x-3">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                    <Link to="/" className="flex items-center">
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            App Quiz
                        </h1>
                    </Link>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="#login" className="px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="#register" className="px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                                Registrati
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    )
}