import REQUEST_TYPES  from '../../glacier/requestTypes'
import {IPC_MAIN_CHANNEL, IPC_RENDERER_CHANNEL} from '../../glacier/channels'
import {ipcRenderer} from 'electron'
import uuid from 'uuid'

let callbackMap = {}

function sendRequest(req, cb) {
  const mId = uuid.v4()
  callbackMap[mId] = cb
  ipcRenderer.send(IPC_MAIN_CHANNEL, { ...req, mId })
}

function listVault(regionId, cb) {
  sendRequest({
    type: REQUEST_TYPES.LIST_VAULTS,
    regionId
  }, cb)
}

function listJob(vaultARN, cb) {
  sendRequest({
    type: REQUEST_TYPES.LIST_JOBS,
    vaultARN
  }, cb) 
}

function getCachedVaultInventory(vaultARN, cb) {
  sendRequest({
    type: REQUEST_TYPES.GET_CACHED_VAULT_INVENTORY,
    vaultARN
  }, cb)
}

ipcRenderer.on(IPC_RENDERER_CHANNEL, (event, args) => {
  let mId = args.mId
  if (mId && callbackMap[mId]) {
    callbackMap[mId](args)
    delete callbackMap[mId]
  }
})

export default {
  listVault,
  listJob,
  getCachedVaultInventory
}