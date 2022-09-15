import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { loginUser } from '../../redux/login';
import Cookies from 'universal-cookie';
import { useToast } from '@chakra-ui/react';
export default function SplitScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const toast = useToast();
    const handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            email : document.getElementById('emailInput').value,
            password : document.getElementById('passwordInput').value,
        };
        dispatch(loginUser(data)).then(()=> {
            toast({
                title: 'Logged in successfully',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            navigate('/')
        }).catch((err)=> {
            toast({
                title: 'Error occured',
                description: 'User not found',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
            
        });
    }
    if(cookies.get('currentU')){
        return <Navigate to='/' />
    }
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
                <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <Stack spacing={4} w={'full'} maxW={'md'}>
                        <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" isRequired={true} id='emailInput'/>
                        </FormControl>
                        <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" isRequired={true} autoComplete='true' id='passwordInput' />
                        </FormControl>
                        <Stack spacing={6}>
                            <Button type='submit' colorScheme={'blue'} variant={'solid'}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
        </Flex>
        <Flex flex={1}>
            <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
                'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
            />
        </Flex>
        </Stack>
    );
}