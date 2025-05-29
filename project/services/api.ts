// In a real app, this would connect to your MySQL backend
// This is a mock implementation for demonstration
export const API_BASE_URL = 'https://api.petpals.example';

export interface Pet {
  id: string;
  name: string;
  imageUrl: string;
  breed: string;
  age: string;
  price: number | null;
  isStray: boolean;
  distance: string;
  category: string;
  description: string;
  ownerInfo?: {
    name: string;
    phone: string;
    email: string;
  };
  rescueInfo?: {
    organization: string;
    address: string;
    phone: string;
  };
  pickupLocation: string;
  pickupDate: string;
}

export interface PetFormData {
  name: string;
  breed: string;
  age: string;
  price: number | null;
  isStray: boolean;
  location: string;
  description: string;
  photoUri: string;
}

// Mock implementation
export const getPets = async (): Promise<Pet[]> => {
  // In a real app, this would be a fetch call to your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Max',
          imageUrl: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg',
          breed: 'Golden Retriever',
          age: '2 years',
          price: 250,
          isStray: false,
          distance: '2.5 km',
          category: 'dog',
          description: 'Max is a friendly and energetic Golden Retriever who loves to play and go for walks.',
          ownerInfo: {
            name: 'Sarah Johnson',
            phone: '+1 (555) 123-4567',
            email: 'sarah.j@example.com'
          },
          pickupLocation: '123 Oak Street, Riverside, CA',
          pickupDate: '2025-06-15'
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
          category: 'cat',
          description: 'Luna is a beautiful Bengal cat with a playful personality.',
          ownerInfo: {
            name: 'Michael Chen',
            phone: '+1 (555) 987-6543',
            email: 'michael.c@example.com'
          },
          pickupLocation: '456 Maple Avenue, Lakeside, CA',
          pickupDate: '2025-06-20'
        }
      ]);
    }, 1000);
  });
};

export const getPetById = async (id: string): Promise<Pet | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const pets = [
        {
          id: '1',
          name: 'Max',
          imageUrl: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg',
          breed: 'Golden Retriever',
          age: '2 years',
          price: 250,
          isStray: false,
          distance: '2.5 km',
          category: 'dog',
          description: 'Max is a friendly and energetic Golden Retriever who loves to play and go for walks.',
          ownerInfo: {
            name: 'Sarah Johnson',
            phone: '+1 (555) 123-4567',
            email: 'sarah.j@example.com'
          },
          pickupLocation: '123 Oak Street, Riverside, CA',
          pickupDate: '2025-06-15'
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
          category: 'cat',
          description: 'Luna is a beautiful Bengal cat with a playful personality.',
          ownerInfo: {
            name: 'Michael Chen',
            phone: '+1 (555) 987-6543',
            email: 'michael.c@example.com'
          },
          pickupLocation: '456 Maple Avenue, Lakeside, CA',
          pickupDate: '2025-06-20'
        }
      ];
      
      const pet = pets.find(p => p.id === id) || null;
      resolve(pet);
    }, 500);
  });
};

export const addPet = async (petData: PetFormData): Promise<Pet> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newPet: Pet = {
        id: Math.random().toString(36).substr(2, 9),
        name: petData.name,
        imageUrl: petData.photoUri,
        breed: petData.breed,
        age: petData.age,
        price: petData.price,
        isStray: petData.isStray,
        distance: '0.5 km',
        category: petData.breed.toLowerCase().includes('cat') ? 'cat' : 'dog',
        description: petData.description,
        pickupLocation: petData.location,
        pickupDate: new Date().toISOString().split('T')[0]
      };
      
      resolve(newPet);
    }, 2000);
  });
};

export const makeDonation = async (amount: number, charityId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
};

export const getFavorites = async (): Promise<Pet[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Max',
          imageUrl: 'https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg',
          breed: 'Golden Retriever',
          age: '2 years',
          price: 250,
          isStray: false,
          distance: '2.5 km',
          category: 'dog',
          description: 'Max is a friendly and energetic Golden Retriever who loves to play and go for walks.',
          ownerInfo: {
            name: 'Sarah Johnson',
            phone: '+1 (555) 123-4567',
            email: 'sarah.j@example.com'
          },
          pickupLocation: '123 Oak Street, Riverside, CA',
          pickupDate: '2025-06-15'
        }
      ]);
    }, 1000);
  });
};