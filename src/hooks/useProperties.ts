import { useState, useEffect } from 'react';
import { Property, getAllProperties, getPropertiesByType } from '@/services/propertyService';

interface UsePropertiesOptions {
  type?: 'Rent' | 'Sell';
  sortBy?: 'price' | 'date';
  sortOrder?: 'asc' | 'desc';
  filterBy?: {
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
  };
}

export const useProperties = (options: UsePropertiesOptions = {}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        let fetchedProperties: Property[];

        if (options.type) {
          fetchedProperties = await getPropertiesByType(options.type);
        } else {
          fetchedProperties = await getAllProperties();
        }

        // Apply filters if any
        if (options.filterBy) {
          fetchedProperties = fetchedProperties.filter(property => {
            let matches = true;
            const filter = options.filterBy!;

            if (filter.propertyType && property.propertyType !== filter.propertyType) {
              matches = false;
            }

            if (filter.bedrooms && property.bedrooms !== filter.bedrooms) {
              matches = false;
            }

            if (typeof property.price === 'number') {
              if (filter.minPrice && property.price < filter.minPrice) {
                matches = false;
              }
              if (filter.maxPrice && property.price > filter.maxPrice) {
                matches = false;
              }
            }

            return matches;
          });
        }

        // Sort properties if sortBy option is provided
        if (options.sortBy) {
          fetchedProperties.sort((a, b) => {
            if (options.sortBy === 'price') {
              const priceA = typeof a.price === 'number' ? a.price : 0;
              const priceB = typeof b.price === 'number' ? b.price : 0;
              return options.sortOrder === 'desc' ? priceB - priceA : priceA - priceB;
            } else if (options.sortBy === 'date') {
              const dateA = new Date(a.postedTime).getTime();
              const dateB = new Date(b.postedTime).getTime();
              return options.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            }
            return 0;
          });
        }

        setProperties(fetchedProperties);
        setError(null);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to fetch properties');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [
    options.type,
    options.sortBy,
    options.sortOrder,
    options.filterBy?.propertyType,
    options.filterBy?.minPrice,
    options.filterBy?.maxPrice,
    options.filterBy?.bedrooms
  ]);

  return {
    properties,
    loading,
    error,
    isEmpty: !loading && properties.length === 0
  };
}; 