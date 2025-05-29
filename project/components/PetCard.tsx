import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Heart as HeartIcon, MapPin } from 'lucide-react-native';

const windowWidth = Dimensions.get('window').width;

interface PetCardProps {
  id: string;
  name: string;
  imageUrl: string;
  breed: string;
  age: string;
  price: number | null;
  isStray: boolean;
  distance: string;
  style?: object;
}

export default function PetCard({
  id,
  name,
  imageUrl,
  breed,
  age,
  price,
  isStray,
  distance,
  style
}: PetCardProps) {
  const router = useRouter();

  const goToDetails = () => {
    router.push(`/pet/${id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      activeOpacity={0.9}
      onPress={goToDetails}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <TouchableOpacity style={styles.favoriteButton}>
          <HeartIcon size={20} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {isStray ? 'Stray' : 'Owned'}
          </Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
        </View>
        
        <Text style={styles.breed}>{breed}</Text>
        
        <View style={styles.detailsRow}>
          <Text style={styles.age}>{age}</Text>
          
          <View style={styles.locationContainer}>
            <MapPin size={14} color={Colors.gray[500]} />
            <Text style={styles.distance}>{distance}</Text>
          </View>
        </View>
        
        <Text style={styles.price}>
          {isStray 
            ? 'Free Adoption' 
            : price ? `$${price}` : 'Contact for price'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    shadowColor: Colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    width: windowWidth > 500 ? windowWidth / 2 - 24 : windowWidth - 32,
    margin: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 180,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 50,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.primary[500],
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#fff',
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
  },
  infoContainer: {
    padding: 16,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.gray[900],
    flex: 1,
  },
  breed: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  age: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.gray[500],
    marginLeft: 4,
  },
  price: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: isStray => isStray ? Colors.secondary[500] : Colors.accent[500],
  },
});