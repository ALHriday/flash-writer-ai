import axios from 'axios';
import { useState } from 'react';
import './Banner.css';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const { user } = useAuth();
    const [output, setOutput] = useState('');
    const [inputVal, setInputVal] = useState('');

    const navigate = useNavigate();
    

    // const outputData = output.replace(/(\d+\.)/g, '\n$1');

    const outputBG = output ? 'bg-slate-200' : '';

    const handleTestAi = async (value) => {

        if (!value) {
            return alert('Please Provide Any Query...');
        }

        if (!user) {
            return navigate('/register');
        }

        if (inputVal) {
            const data = await axios.get(`https://crack-ai-server-lovat.vercel.app/test-ai?prompt=${value}`)
            setOutput(data.data);

            // http://localhost:3100/test-ai?
            // https://crack-ai-server-lovat.vercel.app/test-ai
        }
    }

    return (
        <div className="banner w-full min-h-screen">
            <div className=' flex flex-col justify-center items-center gap-6'>
                <div className='mt-6'>
                    <h1 className='text-5xl font-bold text-teal-900'>Crack AI</h1>
                </div>
                <div className='flex gap-2 justify-center items-center'>
                    <input
                        onChange={(e) => setInputVal(e.target.value)}
                        name=''
                        className='p-2 bg-slate-200 outline-2 outline-teal-400 focus:bg-slate-100 border-2 text-black border-teal-500 rounded-xl shadow-md'
                        type="text" />
                    <button onClick={() => handleTestAi(inputVal)} className='btn bg-teal-600 rounded-xl text-xl border border-slate-300 text-white'>Search</button>
                </div>
                <div className={`${outputBG} p-3 w-10/12 max-h-[240px] overflow-auto border-t-2 rounded-md border-teal-200 mx-auto text-black`}>
                    {output ? <p>{output}</p> : <p className='text-center'>Search any query using Flash Writer.</p>}
                </div>
            </div>
        </div>
    );
};

export default Banner;