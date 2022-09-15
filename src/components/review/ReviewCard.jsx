import { DeleteIcon } from "@chakra-ui/icons";
import { EditIcon } from "@chakra-ui/icons";
import { StarIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { PopoverTrigger } from "@chakra-ui/react";
import { PopoverHeader } from "@chakra-ui/react";
import { PopoverCloseButton } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { PopoverBody } from "@chakra-ui/react";
import { PopoverArrow } from "@chakra-ui/react";
import { PopoverContent } from "@chakra-ui/react";
import { Popover } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeReview, updateReview } from "../../redux/SingleRestro";
const Popup = ({item, restaurantId})=>{
    const [newData, setNewData] = useState({
        comment : item.comment,
        rating : item.rating
    })
    const dispatch = useDispatch();
    const { isOpen, onToggle, onClose } = useDisclosure();
    const handleChange = (field)=>{
        const {id, value} = field.target;
        setNewData({...newData, [id] : value});
    }
    const handleEditedForm = (event)=>{
        event.preventDefault();
        onClose()
        const {comment, rating} = newData;
        if(rating !== item.rating || comment !== item.comment){
            dispatch(updateReview( restaurantId, item._id, {...newData}))
        }
    }
    return (
        <Popover 
        isLazy
        isOpen={isOpen}
        onClose={onClose}
        closeOnBlur={true}
        >
        <PopoverTrigger>
            <IconButton onClick={()=> onToggle()} icon={<EditIcon/>} variant='ghost'/>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverHeader fontWeight='semibold'>Edit Review</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
                <Box as='form' onSubmit={handleEditedForm}>
                    <FormControl>
                        <FormLabel htmlFor="">Edit rating</FormLabel>
                        <Input type='number' required={true} min={1} max={5} id='rating' defaultValue={newData.rating} onChange={handleChange}/>
                    </FormControl>
                    <FormControl>    
                        <FormLabel htmlFor="comment">Edit comment</FormLabel>
                        <Input type='text' required={true} id='comment' defaultValue={newData.comment} onChange={handleChange}/>
                    </FormControl>
                    <Input type='submit' disabled={newData.comment.length > 0 ? false : true}/>
                </Box>
            </PopoverBody>
        </PopoverContent>
        </Popover>
    )
}
function ReviewCard({item, userId, userType, restaurantId}) {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const handleDelete = (itemUserId, currentUserId) => {
        if(itemUserId === currentUserId || userType === 'admin'){
            dispatch(removeReview(item._id, restaurantId));
        }
    }
    return (
        <Stack
            key={item._id}
            direction="row"
            align="center"
            h={20}
            w={'full'}
            p={2}
            borderRadius={20}
            boxShadow='lg'
            onMouseEnter={() => {
                if(userId === item.userId._id || userType === 'admin'){
                    setIsVisible(true);
                }
            }}
            onMouseLeave={() => {
                if(userId === item.userId._id  || userType === 'admin'){
                    setIsVisible(false);
                }
            }}
        >
        <Box w={'80%'} ml={2} justify="space-between" h={'100%'} display='flex'>
            <Tooltip 
                label={item.userId.email}
                >
                <Avatar
                    alignSelf="center"
                    mr={4}
                    cursor="pointer"
                    name={item.userId.name}
                />
            </Tooltip>
            <Box>
            <Stack direction="row" align="center" h={'50%'} >
            <Text color="gray.500">{item.userId.name}</Text>
            <Text>
                {Array(5)
                    .fill("")
                    .map((_, i) => (
                        <StarIcon
                        mt="-3px"
                        key={i}
                        color={
                            i < Math.floor(item.rating) ? "orange.300" : "gray.300"
                        }
                        />
                ))}
            </Text>
            <Text>
                {item.date.split(' ')[2]},{item.date.split(' ')[3]} {item.date.split(' ')[4].split(':')[0]}:{item.date.split(' ')[4].split(':')[1]}
            </Text>
            </Stack>
            <Text fontWeight="bold" h={'46%'} w="100%" overflow="hidden">{item.comment}</Text>
            </Box>
        </Box>
            <Box width="15%" ml={2}>
            {
                isVisible && (
                    <Box>
                    <Popup item={item} restaurantId={restaurantId}/>
                    <IconButton ml={2} icon={<DeleteIcon />} onClick={() => handleDelete(item.userId._id, userId)} cursor={'pointer'}/>
                    </Box>
                )
            }
            </Box>
        </Stack>
    );
}

export default ReviewCard;
