const AWS = require('aws-sdk')
const REQUEST_TYPES = require('./requestTypes')
const {IPC_MAIN_CHANNEL, IPC_RENDERER_CHANNEL} = require('./channels')
const levelup = require('levelup')

let glacierByRegion = {}
function glacier(region){
  return glacierByRegion[region] === undefined ?
    glacierByRegion[region] = new AWS.Glacier({apiVersion: '2012-06-01', region: region}) :
    glacierByRegion[region]
}

let db = levelup('./data/db', {
  keyEncoding: 'json',
  valueEncoding: 'json'
})

function promiseFromAWSRequest(req, extractFromResponse) {
  req.send()
  return new Promise((resolve, reject) => {
    req.on('success', (res) => {
      resolve(extractFromResponse(res))
    }).on('error', (res) => {
      reject(res.error)
    })
  })
}

function promiseGetData(key) {
  return new Promise((resolve, reject) => {
    db.get(key, (err, val) => {
      if(err && err.notFound) { resolve(null); return; }
      if(err) { reject(err); return; }
      resolve(val);
    })   
  })
}

function promiseSetData(key, val) {

}

function regionIdAndVaultNameFromVaultARN(vaultARN){
  const tokens = vaultARN.split(':')
  console.log(tokens)
  const regionId = tokens[3]
  const vaultName = tokens[tokens.length-1].split('/')[1]
  return [regionId, vaultName]
}

function doListVaults(regionId) {
  req = glacier(regionId).listVaults({accountId: '-'})
  return promiseFromAWSRequest(req, (res) => { return res.data['VaultList'] })
}

function doListJobs(vaultARN) {
  const [regionId, vaultName] = regionIdAndVaultNameFromVaultARN(vaultARN)
  req = glacier(regionId).listJobs({
    accountId: '-',
    vaultName: vaultName
  })

  return promiseFromAWSRequest(req, (res) => {return res.data['JobList'] })
}

function doGetCachedVaultInventory(vaultARN) {
  return promiseGetData(`inventory:${vaultARN}`)
}

function handleRequest(request){
  switch (request.type) {
    case REQUEST_TYPES.LIST_VAULTS:
      return doListVaults(request.regionId);
    // case REQUEST_TYPES.VAULT_INVENTORY:
    //   return doVaultInventory(request);
    //   break;
    case REQUEST_TYPES.LIST_JOBS:
      return doListJobs(request.vaultARN);
    // case REQUEST_TYPES.VAULT_INVENTORY_OUTPUT:
    //   return doGetVaultInventoryResult(request);
    //   break;
    case REQUEST_TYPES.GET_CACHED_VAULT_INVENTORY:
      return doGetCachedVaultInventory(request.vaultARN)
    default:
      console.log(`Request ${request.type} not supported`)
      return null
  }
}

function setupGlacierWorker(ipcMain) {
  
  ipcMain.on(IPC_MAIN_CHANNEL, (event, args) => {
    console.log(args)

    let res = handleRequest(args)
    if (res) {
      res.then((data) => {
        console.log(data)
        event.sender.send(IPC_RENDERER_CHANNEL, { data : data, mId: args.mId })
      }).catch((err) => {
        console.log("error!!!")
        event.sender.send(IPC_RENDERER_CHANNEL, { err : err.message, mId: args.mId })
      })
    }
  })
}

module.exports = setupGlacierWorker
