import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { galleryCategories } from '../data/galleryCategories';
import { pastEvents } from '../data/pastEvents';
import { publicMedia } from '../data/publicMedia';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-03-11';

export const isSanityConfigured = !!projectId;

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

/**
 * Builds optimized URLs for images stored in Sanity.
 */
export const urlFor = (source) => {
  if (!builder || !source) return '';
  // Sanity image asset references are typically objects with asset ref
  return builder.image(source).url();
};

/**
 * Fetch all categories from Sanity. Falls back to local galleryCategories.js if Sanity is not configured.
 */
export const fetchCategories = async () => {
  if (!isSanityConfigured) {
    console.warn("Sanity is not configured. Returning local categories fallback data.");
    return galleryCategories;
  }
  try {
    const query = `*[_type == "category"] | order(title asc) {
      slug,
      title,
      image,
      color,
      eventCategory
    }`;
    const data = await client.fetch(query);
    if (!data || data.length === 0) return galleryCategories;
    
    return data.map(item => ({
      ...item,
      slug: item.slug?.current || item.slug || '',
      image: item.image ? urlFor(item.image) : item.image
    }));
  } catch (error) {
    console.error("Failed to fetch categories from Sanity. Falling back to local data.", error);
    return galleryCategories;
  }
};

/**
 * Fetch all past events from Sanity. Falls back to local pastEvents.js if Sanity is not configured.
 */
export const fetchPastEvents = async () => {
  if (!isSanityConfigured) {
    console.warn("Sanity is not configured. Returning local past events fallback data.");
    return pastEvents;
  }
  try {
    const query = `*[_type == "pastEvent"] | order(date desc) {
      id,
      title,
      date,
      location,
      attendees,
      image,
      category,
      details {
        theme,
        highlight,
        duration
      },
      planning,
      images,
      videos
    }`;
    const data = await client.fetch(query);
    if (!data || data.length === 0) return pastEvents;

    return data.map(item => ({
      ...item,
      image: item.image ? urlFor(item.image) : item.image,
      images: (item.images || []).map(img => {
        if (img && (img._type === 'image' || img.asset)) return urlFor(img);
        return img;
      }),
      videos: (item.videos || []).map(vid => {
        if (vid && vid.asset) return vid.asset.url || '';
        return vid;
      })
    }));
  } catch (error) {
    console.error("Failed to fetch past events from Sanity. Falling back to local data.", error);
    return pastEvents;
  }
};

/**
 * Fetch a single past event by ID. Falls back to searching local pastEvents.js if Sanity is not configured.
 */
export const fetchEventById = async (id) => {
  if (!isSanityConfigured) {
    console.warn("Sanity is not configured. Returning local event fallback by ID.");
    return pastEvents.find(e => e.id === id);
  }
  try {
    const query = `*[_type == "pastEvent" && id == $id][0] {
      id,
      title,
      date,
      location,
      attendees,
      image,
      category,
      details {
        theme,
        highlight,
        duration
      },
      planning,
      images,
      videos
    }`;
    const item = await client.fetch(query, { id });
    if (!item) return pastEvents.find(e => e.id === id);

    return {
      ...item,
      image: item.image ? urlFor(item.image) : item.image,
      images: (item.images || []).map(img => {
        if (img && (img._type === 'image' || img.asset)) return urlFor(img);
        return img;
      }),
      videos: (item.videos || []).map(vid => {
        if (vid && vid.asset) return vid.asset.url || '';
        return vid;
      })
    };
  } catch (error) {
    console.error(`Failed to fetch event with ID ${id} from Sanity. Falling back to local data.`, error);
    return pastEvents.find(e => e.id === id);
  }
};

/**
 * Fetch public media gallery list. Falls back to local publicMedia.js.
 */
export const fetchPublicMedia = async () => {
  if (!isSanityConfigured) {
    console.warn("Sanity is not configured. Returning local public media fallback data.");
    return publicMedia;
  }
  try {
    const query = `*[_type == "publicMediaItem"] | order(_createdAt desc) {
      image,
      video {
        asset-> {
          url
        }
      }
    }`;
    const data = await client.fetch(query);
    if (!data || data.length === 0) return publicMedia;

    return data.map(item => {
      if (item.image) return urlFor(item.image);
      if (item.video && item.video.asset) return item.video.asset.url || '';
      return '';
    }).filter(Boolean);
  } catch (error) {
    console.error("Failed to fetch public media from Sanity. Falling back to local data.", error);
    return publicMedia;
  }
};
