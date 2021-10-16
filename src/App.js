import React, { useEffect } from 'react';

import AOS from 'aos';

import { FAQ } from './container';

import 'aos/dist/aos.css';

function App() {
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    return <FAQ></FAQ>;
}

export default App;
