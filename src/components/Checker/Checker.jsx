import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Checker({element}) {
    const cookie = new Cookies();
    if(!cookie.get('currentU')){
        return <Navigate to='/login' />
    }
    return (
        <>
            {element}
        </>
    );
}

export default Checker;