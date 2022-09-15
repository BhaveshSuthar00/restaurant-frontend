import React from 'react';
import { chakra, Container, Box, Stack, useColorModeValue } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { handleChange, setCurrentPage } from '../../redux/rest'
const PaginationContainer = () => {
  const { totalPages, currentPage } = useSelector((state)=> state.restaurant);
  const { userName } = useSelector((state)=> state.login);
  const dispatch = useDispatch();
  const handlePageChange = (page, changePage) => {
    if(changePage){
      dispatch(setCurrentPage(changePage));
      dispatch(handleChange());
      return;
    }
    else if(currentPage === 1 && page === -1) {
      return;
    } else if(currentPage === totalPages && page === 1){
      return;
    } else {
      dispatch(setCurrentPage(currentPage + page));
      dispatch(handleChange(currentPage + page));
    }
  }
    if(!userName){
      return <></>
  }
  return (
    <Container
      d="flex"
      maxWidth="7xl"
      w="full"
      h="218px"
      alignItems="center"
      p={{ base: 5, sm: 10 }}
    >
      <Stack
      direction={{ base: 'column', sm: 'row' }}
      as="nav"
      aria-label="Pagination"
      spacing={2}
      w="full"
      justify="center"
      alignItems="center"
      mt={{ base: 3, md: 0 }}
    >
      <Box>
        <PaginationButton isDisabled={currentPage-1 === 0} onClick={()=> currentPage > 1 && handlePageChange(-1)}>Previous</PaginationButton>
      </Box>
      <Stack direction="row" spacing={2}>
          {
            Array(totalPages).fill('').map((_, index)=>(

              <PaginationButton isDisabled={currentPage === index + 1 ? true : false} onClick={()=> 
                currentPage !== index + 1 && handlePageChange('', index+1) } isActive={currentPage === index+1 ? true : false} key={uuid()}>{index+1}</PaginationButton>
            ))
          }
        </Stack>
      <Box>
        <PaginationButton isDisabled={totalPages === currentPage} onClick={()=> currentPage < totalPages && handlePageChange(1)} >Next</PaginationButton>
      </Box>
    </Stack>
    </Container>
  );
};
const PaginationButton = ({ children, onClick, isDisabled, isActive }) => {
  const activeStyle = {
    bg: useColorModeValue('gray.300', 'gray.400'),
    color: 'white'
  };
  return (
    <chakra.button
      py={1}
      px={3}
      onClick={onClick}
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded="md"
      _hover={!isDisabled && activeStyle}
      cursor={isDisabled && 'not-allowed'}
      {...(isActive && activeStyle)}
    >
      {children}
    </chakra.button>
  );
};

export default PaginationContainer;