import React, { useState } from 'react';
import WebpackImage from '@img/webpack.jpg';

const App = () => {
    const [ message, setMessage ] = useState('Hello world !!');
    const [ showImage, setShowImage ] = useState(false);

    const reverseMessage = () => {
        const messageReversed = message.split('').reverse().join('');
        setMessage(messageReversed);
        setShowImage(!showImage);
    }

    return (
        <div>
            <h1 onClick={reverseMessage}>
                { message }
            </h1>
            {
                showImage &&
                <img
                    src={WebpackImage}
                    alt="You were the chosen one !"
                />
            }
        </div>
    );
};

export default App;
