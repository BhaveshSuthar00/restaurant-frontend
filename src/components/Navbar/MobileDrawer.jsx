import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Flex,
    VStack
} from '@chakra-ui/react'

import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import React, {useRef} from 'react'
import { Link } from 'react-router-dom'
import { userLoggout } from '../../redux/login'
import { IconButton } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
const MobileDrawer = ({isLoggedIn}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Flex>
            {/* <Button ref={btnRef} colorScheme='teal' variant="ghost" onClick={onOpen}>
                Open
            </Button> */}
            <IconButton variant='ghost' onClick={onOpen} icon={<HamburgerIcon />}/>
            <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
            >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody >
                    <VStack alignItems="left">
                        <Button as={Link} to='/' mr={3} variant="ghost"
                            colorScheme="teal"
                            onClick={onClose}
                        >
                            Home
                        </Button>
                        {
                            !isLoggedIn ?
                            <Button as={Link} to='signup' mr={3} variant="ghost"
                                colorScheme="teal"
                                onClick={onClose}
                            >
                                Sign up
                            </Button>
                            : null
                        }
                        {
                            !isLoggedIn ? 
                                <Button as={Link} to='login' mr={3} variant="ghost"
                                    colorScheme="teal"
                                onClick={onClose}
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
                                        onClose()
                                    }}
                                >
                                    Log out
                                </Button>
                        }
                    </VStack>
                </DrawerBody>                
            </DrawerContent>
            </Drawer>
        </Flex>
    )
}

export default MobileDrawer