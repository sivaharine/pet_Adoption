import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  error?: string;
}

export default function Dropdown({ label, value, options, onSelect, error }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.selectButton,
          error ? styles.errorBorder : null
        ]}
        onPress={() => setIsOpen(true)}
      >
        <Text style={[styles.selectButtonText, !value && styles.placeholder]}>
          {value || `Select ${label}`}
        </Text>
        <ChevronDown size={20} color={Colors.gray[500]} />
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item);
                    setIsOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                  {value === item && (
                    <Check size={20} color={Colors.primary[500]} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginBottom: 6,
    color: Colors.gray[800],
  },
  selectButton: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  selectButtonText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
    color: Colors.gray[900],
  },
  placeholder: {
    color: Colors.gray[400],
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  errorText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
    color: Colors.error,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: '80%',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  optionText: {
    fontFamily: 'Nunito-Medium',
    fontSize: 16,
    color: Colors.gray[900],
  },
}); 