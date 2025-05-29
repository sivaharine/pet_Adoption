import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  TextInput 
} from 'react-native';
import { Search, FileSliders as Sliders } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import PetCard from '@/components/PetCard';

// Mock data for pets
const PETS_DATA = [
  {
    id: '1',
    name: 'Max',
    imageUrl: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg',
    breed: 'Golden Retriever',
    age: '2 years',
    price: 250,
    isStray: false,
    distance: '2.5 km',
    category: 'dog'
  },
  {
    id: '2',
    name: 'Luna',
    imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    breed: 'Bengal Cat',
    age: '1 year',
    price: 180,
    isStray: false,
    distance: '3.7 km',
    category: 'cat'
  },
  {
    id: '3',
    name: 'Buddy',
    imageUrl: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg',
    breed: 'Indie Dog',
    age: '8 months',
    price: null,
    isStray: true,
    distance: '1.2 km',
    category: 'dog'
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
    category: 'rabbit'
  },
  {
    id: '5',
    name: 'Milo',
    imageUrl: 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg',
    breed: 'Labrador Retriever',
    age: '3 years',
    price: 220,
    isStray: false,
    distance: '3.0 km',
    category: 'dog'
  },
  {
    id: '6',
    name: 'Whiskers',
    imageUrl: 'https://images.pexels.com/photos/127027/pexels-photo-127027.jpeg',
    breed: 'Siamese Cat',
    age: '2 years',
    price: null,
    isStray: true,
    distance: '1.8 km',
    category: 'cat'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'All Pets' },
  { id: 'dog', name: 'Dogs' },
  { id: 'cat', name: 'Cats' },
  { id: 'bird', name: 'Birds' },
  { id: 'rabbit', name: 'Rabbits' },
  { id: 'fish', name: 'Fish' },
  { id: 'other', name: 'Others' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredPets = PETS_DATA.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || pet.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Hello Pet Lover!</Text>
            <Text style={styles.subtitle}>Find your perfect companion</Text>
          </View>
        </View>
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={Colors.gray[500]} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search pets..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Sliders size={20} color={Colors.primary[500]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.categoryContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollContent}
        >
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {filteredPets.length > 0 ? (
        <FlatList
          data={filteredPets}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PetCard {...item} />}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.petList}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No pets found</Text>
          <Text style={styles.emptyStateSubtext}>Try adjusting your search or filters</Text>
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
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: Colors.primary[500],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    color: Colors.background,
  },
  subtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.gray[100],
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[800],
  },
  filterButton: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    paddingVertical: 12,
  },
  categoryScrollContent: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 50,
    backgroundColor: Colors.gray[100],
  },
  categoryButtonActive: {
    backgroundColor: Colors.primary[500],
  },
  categoryText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.gray[700],
  },
  categoryTextActive: {
    color: Colors.background,
  },
  petList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyStateText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.gray[800],
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
  },
});