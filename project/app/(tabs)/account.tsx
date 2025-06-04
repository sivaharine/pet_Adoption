import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Switch,
  Alert,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { User, Mail, Phone, MapPin, Bell, Lock, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import { useUser } from '@/context/UserContext';


export default function AccountScreen() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  if (!user) {
    // if user not logged in, show message or redirect
    return (
      <View style={styles.centered}>
        <Text>Please login first.</Text>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            setUser(null);
            router.replace('/login');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Account" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: user.imageUrl }} 
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <User size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user.name}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Mail size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <Phone size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone || 'N/A'}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <View style={styles.infoIconContainer}>
              <MapPin size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{user.address || 'N/A'}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Bell size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: Colors.gray[300], true: Colors.primary[300] }}
              thumbColor={notificationsEnabled ? Colors.primary[500] : Colors.gray[100]}
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Lock size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Change Password</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <HelpCircle size={20} color={Colors.primary[500]} />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={Colors.gray[500]} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.gray[900],
  },
  userEmail: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    marginTop: 2,
  },
  editProfileButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.primary[500],
  },
  editProfileText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  sectionTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: Colors.gray[900],
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: Colors.gray[900],
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.gray[900],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  logoutText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.error,
    marginLeft: 8,
  },
});
