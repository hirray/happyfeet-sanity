export default {
  name: 'pastEvent',
  title: 'Past Event',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Event Slug / ID',
      type: 'string',
      description: 'Unique URL-friendly ID, e.g. "bow-birthday-bash"',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'string',
      description: 'e.g. November 28, 2025',
      validation: Rule => Rule.required()
    },
    {
      name: 'location',
      title: 'Event Location',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'attendees',
      title: 'Number of Attendees',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Event Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category Identifier',
      type: 'string',
      description: 'Must match eventCategory in Category, e.g., "Birthday"',
      validation: Rule => Rule.required()
    },
    {
      name: 'details',
      title: 'Event Details',
      type: 'object',
      fields: [
        {
          name: 'theme',
          title: 'Theme Name',
          type: 'string'
        },
        {
          name: 'highlight',
          title: 'Highlights/Summary',
          type: 'text'
        },
        {
          name: 'duration',
          title: 'Duration (e.g. 4 Hours)',
          type: 'string'
        }
      ]
    },
    {
      name: 'planning',
      title: 'Planning Summary Details',
      type: 'text',
      description: 'A paragraph detailing the planning of the event.'
    },
    {
      name: 'images',
      title: 'Event Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'videos',
      title: 'Event Gallery Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          title: 'Video File',
          options: {
            accept: 'video/*'
          }
        }
      ]
    }
  ]
}
