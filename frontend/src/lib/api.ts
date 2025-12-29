const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error: ApiError = {
      message: data.message || 'An error occurred',
      errors: data.errors,
    };
    throw error;
  }

  return data;
}

// Vehicle types
export interface VehicleImage {
  id: number;
  url: string;
  alt: string;
  is_primary: boolean;
}

export interface VehicleSpecifications {
  seats: number;
  transmission: string;
  fuelType: string;
  year: number;
  color: string;
  engine: string;
  features: string[];
}

export interface Vehicle {
  id: number;
  name: string;
  slug: string;
  type: string;
  description: string;
  short_description: string;
  specifications: VehicleSpecifications;
  price_per_day: string;
  price_per_hour: string;
  formatted_price: string;
  images: VehicleImage[];
  primary_image: string;
}

// Service types
export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  icon: string;
  price: string;
  formatted_price: string;
  features: string[];
}

// Testimonial types
export interface Testimonial {
  id: number;
  customer_name: string;
  customer_title: string;
  content: string;
  rating: number;
  avatar: string | null;
}

// FAQ types
export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// Booking types
export interface BookingRequest {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  vehicle_id?: number;
  service_id?: number;
  start_date: string;
  end_date: string;
  start_time?: string;
  pickup_location: string;
  dropoff_location?: string;
  notes?: string;
}

export interface BookingResponse {
  booking_number: string;
  status: string;
  total_price: string;
}

// Availability types
export interface VehicleAvailability {
  vehicle_id: number;
  vehicle_name: string;
  unavailable_dates: string[];
}

export interface AvailabilityConflict {
  type: 'booking' | 'blocked';
  start_date: string;
  end_date: string;
  reason?: string;
}

export interface AvailabilityCheckResponse {
  available: boolean;
  vehicle_id: number;
  conflicts: AvailabilityConflict[];
}

// Contact types
export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

// Site Settings types
export interface SiteSettings {
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  social: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
  stats: {
    years_experience: string;
    happy_customers: string;
    vehicles_count: string;
    service_count: string;
  };
  pricing: {
    currency: string;
    minimum_rental_days: string;
  };
  company: {
    name: string;
    tagline: string;
  };
}

// API Functions

export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetchApi<ApiResponse<Vehicle[]>>('/vehicles');
  return response.data;
}

export async function getVehicle(slug: string): Promise<Vehicle> {
  const response = await fetchApi<ApiResponse<Vehicle>>(`/vehicles/${slug}`);
  return response.data;
}

export async function getServices(): Promise<Service[]> {
  const response = await fetchApi<ApiResponse<Service[]>>('/services');
  return response.data;
}

export async function getService(slug: string): Promise<Service> {
  const response = await fetchApi<ApiResponse<Service>>(`/services/${slug}`);
  return response.data;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const response = await fetchApi<ApiResponse<Testimonial[]>>('/testimonials');
  return response.data;
}

export async function getFaqs(): Promise<FAQ[]> {
  const response = await fetchApi<ApiResponse<FAQ[]>>('/faqs');
  return response.data;
}

export async function getSettings(): Promise<SiteSettings> {
  const response = await fetchApi<ApiResponse<SiteSettings>>('/settings');
  return response.data;
}

export async function submitBooking(
  booking: BookingRequest
): Promise<BookingResponse> {
  const response = await fetchApi<ApiResponse<BookingResponse>>('/bookings', {
    method: 'POST',
    body: JSON.stringify(booking),
  });
  return response.data;
}

export async function submitContact(contact: ContactRequest): Promise<void> {
  await fetchApi<ApiResponse<null>>('/contact', {
    method: 'POST',
    body: JSON.stringify(contact),
  });
}

export async function getVehicleAvailability(
  vehicleId: number,
  startDate: string,
  endDate: string
): Promise<VehicleAvailability> {
  const response = await fetchApi<ApiResponse<VehicleAvailability>>(
    `/vehicles/${vehicleId}/availability?start_date=${startDate}&end_date=${endDate}`
  );
  return response.data;
}

export async function checkBookingAvailability(
  vehicleId: number,
  startDate: string,
  endDate: string
): Promise<AvailabilityCheckResponse> {
  const response = await fetchApi<ApiResponse<AvailabilityCheckResponse>>(
    '/bookings/check-availability',
    {
      method: 'POST',
      body: JSON.stringify({
        vehicle_id: vehicleId,
        start_date: startDate,
        end_date: endDate,
      }),
    }
  );
  return response.data;
}

export { API_BASE_URL };
