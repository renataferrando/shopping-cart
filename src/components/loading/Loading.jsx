import React, { useState, useEffect } from 'react';
import './_loading.scss';

const Loading = () => {
// const [isLoading, setIsLoading] = useState(true);
// useEffect(() => {
//     const timeout = setTimeout(() => {
//         setIsLoading(false);
//     }, 1000)
// })  
    return (
        <>
            <div className='loading'></div>
        </>
    );
};

export default Loading;