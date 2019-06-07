export class ImageMapCoordinate {
  x: number = 0
  y: number = 0
  w: number = 100
  h: number = 100
  name?: string
  hybrisId: string

  constructor(init?: Partial<ImageMapCoordinate>) {
    Object.assign(this, init);
  }

}