import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const UnAuthorized = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center">
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Your are not Authorized.
      </Heading>
      <Text color={'gray.500'}>
        This Route is only Available for admin, Contact Bhavesh for getting Admin access to use this Route, Have a great Day.
      </Text>
    </Box>
  );
}
export default UnAuthorized;