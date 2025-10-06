function Banner({ onStartBrowsing }: { onStartBrowsing: () => void }) {
    return (
        <div className="relative w-full py-20 text-center">
            <h1 className="px-8 max-w-4xl mx-auto text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-accent-foreground">
                Find the Best Courses at Carleton with {" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    Real Student Reviews
                </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-foreground">
                Browse ratings, compare classes, and plan your semester with confidence.
            </p>
            <p className="mt-8">
                <button 
                    className="px-6 py-3 rounded-2xl bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 text-white font-semibold shadow-lg hover:opacity-90 transition"
                    onClick={onStartBrowsing}
                >
                    Start Browsing
                </button>
            </p>
        </div>
    );
}

export default Banner;
