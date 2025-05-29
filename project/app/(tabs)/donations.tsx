import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Alert,
  SafeAreaView 
} from 'react-native';
import { Heart, CircleCheck as CheckCircle } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import Button from '@/components/Button';

const CHARITIES = [
  {
    id: '1',
    name: 'Animal Rescue Foundation',
    logo: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
    description: 'We rescue and rehabilitate animals in need, providing them with medical care and loving homes.',
    featured: true,
  },
  {
    id: '2',
    name: 'Paws & Claws Society',
    logo: 'https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg',
    description: 'Dedicated to caring for abandoned pets and finding them forever homes through adoption programs.',
    featured: false,
  },
  {
    id: '3',
    name: 'Happy Tails Foundation',
    logo: 'https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg',
    description: 'Working to end animal homelessness through education, rescue, and community outreach programs.',
    featured: false,
  },
];

const DONATION_AMOUNTS = [10, 25, 50, 100];

export default function DonationsScreen() {
  const [selectedCharity, setSelectedCharity] = useState(CHARITIES[0]);
  const [donationAmount, setDonationAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleDonationComplete = () => {
    setIsProcessing(true);
    
    // Simulate donation processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setDonationAmount(null);
        setCustomAmount('');
      }, 3000);
    }, 2000);
  };
  
  const selectAmount = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };
  
  const handleCustomAmountChange = (text: string) => {
    // Only allow numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
    
    if (numericValue) {
      setDonationAmount(parseInt(numericValue, 10));
    } else {
      setDonationAmount(null);
    }
  };
  
  if (isSuccess) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Donation" />
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <CheckCircle size={80} color={Colors.secondary[500]} />
          </View>
          <Text style={styles.successTitle}>Thank You!</Text>
          <Text style={styles.successMessage}>
            Your donation of ${donationAmount} to {selectedCharity.name} has been processed successfully.
          </Text>
          <Text style={styles.successSubMessage}>
            Your generosity helps animals in need.
          </Text>
          <Button
            title="Done"
            onPress={() => setIsSuccess(false)}
            style={styles.successButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Donate" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Heart size={28} color="#fff" />
            <Text style={styles.bannerText}>
              Your donation helps animals find loving homes
            </Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select a Charity</Text>
          
          {CHARITIES.map(charity => (
            <TouchableOpacity
              key={charity.id}
              style={[
                styles.charityCard,
                selectedCharity.id === charity.id && styles.selectedCharityCard
              ]}
              onPress={() => setSelectedCharity(charity)}
            >
              <Image source={{ uri: charity.logo }} style={styles.charityLogo} />
              <View style={styles.charityInfo}>
                <Text style={styles.charityName}>{charity.name}</Text>
                <Text 
                  style={styles.charityDescription}
                  numberOfLines={2}
                >
                  {charity.description}
                </Text>
              </View>
              {charity.featured && (
                <View style={styles.featuredBadge}>
                  <Text style={styles.featuredBadgeText}>Featured</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donation Amount</Text>
          
          <View style={styles.amountOptionsContainer}>
            {DONATION_AMOUNTS.map(amount => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.amountOption,
                  donationAmount === amount && styles.selectedAmountOption
                ]}
                onPress={() => selectAmount(amount)}
              >
                <Text
                  style={[
                    styles.amountOptionText,
                    donationAmount === amount && styles.selectedAmountOptionText
                  ]}
                >
                  ${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.customAmountContainer}>
            <Text style={styles.customAmountLabel}>Custom Amount</Text>
            <View style={styles.customAmountInputContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.customAmountInput}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={customAmount}
                onChangeText={handleCustomAmountChange}
              />
            </View>
          </View>
        </View>
        
        <Button
          title={isProcessing ? "Processing..." : "Donate Now"}
          onPress={handleDonationComplete}
          disabled={!donationAmount || isProcessing}
          isLoading={isProcessing}
          style={styles.donateButton}
        />
        
        <Text style={styles.secureText}>
          All donations are secure and encrypted
        </Text>
        
        <View style={styles.impactSection}>
          <Text style={styles.impactTitle}>Your Impact</Text>
          
          <View style={styles.impactItem}>
            <View style={styles.impactIconContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg' }} 
                style={styles.impactIcon} 
              />
            </View>
            <View style={styles.impactInfo}>
              <Text style={styles.impactHeading}>$25 provides</Text>
              <Text style={styles.impactDescription}>1 week of food for a rescued animal</Text>
            </View>
          </View>
          
          <View style={styles.impactItem}>
            <View style={styles.impactIconContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1350591/pexels-photo-1350591.jpeg' }} 
                style={styles.impactIcon} 
              />
            </View>
            <View style={styles.impactInfo}>
              <Text style={styles.impactHeading}>$50 provides</Text>
              <Text style={styles.impactDescription}>Vaccination and deworming for 2 animals</Text>
            </View>
          </View>
          
          <View style={styles.impactItem}>
            <View style={styles.impactIconContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg' }} 
                style={styles.impactIcon} 
              />
            </View>
            <View style={styles.impactInfo}>
              <Text style={styles.impactHeading}>$100 provides</Text>
              <Text style={styles.impactDescription}>Medical treatment for an injured animal</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  banner: {
    backgroundColor: Colors.primary[500],
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.gray[900],
    marginBottom: 16,
  },
  charityCard: {
    flexDirection: 'row',
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCharityCard: {
    borderColor: Colors.primary[500],
    backgroundColor: Colors.primary[50],
  },
  charityLogo: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  charityInfo: {
    flex: 1,
    marginLeft: 12,
  },
  charityName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.gray[900],
    marginBottom: 4,
  },
  charityDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.gray[600],
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.accent[500],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  featuredBadgeText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: '#fff',
  },
  amountOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountOption: {
    width: '48%',
    paddingVertical: 16,
    backgroundColor: Colors.gray[100],
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedAmountOption: {
    backgroundColor: Colors.primary[500],
  },
  amountOptionText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.gray[800],
  },
  selectedAmountOptionText: {
    color: '#fff',
  },
  customAmountContainer: {
    marginTop: 8,
  },
  customAmountLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.gray[800],
    marginBottom: 8,
  },
  customAmountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.gray[50],
  },
  currencySymbol: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 18,
    color: Colors.gray[700],
    marginRight: 4,
  },
  customAmountInput: {
    flex: 1,
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[900],
    paddingVertical: 12,
  },
  donateButton: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  secureText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 24,
  },
  impactSection: {
    backgroundColor: Colors.gray[50],
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  impactTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.gray[900],
    marginBottom: 16,
  },
  impactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  impactIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  impactIcon: {
    width: 60,
    height: 60,
  },
  impactInfo: {
    flex: 1,
  },
  impactHeading: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.primary[500],
    marginBottom: 4,
  },
  impactDescription: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.gray[700],
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 28,
    color: Colors.gray[900],
    marginBottom: 16,
  },
  successMessage: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[700],
    textAlign: 'center',
    marginBottom: 8,
  },
  successSubMessage: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 32,
  },
  successButton: {
    width: 200,
  },
});