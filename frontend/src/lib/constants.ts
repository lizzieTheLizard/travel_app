// Layout configuration for different views
export const LAYOUT = {
  SIDEBAR_WIDTH: 280,
  HEADER_HEIGHT: 64,
  MOBILE_BREAKPOINT: 768,
};

// Date format configurations
export const DATE_FORMAT = {
  SHORT: 'MMM d',
  LONG: 'MMMM d, yyyy',
  FULL: 'EEEE, MMMM d, yyyy',
  TIME: 'h:mm a',
  ISO: 'yyyy-MM-dd',
};

// Activity types
export const ACTIVITY_TYPES = [
  { value: 'museum', label: 'Museum' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'tour', label: 'Tour' },
  { value: 'hike', label: 'Hike' },
  { value: 'other', label: 'Other' },
];

// Transportation types
export const TRANSPORTATION_TYPES = [
  { value: 'train', label: 'Train' },
  { value: 'bus', label: 'Bus' },
  { value: 'car', label: 'Car Rental' },
  { value: 'ferry', label: 'Ferry' },
  { value: 'other', label: 'Other' },
];

// Task categories
export const TASK_CATEGORIES = [
  { value: 'packing', label: 'Packing' },
  { value: 'booking', label: 'Booking' },
  { value: 'preparation', label: 'Preparation' },
  { value: 'general', label: 'General' },
];

// Colors for different activity types
export const ACTIVITY_COLORS = {
  museum: '#3B82F6',
  restaurant: '#EF4444',
  tour: '#10B981',
  hike: '#8B5CF6',
  other: '#6B7280',
};
