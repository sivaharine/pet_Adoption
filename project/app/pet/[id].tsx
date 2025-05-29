import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Alert,
  SafeAreaView, 
  Platform 
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { 
  Heart, 
  Share as ShareIcon, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Phone,
  Mail
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import Button from '@/components/Button';

const windowWidth = Dimensions.get('window').width;

// Mock data for pets
const PETS_DATA = {
  '1': {
    id: '1',
    name: 'Max',
    imageUrl: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg',
    breed: 'Golden Retriever',
    age: '2 years',
    price: 250,
    isStray: false,
    distance: '2.5 km',
    category: 'dog',
    description: 'Max is a friendly and energetic Golden Retriever who loves to play and go for walks. He is well-trained, good with children, and gets along with other pets. Max is looking for an active family who can give him the attention and exercise he needs.',
    ownerInfo: {
      name: 'Sarah Johnson',
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@example.com'
    },
    pickupLocation: '123 Oak Street, Riverside, CA',
    pickupDate: '2025-06-15'
  },
  '2': {
    id: '2',
    name: 'Luna',
    imageUrl: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    breed: 'Bengal Cat',
    age: '1 year',
    price: 180,
    isStray: false,
    distance: '3.7 km',
    category: 'cat',
    description: 'Luna is a beautiful Bengal cat with a playful personality. She enjoys climbing and exploring her surroundings. Luna is very affectionate and loves to curl up on laps for afternoon naps. She is litter trained and good with gentle handling.',
    ownerInfo: {
      name: 'Michael Chen',
      phone: '+1 (555) 987-6543',
      email: 'michael.c@example.com'
    },
    pickupLocation: '456 Maple Avenue, Lakeside, CA',
    pickupDate: '2025-06-20'
  },
  '3': {
    id: '3',
    name: 'Buddy',
    imageUrl: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg',
    breed: 'Indie Dog',
    age: '8 months',
    price: null,
    isStray: true,
    distance: '1.2 km',
    category: 'dog',
    description: 'Buddy is a sweet and gentle indie dog who was rescued from the streets. He is very loyal and eager to please. Despite his rough start in life, Buddy is trusting and affectionate with people. He would thrive in a loving home with patient owners who can help him continue to build confidence.',
    rescueInfo: {
      organization: 'City Animal Shelter',
      address: '789 Rescue Lane, Downtown, CA',
      phone: '+1 (555) 234-5678'
    },
    pickupLocation: '789 Rescue Lane, Downtown, CA',
    pickupDate: '2025-06-10'
  },
  '4': {
    id: '4',
    name: 'Coco',
    imageUrl: 'https://images.pexels.com/photos/39369/rabbit-animal-hare-cute-39369.jpeg',
    breed: 'Holland Lop Rabbit',
    age: '6 months',
    price: 120,
    isStray: false,
    distance: '4.3 km',
    category: 'rabbit',
    description: 'Coco is an adorable Holland Lop rabbit with floppy ears and a gentle temperament. She enjoys fresh vegetables and having her fur brushed. Coco is litter box trained and would make a perfect pet for someone looking for a quiet companion.',
    ownerInfo: {
      name: 'Jessica Taylor',
      phone: '+1 (555) 345-6789',
      email: 'jessica.t@example.com'
    },
    pickupLocation: '101 Bunny Trail, Hillcrest, CA',
    pickupDate: '2025-06-18'
  }
};

export default function PetDetailScreen() {
  const params = useLocalSearchParams();
  const { id } = params;
  const pet = PETS_DATA[id as string];
  const [isFavorite, setIsFavorite] = useState(false);
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleShare = () => {
    // Share functionality would be implemented here
    Alert.alert('Share', `Sharing ${pet.name}'s profile!`);
  };
  
  const handleAdopt = () => {
    Alert.alert(
      'Confirm Adoption',
      `Are you sure you want to proceed with adopting ${pet.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Proceed', 
          onPress: () => {
            // Navigate to confirmation/payment screen
            Alert.alert('Success', 'Adoption request sent! We will contact you soon.');
          }
        }
      ]
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title={pet.name} 
        showBackButton 
        rightComponent={
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleFavorite}>
              <Heart size={24} color={isFavorite ? Colors.error : Colors.gray[600]} fill={isFavorite ? Colors.error : 'transparent'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleShare}>
              <ShareIcon size={24} color={Colors.gray[600]} />
            </TouchableOpacity>
          </View>
        }
      />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: pet.imageUrl }} style={styles.image} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {pet.isStray ? 'Stray' : 'Owned'}
            </Text>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{pet.name}</Text>
            <Text style={styles.price}>
              {pet.isStray 
                ? 'Free Adoption' 
                : pet.price ? `$${pet.price}` : 'Contact for price'}
            </Text>
          </View>
          
          <Text style={styles.breed}>{pet.breed}</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Clock size={20} color={Colors.primary[500]} />
              </View>
              <Text style={styles.infoText}>{pet.age}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <MapPin size={20} color={Colors.primary[500]} />
              </View>
              <Text style={styles.infoText}>{pet.distance}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Calendar size={20} color={Colors.primary[500]} />
              </View>
              <Text style={styles.infoText}>{formatDate(pet.pickupDate)}</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{pet.description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {pet.isStray ? 'Rescue Information' : 'Owner Information'}
            </Text>
            
            {pet.isStray ? (
              <View style={styles.rescueInfo}>
                <View style={styles.rescueItem}>
                  <Text style={styles.rescueLabel}>Organization:</Text>
                  <Text style={styles.rescueValue}>{pet.rescueInfo.organization}</Text>
                </View>
                
                <View style={styles.rescueItem}>
                  <Text style={styles.rescueLabel}>Address:</Text>
                  <Text style={styles.rescueValue}>{pet.rescueInfo.address}</Text>
                </View>
                
                <View style={styles.rescueItem}>
                  <Text style={styles.rescueLabel}>Contact:</Text>
                  <Text style={styles.rescueValue}>{pet.rescueInfo.phone}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.ownerInfo}>
                <View style={styles.contactItem}>
                  <View style={styles.contactIconContainer}>
                    <Phone size={20} color={Colors.primary[500]} />
                  </View>
                  <View style={styles.contactContent}>
                    <Text style={styles.contactLabel}>Phone</Text>
                    <Text style={styles.contactValue}>{pet.ownerInfo.phone}</Text>
                  </View>
                </View>
                
                <View style={styles.contactItem}>
                  <View style={styles.contactIconContainer}>
                    <Mail size={20} color={Colors.primary[500]} />
                  </View>
                  <View style={styles.contactContent}>
                    <Text style={styles.contactLabel}>Email</Text>
                    <Text style={styles.contactValue}>{pet.ownerInfo.email}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pickup Information</Text>
            
            <View style={styles.pickupItem}>
              <Text style={styles.pickupLabel}>Location:</Text>
              <Text style={styles.pickupValue}>{pet.pickupLocation}</Text>
            </View>
            
            <View style={styles.pickupItem}>
              <Text style={styles.pickupLabel}>Available from:</Text>
              <Text style={styles.pickupValue}>{formatDate(pet.pickupDate)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title={pet.isStray ? "Adopt for Free" : `Adopt for $${pet.price || 'Contact'}`}
          onPress={handleAdopt}
          style={styles.adoptButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: windowWidth,
    height: 300,
  },
  badge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: Colors.primary[500],
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#fff',
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Nunito-Bold',
    fontSize: 28,
    color: Colors.gray[900],
  },
  price: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.accent[500],
  },
  breed: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[600],
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    padding: 16,
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.gray[700],
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.gray[900],
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[700],
    lineHeight: 24,
  },
  rescueInfo: {
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: 16,
  },
  rescueItem: {
    marginBottom: 8,
  },
  rescueLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  rescueValue: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[900],
  },
  ownerInfo: {
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: 16,
  },
  contactItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactContent: {
    justifyContent: 'center',
  },
  contactLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  contactValue: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.primary[500],
  },
  pickupItem: {
    marginBottom: 8,
  },
  pickupLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  pickupValue: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[900],
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  adoptButton: {
    marginTop: 0,
  },
});