var LocalStorage = new Class({

    Implements: [Options],
    
    options: {
        path    : '/',
        name    : window.location.hostname,
        duration: 3, //the duration of the cookies (in days) before it expires. If set to 0 or false, 
                     //the cookie will be a session cookie that expires when the browser is closed
        debug   : false //uses or not console.log  
    },

    storage: null,

    initialize: function(options) {

        var $this = this;

        this.setOptions(options);

        if(window.localStorage) { // if HTML5

           if(this.options.debug) {
                if(window.console) console.log('using window.localStorage');
           }  

           this.storage = window.localStorage; 

        } else if(Browser.Engine.trident) { //if IE < 8

          if(this.options.debug) {
                if(window.console) console.log('using window.localStorage');
          }  
         
          this.storage = (function(){
 
               var s = document.createElement('span');
                   s.style.behavior = "url(#default#userData)";
                   $(document.body).adopt(s);
                   s.load($this.options.name); 

                   return {
                        setItem: function(name,value) {
                           s.setAttribute(name,value);
                           s.save($this.options.name); 
                        },
                        getItem: function(name) {
                           return s.getAttribute(name);
                        },
                        removeItem: function(name) {
                           s.removeAttribute(name);
                           s.save($this.options.name);  
                        }
                   };
          })(); 

        } else if(window.globalStorage) { //if FF < 3.5
 
          if(this.options.debug) {
                if(window.console) console.log('using window.globalStorage');
          }  
         
          this.storage = (function(){

                var s = globalStorage[$this.options.name];

                return {
                      setItem: function(name,value) {
                          s[name] = value;
                      },
                      getItem: function(name) {
                          return s[name] ? s[name].value : null;
                      },
                      removeItem: function() {
                          delete(s[name]);  
                      }  
                };     
          })();

        } else {
          //all others

          if(this.options.debug) {
                if(window.console) console.log('using window.globalStorage');
          }  

          this.storage = (function(){

               var options = {path: $this.options.path, 
                              duration: $this.options.duration};

               return {
                      setItem: function(name,value) {
                         Cookie.write(name,value,options);
                      },
                      getItem: function(name) {
                         return Cookie.read(name);
                      },
                      removeItem: function(name) {
                         Cookie.dispose(name);
                      }                      
               };  

          })();

        } 

    }, 

    set: function(name, value) {

         this.storage.setItem(name, JSON.encode(value));

       return this;
    },

    get: function(name) {

       return JSON.decode(this.storage.getItem(name));
    },

    remove: function(name) {

         this.storage.removeItem(name);

      return this; 
    } 
});