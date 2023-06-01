import userAPI from '@/services/userAPI';
import { Box } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleLoginBtn() {
  return (
    <Box>
      <GoogleLogin
        onSuccess={async credentialResponse => {
          userAPI.login(credentialResponse.credential);
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </Box>
  );
}