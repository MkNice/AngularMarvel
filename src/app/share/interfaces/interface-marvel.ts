export interface MarvelCharacters {
  id: number,
  name: string,
  description: string,
  modified: string,
  thumbnail: {
    path: string,
    extension: string,
  },
  stories: {
    available: number
    items: []
  },
}
