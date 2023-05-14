import { makeAutoObservable } from 'mobx'

export class ModalStore {
  modal: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  closeModal() {
    this.modal = false
  }

  showModal() {
    this.modal = !this.modal
  }
}
