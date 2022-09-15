import React from 'react'
import { Box, Text, Stack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteRestaurant } from '../../redux/rest';
import { Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom'
import { IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import SkeletonCards from './SkeletonCards';
import Filter from './Filter';
import { Center } from '@chakra-ui/react';
import PaginationContainer from './PaginationContainer';
const Restaurant = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { restaurant, loading } = useSelector((state)=> state.restaurant);
    const { userType } = useSelector((state)=> state.login);
    const handleDelete = (id)=> {
        dispatch(deleteRestaurant(id)).then(()=>{
            toast({
                title: 'Restaurant Removed successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }).catch((err)=>{
            toast({
                title: 'Error occured',
                description: err,
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        });

    }
    if(restaurant.length === 0 || loading) {
        return <SkeletonCards />
    }
    return (
        <Box w="98%" m='auto' mb={6}>
            <Filter />
            <Stack w={'100%'} flexDirection={{base : 'row', lg : 'row', md : "column", sm : "column"}} flexWrap='wrap' gap={3}>
                {
                    restaurant && restaurant.map((item)=> (
                        <Box  
                            borderRadius='md' mt={2} key={item._id} 
                            boxShadow={'xl'}
                            ml={2}
                            w={{base : "24%", lg : "24%", md : "100%", sm : "100%"}} 
                        >   
                            <Link to={`/restaurant/${item._id}`}>
                                <Box p={3} 
                                    w={'100%'}
                                    h={'75%'}
                                    cursor='pointer'
                                >
                                <Image src={item.imageUrl} 
                                        w="100%" h={'100%'}
                                        alt="image of restaurants"
                                    />
                                </Box>
                            </Link>
                            <Box  p={2} ml={2}>
                                <Box display="flex" justifyContent='space-between' align='center'>
                                    <Text fontWeight="bold">{item.name}</Text>
                                    {
                                        userType === 'admin' && (
                                            <IconButton h="auto"     
                                            variant='ghost' w="auto" icon={<DeleteIcon />}
                                            onClick={()=> handleDelete(item._id)}
                                            />
                                        )
                                    }
                                </Box>
                                <Box display='flex' justifyContent="space-between">
                                    <Box>
                                    <Text mr={3}>
                                    Rating : {item.averageRating}
                                    </Text>
                                    </Box>
                                    <Box mt={'-2px'} mr={2}>
                                        {
                                            Array(5)
                                            .fill('')
                                            .map((_, i) => (
                                                <StarIcon
                                                key={i}
                                                color={i < Math.floor(item.averageRating) ? 'orange.300' : 'gray.300'}
                                                />
                                            ))
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))
                }
            </Stack>
            <Center>
                <PaginationContainer />
            </Center>
        </Box>
    )
}

export default Restaurant