/*Home.jsx is the landing page for Cook Along.
It should introduce the app, show the logo, and let users search for recipes.
This page should feel polished and welcoming.*/
import React from 'react'
import CookAlongLogo from '../assets/CookAlong.svg'
import SearchBar from '../components/SearchBar'
import './Home.css'

function Home({ searchTerm, setSearchTerm, goToRecipes }) {

  return (
    <main className="home-page">
       <div className="home-content">
            <header className="top-bar">
                <div className="logo-container">
                <img src={CookAlongLogo} className="Cook-Along-logo" alt="Cook Along Logo" />
                </div>
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={() => goToRecipes()}
                />
            </header>
            <section className="info-section">
                <div className="welcome-section">
                    <h1>Welcome to Cook Along!</h1>
                    <p>Discover delicious recipes and cooking tips. 
                        Find beginner-friendly recipes and follow 
                        step-by-step guidance with voice support and timers.
                    </p>
                </div>
                <div className="featured-section">
                    <h2>Popular Recipes</h2>
                    <p>Explore our handpicked selection of popular recipes to get started.</p>
                </div>
            </section>
        </div>
    </main>   
  )
}   
export default Home;
