import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MobileDrawer from './MobileDrawer'
import { ColorModeSwitcher } from '../../ColorModeSwitcher'
import { userLoggout } from '../../redux/login'
const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoggedIn, userType, userName} = useSelector((store)=> store.login);
    return (
    <Flex  
        top={0}
        bottom={0}
        left={0}
        zIndex={100}
        boxShadow='lg'
        rounded='md' 
        backdropFilter='auto' 
        backdropBlur='8px'
        p={[0,3]} 
        w="full"
        position="sticky"
        fontSize={21}
    >
        <Box>
            <Text ml={5} fontWeight="500" cursor='pointer' onClick={()=> navigate('/')}>
                MarQuee Restaurant 
            </Text>
        </Box>
        <Spacer />
        <ColorModeSwitcher />
        <Box
            display={{base : 'flex',lg : "flex", md : "none", sm : 'none'}}
        >
            <Link to='/'>
                <Button mr={3} variant="ghost"
                    colorScheme="teal"
                >
                    Home
                </Button>
            </Link>
            {
                !isLoggedIn ?
                <Link to='signup'>
                <Button mr={3} variant="ghost"
                    colorScheme="teal"
                >
                    Sign up
                </Button>
                </Link> : null
            }
            {
                !isLoggedIn ? 
                    <Button as={Link} to='login' mr={3} variant="ghost"
                        colorScheme="teal"
                    >
                        Login
                    </Button>
                :
                    <Button
                    mr={3} variant="ghost"
                    colorScheme="teal"
                    onClick={()=>{
                        dispatch(userLoggout())
                        navigate('login')
                    }}
                    >
                        Log out
                    </Button>
            }
        </Box>
        {
            userType === 'admin' && (
                <>
                <Button
                    as={Link} 
                    variant="ghost"
                    colorScheme="teal"
                    to='/admin'>
                        Admin {userName}
                </Button>
                <Button
                    as={Link} 
                    variant="ghost"
                    colorScheme="teal"
                    to='users'>
                        Users
                </Button>
                </>
                
            )
        }
        <Box
            display={{base : 'none',lg : "none", md : "flex", sm : 'flex'}}
        >
            <MobileDrawer isLoggedIn={isLoggedIn}/>
        </Box>
    </Flex>
    )
}

export default Navbar