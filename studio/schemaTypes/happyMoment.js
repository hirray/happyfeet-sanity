export default {
  name: 'happyMoment',
  title: 'Happy Moment (Photo Gallery)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Alt Text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }
  ]
}
