// Vehicle Types
export interface Vehicle {
    id: number;
    name: string;
    slug: string;
    type: string;
    description: string;
    specifications: VehicleSpecifications;
    pricePerDay: number;
    pricePerHour?: number;
    images: VehicleImage[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface VehicleSpecifications {
    seats: number;
    transmission: string;
    fuelType: string;
    year: number;
    color: string;
    features: string[];
}

export interface VehicleImage {
    id: number;
    url: string;
    alt: string;
    isPrimary: boolean;
}

// Service Types
export interface Service {
    id: number;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    icon: string;
    price?: number;
    priceType?: 'fixed' | 'hourly' | 'daily' | 'custom';
    features: string[];
    image?: string;
    isActive: boolean;
}

// Booking Types
export interface Booking {
    id: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    vehicleId: number;
    vehicle?: Vehicle;
    serviceId?: number;
    service?: Service;
    startDate: string;
    endDate: string;
    pickupLocation: string;
    dropoffLocation: string;
    notes?: string;
    totalPrice: number;
    status: BookingStatus;
    createdAt: string;
    updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

// Testimonial Types
export interface Testimonial {
    id: number;
    customerName: string;
    customerPhoto?: string;
    content: string;
    rating: number;
    isFeatured: boolean;
    createdAt: string;
}

// FAQ Types
export interface FAQ {
    id: number;
    question: string;
    answer: string;
    order: number;
    isActive: boolean;
}

// Common Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        currentPage: number;
        lastPage: number;
        perPage: number;
        total: number;
    };
}

// Form Types
export interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    vehicleId: number;
    serviceId?: number;
    startDate: string;
    endDate: string;
    pickupLocation: string;
    dropoffLocation: string;
    notes?: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}
