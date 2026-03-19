// ─── Types ────────────────────────────────────────────────────────────────────

export type PropertyType = 'apartment' | 'house' | 'studio' | 'condo'
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
export type ListingStatus = 'live' | 'in_review' | 'rejected' | 'pending'
export type TourStatus = 'scheduled' | 'completed' | 'cancelled'

export interface Property {
  id: string
  slug: string
  title: string
  address: string
  neighborhood: string
  city: string
  state: string
  zip: string
  type: PropertyType
  bedrooms: number
  bathrooms: number
  price: number
  distanceToUvm: number // miles
  rating: number
  reviewCount: number
  images: string[]
  amenities: string[]
  description: string
  availableFrom: string
  petsAllowed: boolean
  parkingIncluded: boolean
  utilitiesIncluded: boolean
  laundry: 'in_unit' | 'in_building' | 'none'
  landlordId: string
  status: ListingStatus
  featured: boolean
}

export interface Package {
  id: string
  name: string
  price: number
  description: string
  features: string[]
  highlighted: boolean
  badge?: string
}

export interface AddOn {
  id: string
  name: string
  price: number
  description: string
}

export interface Review {
  id: string
  propertyId: string
  authorName: string
  authorYear: string
  rating: number
  headline: string
  body: string
  date: string
  verified: boolean
}

export interface Booking {
  id: string
  studentId: string
  packageId: string
  packageName: string
  packagePrice: number
  addOns: { id: string; name: string; price: number }[]
  groupSize: number
  groupDiscount: number
  totalPrice: number
  status: BookingStatus
  propertyIds: string[]
  createdAt: string
  updatedAt: string
  coordinatorName: string
  coordinatorEmail: string
  notes: string
  tours: Tour[]
  documents: Document[]
}

export interface Tour {
  id: string
  bookingId: string
  propertyId: string
  propertyAddress: string
  date: string
  time: string
  status: TourStatus
  notes?: string
}

export interface Document {
  id: string
  name: string
  type: 'lease' | 'inspection' | 'receipt' | 'other'
  url: string
  uploadedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'landlord'
  avatar?: string
  university?: string
  graduationYear?: number
  phone?: string
}

export interface LandlordListing {
  id: string
  landlordId: string
  propertyId: string
  title: string
  status: ListingStatus
  tourRequests: number
  views: number
  createdAt: string
}

// ─── Mock Users ───────────────────────────────────────────────────────────────

export const DEMO_STUDENT: User = {
  id: 'student-1',
  name: 'Alex Thompson',
  email: 'alex.thompson@uvm.edu',
  role: 'student',
  university: 'University of Vermont',
  graduationYear: 2026,
  phone: '(802) 555-0142',
}

export const DEMO_LANDLORD: User = {
  id: 'landlord-1',
  name: 'Sarah Mitchell',
  email: 'sarah@burlingtonprops.com',
  role: 'landlord',
  phone: '(802) 555-0198',
}

export const MOCK_USERS: User[] = [
  DEMO_STUDENT,
  {
    id: 'student-2',
    name: 'Jordan Lee',
    email: 'jordan.lee@uvm.edu',
    role: 'student',
    university: 'University of Vermont',
    graduationYear: 2025,
    phone: '(802) 555-0177',
  },
  DEMO_LANDLORD,
  {
    id: 'landlord-2',
    name: 'David Chen',
    email: 'david@vermontrentals.com',
    role: 'landlord',
    phone: '(802) 555-0211',
  },
]

// ─── Properties ───────────────────────────────────────────────────────────────

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    slug: '142-maple-st-hill-section',
    title: 'Charming 2BR on Maple Street',
    address: '142 Maple St',
    neighborhood: 'Hill Section',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    price: 1850,
    distanceToUvm: 0.4,
    rating: 4.7,
    reviewCount: 14,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    amenities: ['High-speed WiFi', 'In-unit laundry', 'Hardwood floors', 'Off-street parking', 'Updated kitchen', 'Heat included'],
    description: 'A beautifully maintained 2-bedroom apartment in the sought-after Hill Section, just a 10-minute walk to UVM campus. Features original hardwood floors, a newly renovated kitchen, and a private backyard perfect for studying outdoors. Heat and hot water included in rent.',
    availableFrom: '2025-08-01',
    petsAllowed: false,
    parkingIncluded: true,
    utilitiesIncluded: true,
    laundry: 'in_unit',
    landlordId: 'landlord-1',
    status: 'live',
    featured: true,
  },
  {
    id: 'prop-2',
    slug: '317-north-ave-old-north-end',
    title: 'Spacious 3BR in Old North End',
    address: '317 North Ave',
    neighborhood: 'Old North End',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'house',
    bedrooms: 3,
    bathrooms: 1,
    price: 2400,
    distanceToUvm: 1.2,
    rating: 4.2,
    reviewCount: 9,
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&q=80',
    ],
    amenities: ['Backyard', 'Basement storage', 'Street parking', 'Gas stove', 'Dishwasher', 'Cable ready'],
    description: 'A classic Vermont house with plenty of character in the vibrant Old North End neighborhood. Three generously sized bedrooms make this ideal for a group of students. The large backyard is perfect for summer BBQs, and the basement offers ample storage for bikes and gear.',
    availableFrom: '2025-08-15',
    petsAllowed: true,
    parkingIncluded: false,
    utilitiesIncluded: false,
    laundry: 'in_building',
    landlordId: 'landlord-2',
    status: 'live',
    featured: true,
  },
  {
    id: 'prop-3',
    slug: '88-south-willard-st-hill-section',
    title: 'Cozy Studio on South Willard',
    address: '88 South Willard St',
    neighborhood: 'Hill Section',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'studio',
    bedrooms: 0,
    bathrooms: 1,
    price: 1100,
    distanceToUvm: 0.2,
    rating: 4.9,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1416331108676-a22ccbe8d9b5?w=800&q=80',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
    ],
    amenities: ['All utilities included', 'Furnished option', 'Bike storage', 'Quiet building', 'Study nook', 'Natural light'],
    description: 'The perfect solo studio just 5 minutes from UVM\'s main campus. Recently renovated with modern finishes and all utilities included. The building is home to many UVM students and has a fantastic community feel. Ideal for a focused, independent student lifestyle.',
    availableFrom: '2025-09-01',
    petsAllowed: false,
    parkingIncluded: false,
    utilitiesIncluded: true,
    laundry: 'in_building',
    landlordId: 'landlord-1',
    status: 'live',
    featured: true,
  },
  {
    id: 'prop-4',
    slug: '204-elmwood-ave-south-end',
    title: 'Modern 2BR in South End',
    address: '204 Elmwood Ave',
    neighborhood: 'South End',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    price: 1750,
    distanceToUvm: 1.8,
    rating: 4.5,
    reviewCount: 11,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80',
    ],
    amenities: ['In-unit laundry', 'Central AC', 'Open floor plan', 'Stainless appliances', 'Rooftop deck access', 'Secure entry'],
    description: 'Stylish modern apartment in Burlington\'s trendy South End arts district. Walking distance to great restaurants, cafes, and the Burlington Bike Path. This unit features an open floor plan, high ceilings, and stainless steel appliances. A great base for students who love the arts scene.',
    availableFrom: '2025-08-01',
    petsAllowed: true,
    parkingIncluded: false,
    utilitiesIncluded: false,
    laundry: 'in_unit',
    landlordId: 'landlord-2',
    status: 'live',
    featured: false,
  },
  {
    id: 'prop-5',
    slug: '45-loomis-st-hill-section',
    title: 'Bright 1BR on Loomis',
    address: '45 Loomis St',
    neighborhood: 'Hill Section',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    price: 1350,
    distanceToUvm: 0.6,
    rating: 4.8,
    reviewCount: 17,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
      'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?w=800&q=80',
      'https://images.unsplash.com/photo-1560185008-a33f5c7b1844?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    ],
    amenities: ['South-facing windows', 'Exposed brick', 'Updated bathroom', 'Quiet street', 'Close to campus', 'Heat included'],
    description: 'Bright and airy one-bedroom with beautiful exposed brick and south-facing windows that flood the space with natural light. Perfect for a solo student or couple, this apartment is a short walk to UVM and the Church Street Marketplace. Heat is included in rent.',
    availableFrom: '2025-08-01',
    petsAllowed: false,
    parkingIncluded: false,
    utilitiesIncluded: false,
    laundry: 'in_building',
    landlordId: 'landlord-1',
    status: 'live',
    featured: false,
  },
  {
    id: 'prop-6',
    slug: '712-north-ave-new-north-end',
    title: 'Large 4BR House — New North End',
    address: '712 North Ave',
    neighborhood: 'New North End',
    city: 'Burlington',
    state: 'VT',
    zip: '05408',
    type: 'house',
    bedrooms: 4,
    bathrooms: 2,
    price: 3200,
    distanceToUvm: 2.1,
    rating: 4.0,
    reviewCount: 6,
    images: [
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    amenities: ['4 bedrooms', '2 full baths', 'Driveway parking', 'Large yard', 'Finished basement', 'Garage', 'Lake views'],
    description: 'A fantastic large house in the New North End, perfect for a group of four students looking to split costs. With 4 bedrooms, 2 full bathrooms, a finished basement, and a large yard, there is space for everyone. Driveway parking included. Near North Beach and the lake.',
    availableFrom: '2025-08-15',
    petsAllowed: true,
    parkingIncluded: true,
    utilitiesIncluded: false,
    laundry: 'in_unit',
    landlordId: 'landlord-2',
    status: 'live',
    featured: false,
  },
  {
    id: 'prop-7',
    slug: '33-prospect-st-hill-section',
    title: 'Updated 2BR on Prospect',
    address: '33 Prospect St',
    neighborhood: 'Hill Section',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    price: 1950,
    distanceToUvm: 0.3,
    rating: 4.6,
    reviewCount: 13,
    images: [
      'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=800&q=80',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80',
      'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800&q=80',
      'https://images.unsplash.com/photo-1527030280862-64139fba04ca?w=800&q=80',
    ],
    amenities: ['Renovated kitchen', 'New appliances', 'Hardwood floors', 'Large closets', 'Off-street parking', 'Porch'],
    description: 'Recently renovated two-bedroom apartment on one of the Hill Section\'s prettiest streets. Boasts a newly renovated kitchen with granite countertops, brand new appliances, and refinished hardwood floors throughout. Private porch and off-street parking. Steps from UVM.',
    availableFrom: '2025-07-01',
    petsAllowed: false,
    parkingIncluded: true,
    utilitiesIncluded: false,
    laundry: 'in_building',
    landlordId: 'landlord-1',
    status: 'live',
    featured: false,
  },
  {
    id: 'prop-8',
    slug: '156-college-st-downtown',
    title: 'Downtown Studio on College St',
    address: '156 College St',
    neighborhood: 'Downtown',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'studio',
    bedrooms: 0,
    bathrooms: 1,
    price: 1200,
    distanceToUvm: 0.8,
    rating: 4.3,
    reviewCount: 8,
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
      'https://images.unsplash.com/photo-1618219944342-824e40a13285?w=800&q=80',
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&q=80',
    ],
    amenities: ['Walk to Church Street', 'City views', 'Secure building', 'Elevator', 'Gym access', 'Bike room'],
    description: 'Urban studio right in the heart of Burlington\'s downtown. Walk to Church Street, restaurants, shops, and the waterfront. The building features a gym, secure bike storage, and an elevator. Perfect for a student who wants to be at the center of everything Burlington has to offer.',
    availableFrom: '2025-09-01',
    petsAllowed: false,
    parkingIncluded: false,
    utilitiesIncluded: false,
    laundry: 'in_building',
    landlordId: 'landlord-2',
    status: 'live',
    featured: false,
  },
  {
    id: 'prop-9',
    slug: '89-pine-st-south-end',
    title: 'Stylish 3BR on Pine St',
    address: '89 Pine St',
    neighborhood: 'South End',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    price: 2650,
    distanceToUvm: 2.0,
    rating: 4.4,
    reviewCount: 7,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    ],
    amenities: ['2 full baths', 'Deck', 'In-unit laundry', 'Parking', 'Updated kitchen', 'Open living area'],
    description: 'Beautiful three-bedroom apartment in a converted industrial building in the South End. Features exposed beams, polished concrete floors, and two full baths — ideal for three students. The spacious deck is perfect for relaxing, and the South End restaurant scene is right at your doorstep.',
    availableFrom: '2025-08-01',
    petsAllowed: true,
    parkingIncluded: true,
    utilitiesIncluded: false,
    laundry: 'in_unit',
    landlordId: 'landlord-1',
    status: 'live',
    featured: false,
  },
  {
    id: 'prop-10',
    slug: '22-buell-st-downtown',
    title: 'Sunny 1BR on Buell Street',
    address: '22 Buell St',
    neighborhood: 'Downtown',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'condo',
    bedrooms: 1,
    bathrooms: 1,
    price: 1450,
    distanceToUvm: 0.9,
    rating: 4.7,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1558618047-3c2232a18b6e?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090733a21e0?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
    ],
    amenities: ['Condo quality', 'Hardwood floors', 'High ceilings', 'Quartz counters', 'Deeded parking', 'Storage unit'],
    description: 'Impeccably maintained condo-quality one-bedroom in a quiet downtown location. This home features soaring ceilings, quartz countertops, and high-end finishes throughout. A deeded parking spot and storage unit are included. A perfect blend of quality and convenience for a discerning student.',
    availableFrom: '2025-08-15',
    petsAllowed: false,
    parkingIncluded: true,
    utilitiesIncluded: false,
    laundry: 'in_building',
    landlordId: 'landlord-2',
    status: 'live',
    featured: false,
  },
  {
    id: 'prop-11',
    slug: '401-riverside-ave-south-end',
    title: 'Affordable 2BR on Riverside',
    address: '401 Riverside Ave',
    neighborhood: 'South End',
    city: 'Burlington',
    state: 'VT',
    zip: '05401',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    price: 1680,
    distanceToUvm: 1.5,
    rating: 4.1,
    reviewCount: 5,
    images: [
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&q=80',
      'https://images.unsplash.com/photo-1505873242700-f289a29e1724?w=800&q=80',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    ],
    amenities: ['Bike path access', 'Quiet neighborhood', 'Large windows', 'Shared yard', 'Coin laundry', 'Bus route'],
    description: 'A solid two-bedroom apartment at a great price point near the Burlington Bike Path. The unit has large windows, a shared backyard, and is on a major bus route making it easy to get to campus. Coin laundry in the building. A reliable choice for students on a budget.',
    availableFrom: '2025-09-01',
    petsAllowed: false,
    parkingIncluded: false,
    utilitiesIncluded: false,
    laundry: 'in_building',
    landlordId: 'landlord-2',
    status: 'live',
    featured: false,
  },
  {
    id: 'prop-12',
    slug: '67-williston-rd-east-side',
    title: 'Classic 3BR on Williston Road',
    address: '67 Williston Rd',
    neighborhood: 'East Side',
    city: 'Burlington',
    state: 'VT',
    zip: '05403',
    type: 'house',
    bedrooms: 3,
    bathrooms: 1,
    price: 2200,
    distanceToUvm: 1.7,
    rating: 4.5,
    reviewCount: 10,
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80',
      'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800&q=80',
      'https://images.unsplash.com/photo-1600047508788-786f3865b09a?w=800&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f28320c7?w=800&q=80',
    ],
    amenities: ['3 bedrooms', 'Spacious yard', 'Driveway', 'Mudroom', 'Gas heat', 'Attic storage'],
    description: 'A classic New England house on a quiet street on the East Side. Three generously sized bedrooms, a large yard perfect for outdoor activities, and a mudroom for all your winter gear. The house has a warm, homey feel and is close to the South Burlington shopping corridor.',
    availableFrom: '2025-08-01',
    petsAllowed: true,
    parkingIncluded: true,
    utilitiesIncluded: false,
    laundry: 'in_building',
    landlordId: 'landlord-1',
    status: 'live',
    featured: false,
  },
]

// ─── Packages ─────────────────────────────────────────────────────────────────

export const PACKAGES: Package[] = [
  {
    id: 'pkg-base',
    name: 'Base Package',
    price: 199,
    description: 'Everything you need to find and secure a great apartment near UVM.',
    features: [
      'Access to curated verified listings',
      '1 scheduled property tour',
      'Personal coordinator contact',
      'Neighborhood guides & tips',
      'Email support (48-hour response)',
      'Burlington commute map',
    ],
    highlighted: false,
  },
  {
    id: 'pkg-premium',
    name: 'Premium Package',
    price: 349,
    description: 'Full-service support from search to signed lease. Peace of mind included.',
    features: [
      'Everything in Base',
      '2 scheduled property tours',
      'Professional lease review',
      'Certified inspection report',
      'Priority coordinator scheduling',
      'Lease negotiation guidance',
      'Move-in checklist & support',
      'Phone support (same-day response)',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
]

// ─── Add-ons ──────────────────────────────────────────────────────────────────

export const ADD_ONS: AddOn[] = [
  {
    id: 'addon-tour',
    name: 'Extra Property Tour',
    price: 49,
    description: 'Add one additional scheduled tour to your package.',
  },
  {
    id: 'addon-lease',
    name: 'Emergency Lease Review',
    price: 89,
    description: 'Expedited 24-hour professional lease review with written summary.',
  },
  {
    id: 'addon-parent',
    name: 'Parent Consultation',
    price: 59,
    description: '30-minute video call with your coordinator and a parent or guardian.',
  },
]

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    propertyId: 'prop-1',
    authorName: 'Emma S.',
    authorYear: 'UVM Junior',
    rating: 5,
    headline: 'Best apartment I\'ve had in Burlington',
    body: 'The Hill Section location is unbeatable — I walk to class in 8 minutes and the neighborhood is so safe and quiet. The landlord is super responsive and the heat being included saved me a lot of money this winter. Would absolutely recommend this place to any UVM student.',
    date: '2024-11-15',
    verified: true,
  },
  {
    id: 'rev-2',
    propertyId: 'prop-1',
    authorName: 'Marcus T.',
    authorYear: 'UVM Senior',
    rating: 4,
    headline: 'Great location, solid apartment',
    body: 'Lived here for two years. The commute to campus is perfect and the in-unit laundry is a huge plus. Walls are a bit thin but nothing too bad. The landlord fixed things quickly whenever something came up. Good value for the Hill Section.',
    date: '2024-10-22',
    verified: true,
  },
  {
    id: 'rev-3',
    propertyId: 'prop-3',
    authorName: 'Priya K.',
    authorYear: 'UVM Graduate Student',
    rating: 5,
    headline: 'Perfect for a focused student',
    body: 'I needed a quiet, affordable place close to campus for my grad program and this studio delivered on every front. The natural light is incredible, all utilities are included so budgeting is easy, and the building community is mostly other students so everyone is respectful. 5/5.',
    date: '2024-12-01',
    verified: true,
  },
  {
    id: 'rev-4',
    propertyId: 'prop-3',
    authorName: 'Tyler B.',
    authorYear: 'UVM Sophomore',
    rating: 5,
    headline: 'Tiny but mighty — loved every month',
    body: 'Don\'t let the "studio" label fool you — this is a really well-designed space that feels much bigger than it is. The natural light makes it feel airy and the storage is clever. And 0.2 miles from campus? Unbeatable for the price. My top recommendation for solo students.',
    date: '2025-01-08',
    verified: true,
  },
  {
    id: 'rev-5',
    propertyId: 'prop-2',
    authorName: 'Chloe M.',
    authorYear: 'UVM Senior',
    rating: 4,
    headline: 'Great for a group of friends',
    body: 'Four of us lived here last year and it was a blast. The house has real character and the backyard was our favorite feature all spring and summer. The Old North End has great food and a really fun community. The commute is a bit longer but a bus goes straight to campus.',
    date: '2024-09-18',
    verified: false,
  },
  {
    id: 'rev-6',
    propertyId: 'prop-2',
    authorName: 'Noah P.',
    authorYear: 'UVM Junior',
    rating: 4,
    headline: 'Solid house with great vibe',
    body: 'The house has a great layout for roommates — everyone has their own space but the common areas are large enough for everyone to hang out. The neighborhood is very walkable and we loved being close to all the North End restaurants. Only complaint is street parking can be tricky in winter.',
    date: '2025-02-14',
    verified: true,
  },
  {
    id: 'rev-7',
    propertyId: 'prop-5',
    authorName: 'Ava R.',
    authorYear: 'UVM Freshman',
    rating: 5,
    headline: 'My first apartment — exceeded expectations',
    body: 'This was my first time renting and I was nervous, but NestVT helped me through the whole process and this apartment has been amazing. The exposed brick is gorgeous, the natural light is stunning, and my landlord has been incredibly helpful. Highly recommend for first-time renters.',
    date: '2025-01-20',
    verified: true,
  },
  {
    id: 'rev-8',
    propertyId: 'prop-7',
    authorName: 'James O.',
    authorYear: 'UVM Senior',
    rating: 3,
    headline: 'Good apartment, minor issues',
    body: 'The apartment itself is beautiful and the location can\'t be beat. The renovated kitchen is a highlight. Gave 3 stars because the parking situation was trickier than advertised and the water pressure could be better. But overall a solid choice for anyone wanting to be near campus.',
    date: '2024-08-30',
    verified: true,
  },
]

// ─── Bookings ─────────────────────────────────────────────────────────────────

export const BOOKINGS: Booking[] = [
  {
    id: 'booking-1',
    studentId: 'student-1',
    packageId: 'pkg-base',
    packageName: 'Base Package',
    packagePrice: 199,
    addOns: [],
    groupSize: 1,
    groupDiscount: 0,
    totalPrice: 199,
    status: 'confirmed',
    propertyIds: ['prop-1', 'prop-3', 'prop-5'],
    createdAt: '2025-02-10T14:30:00Z',
    updatedAt: '2025-02-11T09:15:00Z',
    coordinatorName: 'Rachel Green',
    coordinatorEmail: 'rachel@nestvt.com',
    notes: 'Looking for a 1–2 bedroom within walking distance of campus. Prefers Hill Section.',
    tours: [
      {
        id: 'tour-1',
        bookingId: 'booking-1',
        propertyId: 'prop-1',
        propertyAddress: '142 Maple St, Burlington, VT',
        date: '2025-03-22',
        time: '10:00 AM',
        status: 'scheduled',
      },
    ],
    documents: [
      {
        id: 'doc-1',
        name: 'NestVT Service Agreement',
        type: 'receipt',
        url: '#',
        uploadedAt: '2025-02-10T14:35:00Z',
      },
    ],
  },
  {
    id: 'booking-2',
    studentId: 'student-1',
    packageId: 'pkg-premium',
    packageName: 'Premium Package',
    packagePrice: 349,
    addOns: [{ id: 'addon-parent', name: 'Parent Consultation', price: 59 }],
    groupSize: 1,
    groupDiscount: 0,
    totalPrice: 408,
    status: 'in_progress',
    propertyIds: ['prop-7', 'prop-9'],
    createdAt: '2025-01-05T11:00:00Z',
    updatedAt: '2025-03-01T16:45:00Z',
    coordinatorName: 'Rachel Green',
    coordinatorEmail: 'rachel@nestvt.com',
    notes: 'Needs a 2-bedroom for fall 2025. Parents want to review any lease before signing.',
    tours: [
      {
        id: 'tour-2',
        bookingId: 'booking-2',
        propertyId: 'prop-7',
        propertyAddress: '33 Prospect St, Burlington, VT',
        date: '2025-01-18',
        time: '2:00 PM',
        status: 'completed',
        notes: 'Great visit! Student very interested. Follow up on parking.',
      },
      {
        id: 'tour-3',
        bookingId: 'booking-2',
        propertyId: 'prop-9',
        propertyAddress: '89 Pine St, Burlington, VT',
        date: '2025-03-25',
        time: '11:30 AM',
        status: 'scheduled',
      },
    ],
    documents: [
      {
        id: 'doc-2',
        name: 'NestVT Service Agreement',
        type: 'receipt',
        url: '#',
        uploadedAt: '2025-01-05T11:05:00Z',
      },
      {
        id: 'doc-3',
        name: 'Inspection Report — 33 Prospect St',
        type: 'inspection',
        url: '#',
        uploadedAt: '2025-01-20T10:00:00Z',
      },
      {
        id: 'doc-4',
        name: 'Lease Draft — 33 Prospect St (Under Review)',
        type: 'lease',
        url: '#',
        uploadedAt: '2025-03-10T14:30:00Z',
      },
    ],
  },
  {
    id: 'booking-3',
    studentId: 'student-2',
    packageId: 'pkg-premium',
    packageName: 'Premium Package',
    packagePrice: 349,
    addOns: [],
    groupSize: 3,
    groupDiscount: 8,
    totalPrice: 321,
    status: 'confirmed',
    propertyIds: ['prop-6', 'prop-2'],
    createdAt: '2025-03-01T09:00:00Z',
    updatedAt: '2025-03-02T10:30:00Z',
    coordinatorName: 'Marcus Webb',
    coordinatorEmail: 'marcus@nestvt.com',
    notes: 'Group of 3 students, need a 3–4 bedroom. Budget flexible for the right place.',
    tours: [
      {
        id: 'tour-4',
        bookingId: 'booking-3',
        propertyId: 'prop-6',
        propertyAddress: '712 North Ave, Burlington, VT',
        date: '2025-03-20',
        time: '3:00 PM',
        status: 'scheduled',
      },
    ],
    documents: [
      {
        id: 'doc-5',
        name: 'NestVT Group Service Agreement',
        type: 'receipt',
        url: '#',
        uploadedAt: '2025-03-01T09:10:00Z',
      },
    ],
  },
]

// ─── Landlord Listings ─────────────────────────────────────────────────────────

export const LANDLORD_LISTINGS: LandlordListing[] = [
  {
    id: 'll-1',
    landlordId: 'landlord-1',
    propertyId: 'prop-1',
    title: '142 Maple St — 2BR/1BA',
    status: 'live',
    tourRequests: 7,
    views: 142,
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 'll-2',
    landlordId: 'landlord-1',
    propertyId: 'prop-3',
    title: '88 South Willard St — Studio',
    status: 'live',
    tourRequests: 12,
    views: 231,
    createdAt: '2025-01-20T10:00:00Z',
  },
  {
    id: 'll-3',
    landlordId: 'landlord-1',
    propertyId: 'prop-5',
    title: '45 Loomis St — 1BR/1BA',
    status: 'live',
    tourRequests: 4,
    views: 98,
    createdAt: '2025-02-01T09:00:00Z',
  },
  {
    id: 'll-4',
    landlordId: 'landlord-1',
    propertyId: 'prop-7',
    title: '33 Prospect St — 2BR/1BA',
    status: 'in_review',
    tourRequests: 0,
    views: 15,
    createdAt: '2025-03-10T14:00:00Z',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug)
}

export function getReviewsForProperty(propertyId: string): Review[] {
  return REVIEWS.filter((r) => r.propertyId === propertyId)
}

export function getBookingsForStudent(studentId: string): Booking[] {
  return BOOKINGS.filter((b) => b.studentId === studentId)
}

export function getBookingById(id: string): Booking | undefined {
  return BOOKINGS.find((b) => b.id === id)
}

export function getFeaturedProperties(): Property[] {
  return PROPERTIES.filter((p) => p.featured)
}

export function getGroupDiscountPercent(size: number): number {
  if (size >= 5) return 12
  if (size >= 4) return 10
  if (size >= 3) return 8
  return 0
}

export function formatPrice(cents: number): string {
  return `$${cents.toLocaleString()}`
}

export function formatDistance(miles: number): string {
  return `${miles} mi to UVM`
}

export const NEIGHBORHOODS = [
  'Hill Section',
  'South End',
  'Old North End',
  'Downtown',
  'New North End',
  'East Side',
]

export const PROPERTY_TYPES: PropertyType[] = ['apartment', 'house', 'studio', 'condo']
