;(function(global, $){
  var Greetr = function(firstName, lastName, language){
    return new Greetr.init(firstName, lastName, language);
  };
  
  //The following private variables won't be accesible from outside thanks to our handy dandy IIFE.
  //But thanks to closures, our Greetr object can access them.
  var supportedLanguages = ["en", "es"];
  
  var greetings = {
    en: "Hello",
    es: "Hola"
  };
  
  var formalGreetings = {
    en: "Salutations",
    es: "Saludos"  
  };
    
  var logMessages = {
    en: "Logged in",
    es: "Incio sesion"
  };
  
  //The prototype where we want all of our methods
  Greetr.prototype = {
      fullName: function(){
        return this.firstName + " " + this.lastName;
      },
      validate: function(){
        //throw an error for unsupported languages
        if(supportedLanguages.indexOf(this.language)===-1){
              throw "Invalid language";
          }
      },
      greeting: function(){
        return greetings[this.language] + " " + this.firstName + "!";
      },
      formalGreeting: function(){
        return formalGreetings[this.language] + ", " + this.fullName() + ".";
      },
      greet: function(formal){
        var msg;
        
        if(formal){
            msg = this.formalGreeting();
        }
        else{
            msg = this.greeting();
        }
        
        if(console){
            console.log(msg);
        }
        
        //A simple trick to make methods chainable.
        //"this" refers to the calling object at execution time.
        //So long as the method is called for its side effect and not a return value, we can return the object so we can continue to perform computations on it.
        return this;
      },
      log: function(){
        if(console){
            console.log(logMessages[this.language] + ": " + this.fullName());
        }
        
        //Make chainable
        return this;
      },
      setLang: function(lang){
        this.language = lang;
        
        this.validate();
        
        //Make chainable
        return this;
      },
      HTMLGreeting: function(selector, formal){
        //throw an error if jQuery is not found
        if(!$){
          throw "Y u not load jQuery?!!  U cause error!  Bring shame upon family!"
        }
        if(!selector){
          throw "You didn't give me a selector.  I mean what do you even want me to do with this greeting?  Send your mom a letter?  Try again fool."
        }

        var msg;

        if(formal){
          msg = this.formalGreeting();
        }
        else{
          msg = this.greeting();
        }
        $(selector).html(msg);

        //Make chainable
        return this;
      }
      
  };
  
  //Let's set up the basic variables of our Greetr object
  Greetr.init = function(firstName,lastName,language){
    var self = this; //A safety measure so we always know that "this" points to the Greetr object. A fun quirk of JS is that for functions contained in methods, "this" refers to the global object.
    self.firstName = firstName || "";
    self.lastName = lastName || "a girl has no name..";
    self.language = language || "en";

    self.validate();
  }
  
  //We want Greetr.init to have the prototype with all our methods so we'll point there.
  Greetr.init.prototype = Greetr.prototype;  
  
  //We want our Greetr object to be available to the global execution context - the window for now.
  global.G$ = global.Greetr = Greetr;  
  
}(window, jQuery)); //We want to take in the window object as well as jQuery so we can make it compatible. Later we can set up for other global execution contexts beyond the browser

