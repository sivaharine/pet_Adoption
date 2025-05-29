import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, Phone } from 'lucide-react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Colors from '@/constants/Colors';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Header from '@/components/Header';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function SignupScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values: { 
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      // Here we would handle the actual signup logic with your backend
      console.log('Signup details:', values);
      
      // Simulate signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the login screen or directly to the main app
      router.replace('/login');
    } catch (error) {
      console.error('Signup error:', error);
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
      <Header title="Create Account" showBackButton />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text style={styles.title}>Join PetPals</Text>
          <Text style={styles.subtitle}>Create a new account</Text>
          
          <Formik
            initialValues={{ 
              name: '', 
              email: '', 
              phone: '', 
              password: '', 
              confirmPassword: '' 
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={touched.name && errors.name ? errors.name : undefined}
                  leftIcon={<User size={20} color={Colors.gray[500]} />}
                />
                
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
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && errors.phone ? errors.phone : undefined}
                  leftIcon={<Phone size={20} color={Colors.gray[500]} />}
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
                
                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                  leftIcon={<Lock size={20} color={Colors.gray[500]} />}
                  isPassword
                />
                
                <Button
                  title="Create Account"
                  onPress={() => handleSubmit()}
                  style={styles.submitButton}
                  isLoading={isLoading}
                />
              </View>
            )}
          </Formik>
        </View>
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.loginLink}>Sign In</Text>
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
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 28,
    color: Colors.gray[900],
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[600],
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  submitButton: {
    marginTop: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[700],
  },
  loginLink: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.primary[500],
  },
});