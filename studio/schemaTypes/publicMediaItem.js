export default {
  name: 'publicMediaItem',
  title: 'Public Gallery Media Item',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image File',
      type: 'image',
      description: 'Upload an image if this media item is a photo.',
      options: {
        hotspot: true
      }
    },
    {
      name: 'video',
      title: 'Video File',
      type: 'file',
      description: 'Upload a video file if this media item is a video clip.',
      options: {
        accept: 'video/*'
      }
    }
  ],
  preview: {
    select: {
      title: 'image.asset.originalFilename',
      media: 'image'
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title: title || 'Video / Document Media File',
        media: media
      }
    }
  }
}
