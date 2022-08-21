export interface ArtcateListInt {
  id: number,
  name: string,
  alias: string,
  is_delete: '0' | '1',
}

export interface ArtcateDateInt {
  name: string,
  alias: string,
}

export class Data {
  selectData: ArtcateDateInt = {
    name: '',
    alias: ''
  }
  addData:ArtcateDateInt = {
    name: '',
    alias: ''
  }
  updateData:ArtcateListInt= {
    id: 0,
    name: '',
    alias: '',
    is_delete: "0"
  }
  artcateList :ArtcateListInt[] = []
  searchArtcateList:ArtcateListInt[] = []
  isShow =false
  isDel = false
  delId = 0
  updateShow = false
}