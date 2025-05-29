import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  TextInputProps,
  TouchableOpacity 
} from 'react-native';
import Colors from '@/constants/Colors';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: object;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
}

export default function Input({ 
  label,
  error,
  containerStyle,
  leftIcon,
  isPassword = false,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        isFocused && styles.focusedInput,
        error && styles.errorInput
      ]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            isPassword && styles.inputWithRightIcon
          ]}
          placeholderTextColor={Colors.gray[400]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !showPassword}
          {...rest}
        />
        
        {isPassword && (
          <TouchableOpacity 
            style={styles.rightIconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color={Colors.gray[500]} />
            ) : (
              <Eye size={20} color={Colors.gray[500]} />
            )}
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginBottom: 6,
    color: Colors.gray[800],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[800],
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 48,
  },
  leftIconContainer: {
    paddingLeft: 16,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
  },
  focusedInput: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.gray[50],
  },
  errorInput: {
    borderColor: Colors.error,
  },
  errorText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
  },
});