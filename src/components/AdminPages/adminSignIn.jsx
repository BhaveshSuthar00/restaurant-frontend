import { Box } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@chakra-ui/react';
import { ModalHeader } from '@chakra-ui/react';
import { ModalBody } from '@chakra-ui/react';
import { ModalFooter } from '@chakra-ui/react';
import { ModalCloseButton } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { InputGroup } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { ModalContent } from '@chakra-ui/react';
import { ModalOverlay } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { addUserByAdmin } from '../../redux/login';
import { InputRightElement } from '@chakra-ui/react';
import { getAllUsers } from '../../redux/users';
const AdminSignIn = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const handelSubmit = (event)=>{
        event.preventDefault();
        onClose();
        let data = {
            name : document.getElementById('first_name').value, 
            password : document.getElementById('password').value, 
            email : document.getElementById('email').value
        }
        dispatch(addUserByAdmin(data)).then(()=>{
            toast({
                title: 'Sign up successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            dispatch(getAllUsers());
        }).catch((err)=>{
            toast({
                title: 'Sign up failed',
                description: err.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        })
    }
    return (
        <>
        <Button
            onClick={onOpen}
            variant='link'
        >
            Add new User Account
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
            <ModalHeader>Edit restaurant</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box as='form' onSubmit={handelSubmit}>
                <Stack spacing={4}>
                    <FormControl id="firstName" isRequired={true}>
                        <FormLabel>First Name</FormLabel>
                        <Input type="text" id='first_name' placeholder="User Name"/>
                    </FormControl>
                <FormControl id="email" isRequired={true}>
                    <FormLabel>Email </FormLabel>
                    <Input type="email" id='email' placeholder="Email"/>
                </FormControl>
                <FormControl id="password" isRequired={true}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                    <Input id="password" type={showPassword ? 'text' : 'password'} 
                        autoComplete="true" 
                        pattern={"^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$"} 
                        placeholder='Enter upper/lowercase password'
                    />
                    <InputRightElement h={'full'}>
                        <Button
                        variant={'ghost'}
                        onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                </FormControl>
                </Stack>
                    <HStack>
                        <Input type='submit' m={2} variant={'ghost'} />
                        <Button onClick={onClose} variant={'ghost'}>Close</Button>
                    </HStack>
                </Box>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </ModalContent>
        </Modal>
        </>
    )
}
export default AdminSignIn;