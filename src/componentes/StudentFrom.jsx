import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function From() {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        name: '',
        roll_no: '',
        class: '',
        session: '',
        address: '',
        contect: '',
        college:'',
        file: null,

    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'file') {
            setDetails({ ...details, [name]: files[0] });
        } else {
            setDetails({ ...details, [name]: value });
        }
    }

    const handlesubmit = (e) => {
        e.preventDefault();
    
        const file = details.file;
        const reader = new FileReader();
    
        reader.onloadend = () => {
            const base64String = reader.result;
    
            // Save both image and details in localStorage
            localStorage.setItem('myImage', base64String);
    
            // Save details WITHOUT file (to avoid circular structure)
            const { file, ...rest } = details;
            localStorage.setItem('userData', JSON.stringify(rest));
    
            // Navigate after saving
            navigate('/');
        };
    
        if (file) {
            reader.readAsDataURL(file); // Convert image to base64 and call reader.onloadend
        } else {
            // If no image, save only the text details
            const { file, ...rest } = details;
            localStorage.setItem('userData', JSON.stringify(rest));
            navigate('/');
        }
    };
    
    return (
        <div className=' h-screen flex justify-center items-center flex-wrap'>
            <div className="min-w-96 ">
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                    <legend className="fieldset-legend">student details</legend>

                    <legend className="fieldset-legend">What is your name?</legend>
                    <input required type="text" name='name' onChange={handleChange} className="input" placeholder="Type here" />

                    <legend className="fieldset-legend">What is your college name?</legend>
                    <input required type="text" name='college' onChange={handleChange} className="input" placeholder="Type here" />

                    <legend className="fieldset-legend">What is your ID no. ?</legend>
                    <input required type="text" name='roll_no' onChange={handleChange} className="input" placeholder="Type here" />

                    <legend className="fieldset-legend">What is your Address?</legend>
                    <input required type="text" name='address' onChange={handleChange} className="input" placeholder="Type here" />

                    <legend className="fieldset-legend">What is your contect no. ?</legend>
                    <input required type="number" name='contect' onChange={handleChange} className="input" placeholder="Type here" />

                    <legend className="fieldset-legend">What is your class?</legend>
                    <select defaultValue="Pick a text editor" name='class' onChange={handleChange} className="select ">
                        <option>select your class</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>

                    <legend className="fieldset-legend">What is your session?</legend>
                    <select defaultValue="Pick a text editor" name='session' onChange={handleChange} className="select ">
                        <option >select your session</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                    </select>
                    <legend className="fieldset-legend">Enter your photo?</legend>
                    <input type="file" required name='file' accept='Image/*' onChange={handleChange} className="file-input file-input-bordered w-full max-w-xs" />

                    <legend className="fieldset-legend"></legend>
                    <button type='submit' onClick={handlesubmit} className="btn btn-primary  w-full max-w-xs">sumbit</button>
                </fieldset>
            </div>

        </div>
    );
}

export default From;
