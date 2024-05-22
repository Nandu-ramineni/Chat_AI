import axios from 'axios';
import { useContext, useState } from 'react';
import { FcNfcSign, FcPanorama, FcFinePrint, FcPuzzle, FcSurvey } from "react-icons/fc";
import { FiCopy } from 'react-icons/fi'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContext } from '../../Context/DataProvider';

const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(false);
    const {Account}= useContext(DataContext)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/generate', { prompt });
            const responseData = response.data;
            setResponses([...responses, responseData]);
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
        setPrompt(''); 
    };
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success('Code copied!');
            })
            .catch(err => console.error('Could not copy text: ', err));
    };
    

    return (
        <div className='min-h-[80vh] flex flex-col justify-between relative'>
            <ToastContainer position="top-right" autoClose={3000} z-10 />
            {responses.length > 0 && (
                <div className='w-3/5 my-5 mx-auto h-[80vh] overflow-y-scroll no-scrollbar'>
                    {responses.map((response, index) => (
                        <div key={index}>
                            <h2 className='font-semibold text-lg flex items-center gap-2 pb-4 pt-2'>
                                <FcNfcSign className='text-[#65A648] text-2xl' /> Here{"'"}s the result:
                            </h2>
                            {response.isCode ? (
                                <div className='relative pb-4'>
                                    <code>
                                        <pre className='bg-black border border-gray-300 text-white p-5 mb-5 rounded-2xl' style={{ whiteSpace: 'pre-wrap' }}>
                                            {response.generatedText}
                                        </pre>
                                    </code>
                                    <button 
                                        className='absolute top-2 right-2  text-white p-1 flex items-center gap-2'
                                        onClick={() => handleCopy(response.generatedText)}
                                    >
                                        <FiCopy className='text-lg' /> 
                                    </button>
                                </div>
                            ) : (
                                response.generatedText.split('\n').map((line, index) => (
                                    <div key={index} className='pb-1'>
                                        <p  style={{ whiteSpace: 'pre-wrap' }} >{line}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    ))}
                </div>
            )}
            {loading && <p className='loader fixed bottom-20 w-full text-center'></p>}
            {!loading && responses.length === 0 && (
                <div className='block justify-center items-center my-auto'>
                    <FcNfcSign className='text-[#65A648] text-9xl mx-auto' />
                    <div className='hidden justify-center items-center w-1/2 mx-auto my-auto md:flex'>
                        <div className='px-4 py-8 rounded-md bg-[#EEEEEE] mx-2 border w-[150px] cursor-pointer hover:drop-shadow-md'>
                            <FcPanorama className='text-xl' />
                            <p>RRR{"'"}s Movie Story</p>
                        </div>
                        <div className='px-4 py-8 rounded-md bg-[#EEEEEE] mx-2 border w-[150px] cursor-pointer hover:drop-shadow-md'>
                            <FcFinePrint className='text-xl' />
                            <p>Spam Mail detection</p>
                        </div>
                        <div className='px-4 py-8 rounded-md bg-[#EEEEEE] mx-2 border w-[150px] cursor-pointer hover:drop-shadow-md'>
                            <FcPuzzle className='text-xl' />
                            <p>Design a fun code game</p>  
                        </div>
                        <div className='px-4 py-8 rounded-md bg-[#EEEEEE] mx-2 border w-[150px] cursor-pointer hover:drop-shadow-md'>
                            <FcSurvey className='text-xl' />
                            <p>Study Vocabulary</p>
                        </div>
                    </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className='fixed bottom-0 w-full z-10 text-center py-4 shadow-md'>
                <label>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder='Ask Chat Ai'
                        className='w-1/2 px-2 py-2.5 mr-2 bg-[#EEEEEE] border-none rounded-xl outline-none focus:ring-2 focus:ring-[#65A648] transition-all'
                    />
                </label>
                <button type="submit" className='py-2.5 px-5 bg-[#65A648] text-white border-none cursor-pointer rounded-lg hover:bg-[#4C7F2D] transition-all'>
                    Generate
                </button>
            </form>
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
};

export default Home;
