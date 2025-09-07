import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@heroui/react';

import QuizConfigForm from '../components/QuizConfigForm';


import { MaterieGrid } from "../components/MaterieGrid";
import { Header } from "../components/Header";
import { BASE_API } from '../costanti';

export const HomeScreen = () => {
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isGridVisible, setIsGridVisible] = useState(true);
    const navigate = useNavigate();

    const [materie, setMaterie] = useState([])



    useEffect(() => {
        const getMaterie = async () => {
            const response = await fetch(`${BASE_API}/materie`)
            if (!response.ok) {
                throw new Error(`Errore: ${response.status}`);
            }
            const materieData = await response.json()
            console.log("materie: ", materieData)

            setMaterie(m => materieData)
        }
        getMaterie()
    }, [])

    const handleMateriaClick = (subject) => {
        setSelectedMateria(subject);
        setIsFormOpen(true);
        setIsGridVisible(false);
    };

    const handleCloseFormAndShowGrid = () => {
        setIsFormOpen(false);
        setSelectedMateria(null);
        setIsGridVisible(true);
    };


    const onGenerate = (quizConfig) => {
        console.log("home: configuser ", quizConfig)
        navigate(`/quiz/${quizConfig?.materiaId}`)
    }
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">

            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-indigo-700/80 to-purple-800/80 py-16 md:py-24 text-center">
                <div className="max-w-3xl px-4 mx-auto">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-md">
                        Benvenuto nell'App Quiz!
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto">
                        Metti alla prova le tue conoscenze nelle varie materie.
                    </p>
                </div>
            </section>

            {isGridVisible && (
                <main className="flex-grow py-12">
                    <MaterieGrid
                        materie={materie}
                        handleMateriaClick={handleMateriaClick}
                    />
                </main>
            )}
            {isFormOpen && (
                <div className="fixed bottom-6 right-6 z-20">
                    <Button
                        color="primary" 
                        variant="solid"
                        size="lg"
                        className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                        onPress={handleCloseFormAndShowGrid} 
                        aria-label="Torna alle materie"
                    >
                        ← Indietro
                    </Button>
                </div>
            )}

            {isFormOpen && selectedMateria && (
                <QuizConfigForm
                    materiaId={selectedMateria.id}
                    materiaName={selectedMateria.name}
                    onGenerate={onGenerate}
                />
            )}
        </div>
    );
}