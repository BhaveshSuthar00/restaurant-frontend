import { Box } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@chakra-ui/react';
import { ModalHeader } from '@chakra-ui/react';
import { ModalBody } from '@chakra-ui/react';
import { ModalCloseButton } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { FormLabel } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import { ModalContent } from '@chakra-ui/react';
import { ModalOverlay } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postReview } from '../../redux/SingleRestro';
const AddReview = ({restaurantId, userId}) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const [reviewsForm , setReviewForm] = useState({})
    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        onClose();
        dispatch(postReview({...reviewsForm,  date : moment().format(' YYYY MMMM Do hh:mm:ss'), restaurantId : restaurantId, userId : userId})).then(()=> {
            toast({
                title: 'Review added',
                description: "Review is added successfully.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }).catch((err)=> {
            console.log(err);
            toast({
                title: 'Error occured',
                description: "Review is not added try again after some tome.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        });
    }
    const handleFormValueChange = (field)=>{
        const {id, value} = field.target;
        setReviewForm({...reviewsForm, [id] : value});
    }
    return (
        <>
        <Button
            onClick={onOpen}
            mr={4}
        >
            Add Review
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent>
            <ModalHeader>Add New Review</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box as='form' onSubmit={handleSubmitUpdate}>
                    <FormControl m={2}>
                        <FormLabel htmlFor='rating'>Give Us a Rating</FormLabel>
                        <Input type='number' autoFocus={true} required={true} min={1} max={5} id='rating' onChange={handleFormValueChange} placeholder='What rating would you like to give...'/>
                    </FormControl>
                    <FormControl m={2}>
                        <FormLabel htmlFor='comment'>Write Comment</FormLabel>
                        <Input type='text' id='comment' required={true} onChange={handleFormValueChange} placeholder='Write your feedback'/>
                    </FormControl>
                    <HStack>
                        <Input type='submit' m={2} variant={'ghost'} _hover={{bgColor : "gray.400"}} bgColor={'gray.200'} />
                        <Button onClick={onClose}>Close</Button>
                    </HStack>
            </Box>
            </ModalBody>
        </ModalContent>
        </Modal>
        </>
    )
}
export default AddReview;