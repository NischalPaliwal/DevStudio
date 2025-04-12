import { Github, Terminal, Zap, Box, Code2, Sparkles, ChevronRight, Heart, Globe, Twitter, Linkedin } from 'lucide-react';
import Starfield from 'react-starfield';
import FeatureCard from "../components/FeatureCard";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DevPic from "../images/nischal_jodhpur_profile_pic.jpg";

const LandingPage = () => {
    const [prompt, setPrompt] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e : React.FormEvent) => {
      e.preventDefault();
      navigate('/build', { state: { prompt } });
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          <Starfield
            starCount={1000}
            starColor={[255, 255, 255]}
            speedFactor={0.05}
            backgroundColor="black"
          />
          {/* Navigation */}
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Terminal className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold">DevStudio</span>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-8">
              <a href="#" className="hover:text-blue-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Templates</a>
              <a onClick={() => (window.open('https://github.com/NischalPaliwal/DevStudio'))} className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </nav>
    
          {/* Hero Section */}
          <main className="container mx-auto px-6 pt-20 pb-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-t from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Build. Deploy. Scale.
              </h1>
              <p className="text-xl text-gray-300 mb-12">
                The fastest way to create and deploy web applications. Start coding in seconds with our powerful development environment.
              </p>
              
              {/* Enhanced Input Box */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <Sparkles className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-gray-300">AI-Powered Website Generator</span>
                  </div>
                  <textarea
                    className="w-full bg-gray-900/50 border border-gray-700/50 focus:ring-2 focus:ring-blue-500 rounded-xl p-4 text-white placeholder-gray-400 resize-none transition-all duration-200 hover:bg-gray-900/70"
                    placeholder="Describe your dream project (e.g., 'Create a modern e-commerce site with a dark theme and animated transitions')"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
              </div>
              
              <button 
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center mx-auto space-x-2 transition-colors"
              >
                <span>Start Building</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
    
            {/* Enhanced Creator Card */}
            <div className="max-w-2xl mx-auto mt-24 bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 border border-gray-700/50">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <img
                    src={DevPic}
                    alt="Nischal Paliwal"
                    className="w-48 h-48 rounded-xl object-cover ring-4 ring-blue-500/20 hover:scale-150 cursor-pointer"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-blue-500 rounded-full p-2">
                    <Terminal className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">Nischal Paliwal</h3>
                  <p className="text-blue-400 font-medium mb-4">Creator of DevStudio</p>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Full-stack developer and AI enthusiast with a passion for creating developer tools that make coding more accessible and enjoyable. With over 1 year of experience in web development, I'm on a mission to revolutionize how we build applications.
                  </p>
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Globe className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-32">
              <FeatureCard
                icon={<Zap className="w-8 h-8 text-yellow-400" />}
                title="Instant Development"
                description="Start coding immediately with zero setup. Your development environment is ready in milliseconds."
                alert={true}
              />
              <FeatureCard
                icon={<Box className="w-8 h-8 text-blue-400" />}
                title="Pre-built Templates"
                description="Choose from dozens of production-ready templates to jumpstart your project."
                alert={false}
              />
              <FeatureCard
                icon={<Code2 className="w-8 h-8 text-green-400" />}
                title="Smart Autocomplete"
                description="Advanced code completion powered by AI to help you write better code faster."
                alert={false}
              />
              <FeatureCard
                icon={<Sparkles className="w-8 h-8 text-purple-400" />}
                title="AI Assistance"
                description="Get intelligent suggestions and code improvements as you type."
                alert={true}
              />
              <FeatureCard
                icon={<Terminal className="w-8 h-8 text-red-400" />}
                title="Full Terminal Access"
                description="Complete access to a powerful terminal environment for advanced workflows."
                alert={true}
              />
              <FeatureCard
                icon={<Github className="w-8 h-8 text-gray-400" />}
                title="Git Integration"
                description="Seamless GitHub integration for version control and collaboration."
                alert={false}
              />
            </div>
          </main>
    
          {/* Code Preview Section */}
          <section className="bg-gray-800/50 py-20">
            <div className="container mx-auto px-6">
              <div className="bg-gray-900 rounded-xl p-6 max-w-4xl mx-auto overflow-hidden">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{`import React from 'react';
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0);
      
      return (
        <div className="container">
          <h1>Welcome to DevStudio</h1>
          <button onClick={() => setCount(count + 1)}>
            Count is {count}
          </button>
        </div>
      );
    }`}</code>
                </pre>
              </div>
            </div>
          </section>
    
          {/* Footer */}
          <footer className="py-6 bg-gray-800/30">
            <div className="container mx-auto px-6 text-center text-gray-400">
              <p className="flex items-center justify-center space-x-2">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>by Nischal Paliwal</span>
              </p>
            </div>
          </footer>
        </div>
      );
    }

export default LandingPage;