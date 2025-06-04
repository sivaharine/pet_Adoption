import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Header({ title, showBackButton, onBack }: HeaderProps) {
  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <ChevronLeft size={24} color={Colors.gray[800]} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.gray[900],
  },
});