// import React, { useEffect, useRef } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import CreateRestoreWallet from "./pages/CreateRestoreWallet";
// import WalletDashboard from "./pages/WalletDashboard";
// import SendTransaction from "./pages/SendTransaction";

// const App = () => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.playbackRate = 1.4; // Set playback speed to 1.25x
//     }
//   }, []);

//   return (
//     <Router>
//       <div id="root">
//         {/* Video Background */}
//         <video
//           ref={videoRef}
//           className="background-video"
//           autoPlay
//           loop
//           muted
//           playsInline
//         >
//           <source src="/images/block.webm" type="video/webm" />
//           <source src="/images/block.mp4" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>

//         {/* Background Overlay */}
//         <div className="overlay"></div>

//         {/* Content */}
//         <div className="flex flex-col min-h-screen relative z-10">
//           <Navbar />
//           <main className="flex-grow container mx-auto px-4 py-8">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/create-restore" element={<CreateRestoreWallet />} />
//               <Route path="/dashboard" element={<WalletDashboard />} />
//               <Route path="/send" element={<SendTransaction />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CreateRestoreWallet from "./pages/CreateRestoreWallet";
import WalletDashboard from "./pages/WalletDashboard";
import SendTransaction from "./pages/SendTransaction";
import { WalletProvider } from "./contexts/WalletContext";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.4; // Set playback speed
    }
  }, []);

  return (
    <Router>
      <WalletProvider>
        <div id="root">
          <video
            ref={videoRef}
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/images/block.webm" type="video/webm" />
            <source src="/images/block.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="overlay"></div>
          <div className="flex flex-col min-h-screen relative z-10">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/create-restore"
                  element={<CreateRestoreWallet />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <WalletDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/send"
                  element={
                    <ProtectedRoute>
                      <SendTransaction />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </WalletProvider>
    </Router>
  );
};

export default App;
