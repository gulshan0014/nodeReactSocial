module.exports = function defaultSchema (schema, options) {
    schema.add({
        lastMod: {type: Date , default: Date.now},
        created: {type: Date , default: Date.now},
        isDeleted   : {type:Boolean,default:false}
    })
    
    schema.pre('save', function (next) {
      this.lastMod = new Date
      next()
    })
    
    if (options && options.index) {
      schema.path('lastMod').index(options.index)
    }
  }