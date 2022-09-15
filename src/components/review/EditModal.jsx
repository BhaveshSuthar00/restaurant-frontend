import { Box } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@chakra-ui/react';
import { ModalHeader } from '@chakra-ui/react';
import { ModalBody } from '@chakra-ui/react';
import { ModalFooter } from '@chakra-ui/react';
import { ModalCloseButton } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { ModalContent } from '@chakra-ui/react';
import { ModalOverlay } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRestaurants } from '../../redux/rest';
import { UpdateRestaurant } from '../../redux/SingleRestro';
const EditModal = ({props}) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editedForm, setEditedForm] = useState(props);
    const dispatch = useDispatch();
    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        const a = props.averageRating;
        const i = props.imageUrl;
        const n = props.name;
        const l = props.location;
        const {name, imageUrl, averageRating, location} = editedForm;
        if(name !== n || location !== l || imageUrl !== i || Number(averageRating) !== Number(a)){
            dispatch(UpdateRestaurant(props._id, {name, imageUrl, averageRating, location})).then(()=> {
                toast({
                    title: 'Updated Successfully',
                    description: "Restaurant Updated without any issues.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                dispatch(fetchRestaurants());
            }).catch(()=> {
                toast({
                    title: 'Updating Failed',
                    description: "Restaurant Updated Failed.",
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            });
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
    const handleFormValueChange = (field)=>{
        const {id, value} = field.target;
        setEditedForm({...editedForm, [id] : value});
    }
    useEffect(()=>{
        return(()=>{
            setEditedForm(null);
        })
    },[])
    return (
        <>
        <Button
            onClick={onOpen}
        >
            Edit Restaurant
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
                <Box as='form' onSubmit={handleSubmitUpdate}>
                    <FormControl m={2}>
                        <Input type='text' id='name' autoFocus={true} defaultValue={props.name} onChange={handleFormValueChange} required={true} placeholder='Change Restaurant Name'/>
                    </FormControl>
                    <FormControl m={2}>
                        <Textarea type='text' id='location' defaultValue={props.location} onChange={handleFormValueChange} required={true} placeholder='Change Restaurant location'/>
                    </FormControl>
                    <FormControl m={2}>
                        <Input type='text' id='imageUrl' defaultValue={props.imageUrl} onChange={handleFormValueChange} required={true} placeholder='Change Restaurant Image'/>
                    </FormControl>
                    <FormControl m={2}>
                        <Input type='number' max={5} min={1} defaultValue={props.averageRating} id='averageRating' onChange={handleFormValueChange} required={true} placeholder='Edit Ratings'/>
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
export default EditModal;