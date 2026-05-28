export default {
  name: 'activity',
  title: 'Activity (Cards)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'color',
      title: 'Hex Color',
      type: 'string',
      description: 'e.g., hsl(330, 81%, 70%) or #ff6b6b',
      validation: Rule => Rule.required()
    },
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'videoUrl',
      title: 'YouTube Embed URL',
      type: 'url'
    },
    {
      name: 'ingredients',
      title: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., 15-20 min'
    }
  ]
}
