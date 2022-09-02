export const DEFAULT_POSTS_PAGINATION = {
  post_type: 'all',
  draw: 3,
  columns: [
    {
      data: 'id',
      name: '',
      searchable: true,
      orderable: true,
      search: {
        value: '',
        regex: false
      }
    },
    {
      data: 'content',
      name: '',
      searchable: true,
      orderable: true,
      search: {
        value: '',
        regex: false
      }
    }
  ],
  order: [
    {
      column: 0,
      dir: 'desc'
    }
  ],
  start: 0,
  length: 5,
  hasNext: true,
  search: {
    value: '',
    regex: false
  }
};

export const postTypes = {
  all: { label: 'All', value: 'all' },
  text: { label: 'Text', value: 'text' },
  image: { label: 'Image', value: 'image' },
  video: { label: 'Video', value: 'video' }
};
