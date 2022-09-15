import { FormControl } from '@chakra-ui/react'
import { FormLabel } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchRestaurants, postRestaurant } from '../../redux/rest'

const Main = () => {
    const [editable, setEditable] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();
    const [RestroInfo, setRestroInfo] = useState({
        imageUrl : "",
        name : "",
        location : "",
        averageRating : 0,
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        setEditable(true);
        dispatch(postRestaurant(RestroInfo)).then((response)=>{    
            setRestroInfo({
                imageUrl : "",
                name : "",
                location : "",
                averageRating : 0,
            });
            dispatch(fetchRestaurants());
            document.getElementById('name').value = null;
            document.getElementById('imageUrl').value = null;
            document.getElementById('location').value = null;
            document.getElementById('averageRating').value = null;
            toast({
                title: 'Restaurant Added successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            setEditable(false);
        }).catch((err)=> {
            toast({
                title: 'Error occured',
                status: err.message,
                duration: 2000,
                isClosable: true,
            })
        })
    }
    const handleChange = (data) => {
        const {id, value} = data.target;
        setRestroInfo({...RestroInfo, [id]: value});
    }
    return (
        <Box w="80%" m='auto' boxShadow='lg'  mt={4} p={[4,5]}>
            <Center>
                <Text fontSize='25' fontWeight='bold'>
                    Add new Restaurant
                </Text>
            </Center>
            <Box as='form' onSubmit={handleSubmit} w='88%' m='auto' >
                <FormControl id="firstName"  isRequired={true} m={3}>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" id='name' onChange={(e) => handleChange(e)} />
                </FormControl>
                <FormControl id="imageurl" isRequired={true} m={3}>
                    <FormLabel>Image Url</FormLabel>
                    <Input type="text" id='imageUrl' onChange={(e) => handleChange(e)} />
                </FormControl>
                <FormControl id="local" isRequired={true} m={3}>
                    <FormLabel>Location</FormLabel>
                    <Input type="text" id='location' onChange={(e) => handleChange(e)} />
                </FormControl>
                <FormControl id="rating" isRequired={true} m={3}>
                    <FormLabel>Average Rating</FormLabel>
                    <Input type="number" min={1} max={5} isRequired={true} id='averageRating' onChange={(e) => handleChange(e)} />
                </FormControl>
                <FormControl m={3}>
                    <Input type='submit' disabled={editable} variant='outline' />
                </FormControl>
            </Box>
        </Box>
    )
}

export default Main