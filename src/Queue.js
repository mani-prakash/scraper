var Queue = function() {
    var functionSet=(function() {
        var _elements=[] // creating a private array
        return [
            // push function
            function()
            {return _elements.push .apply(_elements,arguments) },
            // shift function
            function()
            { return _elements.shift .apply(_elements,arguments) },
            function() { return _elements.length },
            function(n) { return _elements.length=n },
            function() {
                if(_elements.length>0)
                {
                    return _elements[0]
                }
                return null
            }
            ];
    })();
    this.push=functionSet[0]
    this.shift=functionSet[1]
    this.front = functionSet[4]
    Object.defineProperty(this,'length',{
        'get':functionSet[2],
        'set':functionSet[3],
        'writeable':true,
        'enumerable':false,
        'configurable':false
    })
    // initializing the queue with given arguments
    this.push.apply(this,arguments)
}

module.exports = Queue