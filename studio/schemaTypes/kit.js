export default {
  name: 'kit',
  title: 'Kit (Collection)',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
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
      name: 'price',
      title: 'Price String',
      type: 'string',
      description: 'e.g., "Starts from ₹499"'
    },
    {
      name: 'colors',
      title: 'Colors',
      type: 'array',
      of: [{ type: 'string', title: 'Hex Color' }],
      description: 'List of hex color codes like #EC6F87'
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'features',
      title: 'Features / Items Included',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}
