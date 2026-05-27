export default {
  name: 'category',
  title: 'Event Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Category Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'color',
      title: 'Hex Color Code',
      type: 'string',
      description: 'e.g. #ff6b6b (Used for frontend backgrounds/borders)',
      validation: Rule => Rule.required()
    },
    {
      name: 'eventCategory',
      title: 'Event Category Identifier',
      type: 'string',
      description: 'Must match event category tag, e.g. "Birthday", "Fiesta", "Sip & Paint"',
      validation: Rule => Rule.required()
    }
  ]
}
