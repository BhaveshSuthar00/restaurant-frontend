import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import {useDispatch } from 'react-redux'
  import { Link } from 'react-router-dom';
import { signUpUser } from '../../redux/login';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
  export default function SignupCard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const handelSubmit = (event)=>{
      event.preventDefault();

      let data = {
        name : document.getElementById('first_name').value, 
        password : document.getElementById('password').value, 
        email : document.getElementById('email').value
      }
      dispatch(signUpUser(data))
      .then(()=> {
        toast({
          title: 'Sign up successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        navigate('/')
      }).catch((err)=>{
        toast({
          title: 'Sign up failed',
          description: err.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }) 
    }
    return (
      <>
      <Flex
        width="100%"
        minH={'90vh'}
        bg={useColorModeValue('gray.50', 'gray.700')}>
        <Stack 
          spacing={2} 
          mx={'auto'} 
          maxW={'lg'} 
          width='100%'
        >
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
            <Text fontSize={'lg'} color={useColorModeValue('gray.600', 'white')}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            width="100%"
            justifyContent='center'
            display='flex'
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={4}>
            <Box as="form" onSubmit={(e)=>handelSubmit(e)} >
              <Stack spacing={4}>
                    <FormControl id="firstName" isRequired={true}>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" id='first_name' />
                    </FormControl>
                <FormControl id="email" isRequired={true}>
                  <FormLabel>Email </FormLabel>
                  <Input type="email" id='email'/>
                </FormControl>
                <FormControl id="password" isRequired={true}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input id="password" pattern={"^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$"} type={showPassword ? 'text' : 'password'} autoComplete='true' 
                    placeholder='Enter upper/lowercase password'
                    isRequired={true}
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
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    type='submit'
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user? <Box as={Link} to='/login' color={'blue.400'}>Login</Box>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Flex>
      </>
    );
  }