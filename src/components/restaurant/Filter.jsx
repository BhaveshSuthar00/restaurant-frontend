import { Text } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import { Spacer } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchRestaurantsByFilter, fetchRestaurantsBySearch, setCategory, setFilter, setSearchGlobal } from '../../redux/rest';
function Filter() {
    const dispatch = useDispatch();
    const {ratingFilter, search} = useSelector((state)=> state.restaurant);
    const { userName } = useSelector((state)=> state.login);
    const [searchIn, setSearch] = useState('null');
    const toast = useToast();
    const handleChangeOrder = (field)=>{
        const { value } = field.target;
        if(Number(value) === 0){
            dispatch(setCategory('getall'));
            dispatch(setFilter(0));
        } else { 
            dispatch(setCategory('filter'));
            dispatch(setFilter(value));
        }
            dispatch(fetchRestaurantsByFilter()).then(()=>{
                toast({
                    title: 'Fetching the data',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            }).catch((err)=>{
                toast({
                    title: 'Error occured',
                    description: err.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            });
    };
    const searchFun = ()=>{
        if (searchIn !== 'null') {
            dispatch(setSearchGlobal(searchIn));
            dispatch(fetchRestaurantsBySearch()).then(()=>{
                toast({
                    title: 'Filtering',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
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
    }
    useEffect(()=>{
        const delayDebounceFn = setTimeout(() => {
            if(searchIn !== 'null' || searchIn !== ''){
                searchFun();
            }
        }, 1000)
        return () => clearTimeout(delayDebounceFn);
    },[searchIn])
    if(!userName){
        return <></>
    }
    return (
        <>
            <Box display="flex" w='95%' m={'auto'} mt={4}>
                <Box>
                    <Text fontWeight="bold" fontSize="20">Filters</Text>
                </Box>
                <Spacer />
                <Box mr={4}>
                    <Input defaultValue={search} type="text" placeholder='search by name' onChange={(e)=> setSearch(e.target.value)}/>
                </Box>
                <Box display='flex'>
                    <Select value={ratingFilter} onChange={handleChangeOrder}>
                        <option value="0">All</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        {/* <option value='asc'>Highest to Lowest</option>
                        <option value='desc'>Lowest to Highest</option> */}
                    </Select>
                </Box>
            </Box>
        </>
    );
}

export default Filter;