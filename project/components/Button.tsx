import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import Colors from '@/constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  ...rest
}: ButtonProps) {
  
  const getButtonStyle = (): ViewStyle => {
    let buttonStyle: ViewStyle = { ...styles.button };
    
    // Size
    if (size === 'small') {
      buttonStyle = { ...buttonStyle, ...styles.smallButton };
    } else if (size === 'large') {
      buttonStyle = { ...buttonStyle, ...styles.largeButton };
    }
    
    // Variant
    if (variant === 'primary') {
      buttonStyle = { ...buttonStyle, ...styles.primaryButton };
    } else if (variant === 'secondary') {
      buttonStyle = { ...buttonStyle, ...styles.secondaryButton };
    } else if (variant === 'outline') {
      buttonStyle = { ...buttonStyle, ...styles.outlineButton };
    } else if (variant === 'text') {
      buttonStyle = { ...buttonStyle, ...styles.textButton };
    }
    
    // Disabled
    if (disabled || isLoading) {
      buttonStyle = { ...buttonStyle, ...styles.disabledButton };
    }
    
    return buttonStyle;
  };

  const getTextStyle = (): TextStyle => {
    let textStyleValue: TextStyle = { ...styles.buttonText };
    
    if (size === 'small') {
      textStyleValue = { ...textStyleValue, ...styles.smallButtonText };
    } else if (size === 'large') {
      textStyleValue = { ...textStyleValue, ...styles.largeButtonText };
    }
    
    if (variant === 'primary') {
      textStyleValue = { ...textStyleValue, ...styles.primaryButtonText };
    } else if (variant === 'secondary') {
      textStyleValue = { ...textStyleValue, ...styles.secondaryButtonText };
    } else if (variant === 'outline') {
      textStyleValue = { ...textStyleValue, ...styles.outlineButtonText };
    } else if (variant === 'text') {
      textStyleValue = { ...textStyleValue, ...styles.textButtonText };
    }
    
    if (disabled || isLoading) {
      textStyleValue = { ...textStyleValue, ...styles.disabledButtonText };
    }
    
    return textStyleValue;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.8}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? Colors.primary[500] : '#fff'} 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  smallButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  largeButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary[500],
  },
  secondaryButton: {
    backgroundColor: Colors.secondary[500],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary[500],
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  outlineButtonText: {
    color: Colors.primary[500],
  },
  textButtonText: {
    color: Colors.primary[500],
  },
  disabledButtonText: {
    opacity: 0.8,
  },
});