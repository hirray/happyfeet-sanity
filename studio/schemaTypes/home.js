export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'e.g. "Welcome to Happyfeet"',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      description: 'e.g. "Creating Unforgettable Moments Through Dance"',
    },
    {
      name: 'features',
      title: 'Features List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Emoji Icon',
              type: 'string',
              description: 'e.g. 🎭'
            },
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              description: 'e.g. "Dance Workshops"'
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'string',
              description: 'e.g. "Learn from the best in the industry"'
            }
          ]
        }
      ]
    }
  ]
}
