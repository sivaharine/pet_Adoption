import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import PetCard from '@/components/PetCard';

// Mock favorites data
const FAVORITES_DATA = [
  {
    id: '1',
    name: 'Max',
    imageUrl: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg',
    breed: 'Golden Retriever',
    age: '2 years',
    price: 250,
    isStray: false,
    distance: '2.5 km',
  },
  {
    id: '4',
    name: 'Coco',
    imageUrl: 'https://images.pexels.com/photos/39369/rabbit-animal-hare-cute-39369.jpeg',
    breed: 'Holland Lop Rabbit',
    age: '6 months',
    price: 120,
    isStray: false,
    distance: '4.3 km',
  },
];

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favorites" />
      
      {FAVORITES_DATA.length > 0 ? (
        <FlatList
          data={FAVORITES_DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PetCard {...item} />}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.petList}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <AlertTriangle size={40} color={Colors.gray[400]} />
          </View>
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyDescription}>
            Start adding pets to your favorites to keep track of the ones you're interested in.
          </Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore Pets</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  petList: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
    color: Colors.gray[800],
    marginBottom: 12,
  },
  emptyDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 32,
  },
  exploreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.primary[500],
    borderRadius: 50,
  },
  exploreButtonText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#fff',
  },
});