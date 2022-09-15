import React from 'react';
import { useSelector } from 'react-redux';
import UnAuthorized from '../Extra/UnAuthorized';

const Auth = ({element}) => {
    const {userType} = useSelector((state)=> state.login);
    if(userType !== 'admin'){
        return <UnAuthorized />
    }
    return (
        <>
            {element}
        </>
    );
}

export default Auth;