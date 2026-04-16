import React from "react";

const Profile = () => {
    return (
        
            <div className="relative w-[320px] h-[420px] rounded-3xl overflow-hidden shadow-lg">

                <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-center p-4">
                    <h2 className="text-3xl text-white font-semibold tracking-wide">
                        Marline Betbye
                    </h2>
                    </div>
                {/* Background Image */}
                <img
                    src="https://i.pinimg.com/736x/86/51/3b/86513bc71634cab7447fa8ed2e9e8112.jpg"
                    alt="profile"
                    className="w-full h-full object-cover"
                />


                <div className="absolute bottom-0 left-0 right-0 h-60 pointer-events-none">
                    {/* Blur layer */}
                    <div
                        className="absolute inset-0 backdrop-blur-xl bg-white/10"
                        style={{
                            WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                            maskImage: "linear-gradient(to top, black 20%, transparent 100%)",
                        }}
                    />

                    {/* Optional grain */}
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('/noise.png')]" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">

                    <h2 className="text-lg font-semibold tracking-wide">
                        Marline Betbye
                    </h2>
                </div>
            </div>
    );

};

export default Profile;