class APIHandler {
  constructor(baseURL) {
    this.axiosApp = axios.create({ baseURL })
  }

  getFullList() {
    return this.axiosApp.get('/characters')
  }

  getOneRegister(id) {
    return this.axiosApp.get(`/characters/${id}`)
  }

  createOneRegister(newMiniom) {

    return this.axiosApp.post(`/characters`, newMiniom)
  }

  updateOneRegister(id, editMiniom) {
    return this.axiosApp.put(`/characters/${id}`, editMiniom)

  }

  deleteOneRegister(id) {

    return this.axiosApp.delete(`/characters/${id}`)
  }
}
