import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      // Here we would handle the actual login logic with your backend
      console.log('Login credentials:', values);
      
      // Simulate login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg' }} 
            style={styles.logo} 
          />
          <Text style={styles.logoText}>PetPals</Text>
          <Text style={styles.tagline}>Find your perfect furry friend</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email ? errors.email : undefined}
                  leftIcon={<Mail size={20} color={Colors.gray[500]} />}
                />
                
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password ? errors.password : undefined}
                  leftIcon={<Lock size={20} color={Colors.gray[500]} />}
                  isPassword
                />
                
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
                
                <Button
                  title="Sign In"
                  onPress={() => handleSubmit()}
                  style={styles.submitButton}
                  isLoading={isLoading}
                />
              </View>
            )}
          </Formik>
        </View>
        
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.registerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  logoText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 32,
    color: Colors.primary[500],
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[600],
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  welcomeText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 28,
    color: Colors.gray[900],
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[600],
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.primary[500],
  },
  submitButton: {
    marginTop: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  registerText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[700],
  },
  registerLink: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.primary[500],
  },
});