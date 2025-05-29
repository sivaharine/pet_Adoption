import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Platform, 
  KeyboardAvoidingView, 
  Alert 
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Camera, RefreshCcw, Check, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';

const AddPetSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .required('Pet name is required'),
  breed: Yup.string()
    .required('Breed is required'),
  age: Yup.string()
    .required('Age is required'),
  price: Yup.number()
    .nullable()
    .transform((value) => (isNaN(value) ? null : value))
    .when('isStray', {
      is: true,
      then: () => Yup.number().nullable(),
      otherwise: () => Yup.number()
        .nullable()
        .transform((value) => (isNaN(value) ? null : value))
        .typeError('Price must be a number'),
    }),
  location: Yup.string()
    .required('Pickup location is required'),
  description: Yup.string()
    .required('Description is required'),
});

export default function AddPetScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (!cameraRef.current) return;
    
    try {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
      setIsCameraActive(false);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };

  const handleAddPet = async (values: any) => {
    try {
      setIsSubmitting(true);
      
      if (!photo) {
        Alert.alert('Missing Photo', 'Please take a photo of the pet');
        setIsSubmitting(false);
        return;
      }
      
      // Here we would handle the actual pet addition with your backend
      console.log('Pet details:', { ...values, photoUri: photo });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setPhoto(null);
      values.name = '';
      values.breed = '';
      values.age = '';
      values.price = '';
      values.location = '';
      values.description = '';
      values.isStray = false;
      
      Alert.alert(
        'Success', 
        'Pet added successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Add pet error:', error);
      Alert.alert('Error', 'Failed to add pet. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activateCamera = () => {
    if (permission?.granted) {
      setIsCameraActive(true);
    } else {
      requestPermission();
    }
  };

  const renderCamera = () => {
    if (!permission?.granted) {
      return (
        <View style={styles.cameraPermissionContainer}>
          <Text style={styles.permissionText}>We need camera permission to take pet photos</Text>
          <Button 
            title="Grant Permission" 
            onPress={requestPermission} 
            size="small"
          />
        </View>
      );
    }

    return (
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={facing}
        >
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cameraButton} onPress={() => setIsCameraActive(false)}>
              <X size={24} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraFacing}>
              <RefreshCcw size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  };

  if (isCameraActive) {
    return (
      <View style={styles.container}>
        <Header title="Take Pet Photo" showBackButton={() => setIsCameraActive(false)} />
        {renderCamera()}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Header title="Add a Pet" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.photoSection}>
          {photo ? (
            <View style={styles.photoPreviewContainer}>
              <Image source={{ uri: photo }} style={styles.photoPreview} />
              <TouchableOpacity 
                style={styles.changePhotoButton}
                onPress={activateCamera}
              >
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addPhotoButton}
              onPress={activateCamera}
            >
              <Camera size={24} color={Colors.primary[500]} />
              <Text style={styles.addPhotoText}>Take a Photo</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <Formik
          initialValues={{ 
            name: '', 
            breed: '', 
            age: '', 
            price: '', 
            location: '', 
            description: '', 
            isStray: false 
          }}
          validationSchema={AddPetSchema}
          onSubmit={handleAddPet}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <View style={styles.form}>
              <Input
                label="Pet Name"
                placeholder="Enter pet name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name ? errors.name : undefined}
              />
              
              <Input
                label="Breed"
                placeholder="Enter breed"
                value={values.breed}
                onChangeText={handleChange('breed')}
                onBlur={handleBlur('breed')}
                error={touched.breed && errors.breed ? errors.breed : undefined}
              />
              
              <Input
                label="Age"
                placeholder="Enter age (e.g., 2 years)"
                value={values.age}
                onChangeText={handleChange('age')}
                onBlur={handleBlur('age')}
                error={touched.age && errors.age ? errors.age : undefined}
              />
              
              <View style={styles.strayToggleContainer}>
                <Text style={styles.label}>Is this a stray animal?</Text>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleOption,
                      values.isStray && styles.toggleOptionActive
                    ]}
                    onPress={() => setFieldValue('isStray', true)}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        values.isStray && styles.toggleTextActive
                      ]}
                    >
                      Yes
                    </Text>
                    {values.isStray && (
                      <View style={styles.checkIcon}>
                        <Check size={14} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.toggleOption,
                      !values.isStray && styles.toggleOptionActive
                    ]}
                    onPress={() => setFieldValue('isStray', false)}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        !values.isStray && styles.toggleTextActive
                      ]}
                    >
                      No (Has Owner)
                    </Text>
                    {!values.isStray && (
                      <View style={styles.checkIcon}>
                        <Check size={14} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              
              {!values.isStray && (
                <Input
                  label="Price"
                  placeholder="Enter price (leave empty if negotiable)"
                  keyboardType="numeric"
                  value={values.price?.toString()}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  error={touched.price && errors.price ? errors.price : undefined}
                />
              )}
              
              <Input
                label="Pickup Location"
                placeholder="Enter pickup location"
                value={values.location}
                onChangeText={handleChange('location')}
                onBlur={handleBlur('location')}
                error={touched.location && errors.location ? errors.location : undefined}
              />
              
              <Input
                label="Description"
                placeholder="Enter pet description"
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                error={touched.description && errors.description ? errors.description : undefined}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={styles.textArea}
              />
              
              <Button
                title="Add Pet"
                onPress={() => handleSubmit()}
                style={styles.submitButton}
                isLoading={isSubmitting}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  addPhotoButton: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundColor: Colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.gray[300],
    borderStyle: 'dashed',
  },
  addPhotoText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.primary[500],
    marginTop: 12,
  },
  photoPreviewContainer: {
    position: 'relative',
  },
  photoPreview: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  changePhotoText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
  form: {
    width: '100%',
  },
  strayToggleContainer: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginBottom: 6,
    color: Colors.gray[800],
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    marginHorizontal: 4,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  toggleOptionActive: {
    backgroundColor: Colors.primary[500],
  },
  toggleText: {
    fontFamily: 'Nunito-SemiBold',
    color: Colors.gray[700],
  },
  toggleTextActive: {
    color: '#fff',
  },
  checkIcon: {
    marginLeft: 8,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    marginTop: 24,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cameraButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },
  cameraPermissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  permissionText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.gray[800],
    textAlign: 'center',
    marginBottom: 16,
  },
});