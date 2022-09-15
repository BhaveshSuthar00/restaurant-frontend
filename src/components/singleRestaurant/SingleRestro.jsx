import { StarIcon } from '@chakra-ui/icons';
import { useColorModeValue } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getRestaurantById, getReviewById, resetRestaurant } from '../../redux/SingleRestro';
import { HStack } from '@chakra-ui/react';
import AddReview from '../review/AddReview'
import ReviewCard from '../review/ReviewCard'
import EditModal from '../review/EditModal';
import SkeletonCards from '../restaurant/SkeletonCards';
const SingleRestro = () => {
    const {id} = useParams();
    const color = useColorModeValue('white', 'gray.900');
    const dispatch = useDispatch();
    const {loading, restaurant, reviews} = useSelector((state)=> state.singleRestaurant);
    const {userId, userType} = useSelector((state)=> state.login);
    useEffect(() => {
        dispatch(getRestaurantById(id));
        dispatch(getReviewById(id))
        return(()=>{
            dispatch(resetRestaurant());
        });
    },[dispatch, id])
    if(loading){
        return (
            <>
                <SkeletonCards />
            </>
        )
    }
    return (
        <>
        <Box
            m={'auto'}
            w={'98%'}
            display='flex'
            flexDirection={{base : 'row', lg : "row", md : "column", sm : "column"}}
            bg={color}
            boxShadow={'2xl'}
            justifyContent='space-evenly'
            rounded={'lg'}
            p={4}
            overflow={'hidden'}
        >
        <Box p={2} width={{base : "50%", lg : "50%", md : "100%", sm : "100%"}}>
            <Image
                w={'100%'}
                src={restaurant.imageUrl}
                layout={'fill'}
                borderRadius={30}
            />
        </Box>

        <Stack width={{base : "46%", lg : "46%", md : "100%", sm : "100%"}}>  
            <Box ml={2}>
                <Text color={'gray.500'} letterSpacing={1.1} mt={6} mb={4}>
                {restaurant.location}
                </Text>
                <HStack>
                    <Text>Average Rating : </Text>
                    <Text>
                        {
                            Array(5)
                            .fill('')
                            .map((_, i) => (
                                <StarIcon
                                mt='-3px'
                                key={i}
                                color={i < Math.floor(restaurant.averageRating) ? 'orange.300' : 'gray.300'}
                                />
                            ))
                        }
                    </Text>
                </HStack>
            </Box>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                {
                    userType === 'admin' ? 
                        <>
                            <EditModal props={restaurant}/>
                        </>
                    : null
                }
            </Stack>
            <Stack 
                direction="row" 
                align="center"
                justify="space-between"
            >
                {userType === 'regular' && (
                        <>  
                            <Box >
                                <Text fontWeight="bold">reviews</Text>
                            </Box>
                            <Box marginRight={8}>
                                <AddReview  restaurantId={restaurant._id} userId={userId}/>
                            </Box>
                        </>
                )}
            </Stack>
            <Stack >
                {
                    userType && (
                        reviews && reviews.map((item) =>(
                            <ReviewCard item={item} key={item._id} restaurantId={restaurant._id}  userId={userId} userType={userType}/>
                        ))
                    )
                }
                {
                    userType && reviews.length === 0 && (
                        <Box>
                            <Text>
                                No reviews are there
                            </Text>
                        </Box>
                    )
                }
            </Stack>
        </Stack>
        </Box>
        </>
    )
}

export default SingleRestro