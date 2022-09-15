import { Text } from '@chakra-ui/react';
import { deleteUser, getAllUsers, updateUser } from '../../redux/users';
import { Box } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@chakra-ui/react';
import { ModalHeader } from '@chakra-ui/react';
import { ModalBody } from '@chakra-ui/react';
import { ModalFooter } from '@chakra-ui/react';
import { ModalCloseButton } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { ModalContent } from '@chakra-ui/react';
import { ModalOverlay } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { userLoggout } from '../../redux/login';
import AdminSignIn from './adminSignIn';
import { Center } from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
const PopOverEdit = ({type,email, name, id}) => {
    const toast = useToast();
    const navigate = useNavigate();
    const { userName } = useSelector((state)=> state.login);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editedForm, setEditedForm] = useState({
        type : type,
        email : email,
        name : name,
    });
    const dispatch = useDispatch();
    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        const a = type;
        const oldEmail = email;
        const userNam = name;

        if(editedForm.type !== a || oldEmail !== editedForm.email || userNam !== editedForm.name ||  editedForm.password) {
            dispatch(updateUser(id, editedForm)).then(()=> {
                toast({
                    title: 'Updated Successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            }).catch((err)=> {
                toast({
                    title: 'Update User Failed',
                    description: err.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            });
            if(userName === editedForm.name){
                dispatch(userLoggout());
                navigate('/login');
            }
        } else {
            toast({
                title: 'Not Updated',
                description: "No changes were made by admin please try again.",
                status: 'warning',
                duration: 2000,
                isClosable: true,
            })
        }
        onClose();
    }
    const handleChange = (field)=>{
        const { id, value } = field.target;
        console.log(id, value)
        setEditedForm({...editedForm, [id] : value});
    }
    return (
        <>
        <IconButton
            onClick={onOpen}
            icon={<EditIcon />}
            h={'auto'}
        />
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
            <ModalHeader>Edit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box as='form' onSubmit={handleSubmitUpdate}>
                    <FormControl m={2}>
                        <FormLabel htmlFor='type'>User Type</FormLabel>
                        <Select onChange={handleChange} id='type' value={editedForm.type}>
                            <option value="regular">Regular</option>
                            <option value="admin">Admin</option>
                        </Select>
                    </FormControl>
                    <FormControl m={2}>
                        <FormLabel htmlFor='email'>Change Email</FormLabel>
                        <Input type='email' id='email' onChange={handleChange} defaultValue={editedForm.email} isRequired={true}/>
                    </FormControl>
                    
                    <FormControl m={2}>
                        <FormLabel htmlFor='name'>Change Name</FormLabel>
                        <Input type='text' id='name' onChange={handleChange} defaultValue={editedForm.name} isRequired={true}/>
                    </FormControl>
                    
                    <FormControl m={2}>
                        <FormLabel htmlFor='password'>Change Password</FormLabel>
                        <Input type='password' id='password'  
                        onChange={handleChange} 
                        autoComplete="true" 
                        pattern={"^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$"} 
                        placeholder='Enter upper/lowercase password'
                        />
                    </FormControl>
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
function UserPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const {users} = useSelector((state)=> state.users);
    const {userType, userId} = useSelector((state)=> state.login);
    const handleDelete = (item)=>{
        dispatch(deleteUser(item._id)).then(()=>{
                toast({
                    title: 'Account deleted successfully',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                if(userType === 'admin' && item._id === userId){
                    dispatch(userLoggout())
                    navigate('/login');

                }
            }).catch((err)=>{
                toast({
                    title: 'Error occured',
                    description: err.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            });
    } 
    useEffect(()=>{
        dispatch(getAllUsers());
    },[dispatch])
    return (
        <>
            <Center mt={5}> 
                <AdminSignIn />
            </Center>
            <Box display="flex" gap={4} w="100%" flexWrap='wrap' justifyContent="space-evenly" mt={4} mb={4}>
                {users && users.map((item)=> (
                    <Box 
                        key={item._id}
                        p={4}
                        borderRadius={20}
                        fontSize='18px' 
                        w={{base : "46%", lg : "46%", md : "100%", sm : "100%"}}
                        boxShadow='lg'
                    >
                        <Text>User Name : {item.name}</Text>
                        <Text>User Email : {item.email}</Text>
                        <Box display='flex' align='center'>
                            <Box mr={4}>
                                <Text>{item.type}</Text>
                            </Box>
                            <PopOverEdit id={item._id} name={item.name} email={item.email}  type={item.type}/>
                            <IconButton ml={3} onClick={()=> handleDelete(item)} icon={<DeleteIcon />} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
}

export default UserPage;